import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { SupportChat } from "@/lib/models/support-chat";
import { getCatalog } from "@/lib/content-service";
import { getEscalationAnswer, getFaqAnswer, getOffTopicResponse } from "@/lib/ai/support";
import { getGeminiModel } from "@/lib/ai/gemini";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { formatSuggestionLine, getSubscriptionSuggestion } from "@/lib/subscription-ai";
import {
  addSupportChatMessage,
  getDemoUserById,
  hasMongoConnection,
  recordDemoUserActivity
} from "@/lib/persistence/local-store";

export const runtime = "nodejs";

type ChatBody = {
  sessionId?: string;
  message?: string;
  userId?: string;
  userEmail?: string;
};

async function streamText(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(" ");

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const [index, word] of words.entries()) {
        controller.enqueue(encoder.encode(`${index ? " " : ""}${word}`));
        await new Promise((resolve) => setTimeout(resolve, 18));
      }
      controller.close();
    }
  });
}

async function getCatalogFallbackAnswer(question: string): Promise<string | null> {
  const q = question.toLowerCase();

  try {
    const items = await getCatalog();
    if (!items.length) return null;

    if (/(top rated|best rated|highest rated|top movies)/i.test(q)) {
      const top = [...items].sort((a, b) => b.rating - a.rating).slice(0, 5);
      if (!top.length) return null;

      const list = top.map((film, idx) => `${idx + 1}. ${film.title} (${film.rating}/5)`).join("\n");
      return `Here are the current top rated movies on Shortfundly:\n${list}\n\nOpen Explore or Home to start watching.`;
    }

    if (/(latest|new release|new movies|recent movies)/i.test(q)) {
      const latest = [...items].sort((a, b) => b.year - a.year).slice(0, 5);
      if (!latest.length) return null;

      const list = latest.map((film, idx) => `${idx + 1}. ${film.title} (${film.year})`).join("\n");
      return `Here are some of the latest releases:\n${list}\n\nYou can search these from the Explore page.`;
    }

    if (/(premium movies|premium content|premium films)/i.test(q)) {
      const premium = items.filter((film) => film.premium).slice(0, 5);
      if (!premium.length) {
        return "Premium titles are updated frequently. Open Explore and apply premium filters to see the latest paid catalog.";
      }

      const list = premium.map((film, idx) => `${idx + 1}. ${film.title}`).join("\n");
      return `Here are popular premium titles:\n${list}\n\nSign in and upgrade your plan to watch all premium content.`;
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as ChatBody;
  const sessionId = body.sessionId?.trim();
  const message = body.message?.trim();

  if (!sessionId || !message) {
    return NextResponse.json({ ok: false, message: "sessionId and message are required" }, { status: 400 });
  }

  /* ── Off-topic guard: block unrelated questions immediately ── */
  const offTopicReply = getOffTopicResponse(message);
  if (offTopicReply) {
    const offTopicStream = await streamText(offTopicReply);
    return new Response(offTopicStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Session-Id": sessionId,
        "Cache-Control": "no-store"
      }
    });
  }

  const useMongo = hasMongoConnection();
  if (useMongo) {
    await connectMongo();
  }

  const authSession = getSessionFromRequest(request);
  const currentUser = authSession?.userId ? await getDemoUserById(authSession.userId) : null;
  const activeUserId = authSession?.userId || body.userId;
  const activeUserEmail = authSession?.email || body.userEmail;

  if (activeUserId) {
    await recordDemoUserActivity(activeUserId, {
      watchMinutes: 0,
      completed: false,
      searched: false,
      liked: false,
      supportChat: true
    }).catch(() => null);
  }

  const faq = getFaqAnswer(message);
  const catalogFallback = faq ? null : await getCatalogFallbackAnswer(message);
  const isEscalated = !faq && !catalogFallback;
  const escalationAnswer = getEscalationAnswer();
  const needsPlanSuggestion = /(plan|subscription|pricing|upgrade|downgrade|monthly|yearly)/i.test(message);
  const personalizedPlanHint =
    currentUser && needsPlanSuggestion
      ? formatSuggestionLine(
          currentUser.subscription.plan,
          getSubscriptionSuggestion(currentUser.subscription.plan, currentUser.activity)
        )
      : null;
  const fallbackAnswer = [faq?.answer || catalogFallback || escalationAnswer, personalizedPlanHint]
    .filter(Boolean)
    .join("\n\n");
  const shouldUseLlm = Boolean(process.env.GEMINI_API_KEY?.trim());

  const saveConversation = async (assistantReply: string, escalated: boolean) => {
    if (useMongo) {
      let chat = await SupportChat.findOne({ sessionId });
      if (!chat) {
        chat = await SupportChat.create({
          sessionId,
          source: "widget",
          userId: activeUserId,
          userEmail: activeUserEmail,
          messages: []
        });
      }

      if (activeUserEmail) {
        chat.userEmail = activeUserEmail;
      }

      if (escalated) {
        chat.escalated = true;
        chat.escalationEmail = process.env.SUPPORT_ESCALATION_EMAIL || "support@shortfundly.com";
      }

      chat.messages.push({ role: "user", content: message, createdAt: new Date() });
      chat.messages.push({ role: "assistant", content: assistantReply, createdAt: new Date() });
      await chat.save();
      return;
    }

    await addSupportChatMessage({
      sessionId,
      userId: activeUserId,
      userEmail: activeUserEmail,
      role: "user",
      content: message
    });
    await addSupportChatMessage({
      sessionId,
      userId: activeUserId,
      userEmail: activeUserEmail,
      role: "assistant",
      content: assistantReply,
      escalated,
      escalationEmail: escalated ? process.env.SUPPORT_ESCALATION_EMAIL || "support@shortfundly.com" : undefined
    });
  };

  try {
    if (shouldUseLlm) {
      let result: Awaited<ReturnType<ReturnType<typeof getGeminiModel>["generateContentStream"]>>;

      try {
        const model = getGeminiModel();
        result = await model.generateContentStream({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: [
                    "SYSTEM RULES — follow these strictly:",
                    "1. You are the Shortfundly OTT platform support assistant. You ONLY answer questions about Shortfundly.",
                    "2. Allowed topics: subscriptions, payments, premium content, login/account issues, refunds, device compatibility, content catalog, streaming quality, app usage, creator tools, and platform features.",
                    "3. If the user asks ANYTHING outside these topics (general knowledge, coding, math, jokes, personal questions, politics, recipes, weather, other platforms, etc.), you MUST respond ONLY with: \"I'm the Shortfundly support assistant and I can only help with questions about the Shortfundly OTT platform. Please ask me something related to Shortfundly!\"",
                    "4. Never generate code, solve math, tell jokes, write stories, or answer trivia.",
                    "5. Answer with a concise, helpful, professional tone in 2-4 short sentences.",
                    "6. If the issue needs account-specific help, direct the user to support email.",
                    `7. Support email: ${process.env.SUPPORT_ESCALATION_EMAIL || "support@shortfundly.com"}`,
                    "",
                    faq
                      ? `Approved FAQ source (use this as authoritative): ${faq.answer}`
                      : "No predefined FAQ matched. Provide best-effort Shortfundly guidance and include escalation path if unsure.",
                    personalizedPlanHint ? `User-specific subscription insight: ${personalizedPlanHint}` : "",
                    `User question: ${message}`
                  ].join("\n")
                }
              ]
            }
          ]
        });
      } catch {
        await saveConversation(fallbackAnswer, isEscalated);
        const fallbackStream = await streamText(fallbackAnswer);
        return new Response(fallbackStream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Session-Id": sessionId,
            "Cache-Control": "no-store"
          }
        });
      }

      let assistantText = "";
      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (!text) continue;
              assistantText += text;
              controller.enqueue(encoder.encode(text));
            }

            const finalText = assistantText.trim() || fallbackAnswer;
            await saveConversation(finalText, isEscalated);
          } catch {
            controller.enqueue(encoder.encode(fallbackAnswer));
            await saveConversation(fallbackAnswer, isEscalated);
          } finally {
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Session-Id": sessionId,
          "Cache-Control": "no-store"
        }
      });
    }

    await saveConversation(fallbackAnswer, isEscalated);
    const fallbackStream = await streamText(fallbackAnswer);
    return new Response(fallbackStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Session-Id": sessionId,
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Support assistant is currently unavailable. Please retry shortly."
      },
      { status: 500 }
    );
  }
}
