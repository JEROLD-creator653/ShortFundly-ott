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
  getDemoUserMyList,
  hasMongoConnection,
  recordDemoUserActivity
} from "@/lib/persistence/local-store";
import type { Film } from "@/lib/types";

export const runtime = "nodejs";

type ChatBody = {
  sessionId?: string;
  message?: string;
  userId?: string;
  userEmail?: string;
  continueWatching?: Array<{
    slug?: string;
    title?: string;
    progress?: number;
  }>;
};

type AssistantUserContext = Awaited<ReturnType<typeof getDemoUserById>>;

function formatBlock(input: {
  header: string;
  bullets?: string[];
  numbered?: string[];
  closing?: string;
}) {
  const lines: string[] = [input.header];

  if (input.bullets?.length) {
    lines.push(...input.bullets.map((item) => `- ${item}`));
  }

  if (input.numbered?.length) {
    const cleaned = input.numbered
      .map((item) => item.replace(/^\s*\d+\.\s*/, "").trim())
      .filter(Boolean);

    lines.push(
      ...cleaned.flatMap((item, idx) => {
        const row = `${idx + 1}. ${item}`;
        return idx < cleaned.length - 1 ? [row, ""] : [row];
      })
    );
  }

  if (input.closing) {
    lines.push("", input.closing);
  }

  return lines.join("\n");
}

function shouldEscalateQuestion(question: string) {
  return /(human|live\s+agent|talk\s+to\s+agent|escalate|not\s+resolved|still\s+not\s+working|urgent|complaint)/i.test(question);
}

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

function dedupeBySlug(items: Film[]) {
  const seen = new Set<string>();
  const out: Film[] = [];
  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
  }
  return out;
}

function normalizeGenre(value: string) {
  return value.trim().toLowerCase();
}

function formatFilmList(items: Film[], limit = 8) {
  const list = dedupeBySlug(items).slice(0, limit);
  return list.map((film, idx) => `${idx + 1}. ${film.title} (${film.genre} • ${film.rating}/5 • ${film.year})`).join("\n");
}

function detectGenreFromQuestion(question: string, films: Film[]) {
  const q = question.toLowerCase();
  const knownGenres = Array.from(new Set(films.map((film) => film.genre))).filter(Boolean);

  for (const genre of knownGenres) {
    const normalized = normalizeGenre(genre);
    if (normalized && q.includes(normalized)) {
      return genre;
    }
  }

  return null;
}

function inferCurrentPlanLabel(user: AssistantUserContext) {
  if (!user) return "Free";
  const display = user.subscription?.displayPlan?.trim();
  if (display) return display;
  if (user.subscription.plan === "yearly") return "Premium Annual";
  if (user.subscription.plan === "monthly") return "Pro Monthly";
  return "Free";
}

async function getKnowledgeAnswer(
  question: string,
  user: AssistantUserContext,
  continueWatching: Array<{ slug?: string; title?: string; progress?: number }> = []
): Promise<string | null> {
  const q = question.toLowerCase();

  const catalog = await getCatalog().catch(() => [] as Film[]);
  if (!catalog.length) return null;

  if (/(all\s+(movies|titles|films)|list\s+all|what\s+can\s+i\s+watch|show\s+all\s+movies)/i.test(q)) {
    const list = formatFilmList(catalog, 20);
    return formatBlock({
      header: `SHORTFUNDLY CATALOG (showing 20 of ${catalog.length})`,
      numbered: list.split("\n"),
      closing: "Ask: 'show top rated thriller movies' or 'recommend romance titles'."
    });
  }

  if (/(continue\s+watching|resume|unfinished|where\s+did\s+i\s+stop)/i.test(q)) {
    const localItems = continueWatching
      .filter((item) => item && typeof item.title === "string" && item.title.trim().length > 0)
      .slice(0, 10);

    if (localItems.length) {
      const list = localItems
        .map((item, idx) => `${idx + 1}. ${String(item.title)} (${Math.max(0, Math.min(100, Number(item.progress) || 0))}% completed)`)
        .join("\n");
      return formatBlock({
        header: "CONTINUE WATCHING",
        numbered: list.split("\n")
      });
    }

    return formatBlock({
      header: "CONTINUE WATCHING",
      bullets: [
        "This list is personalized per device/browser.",
        "It appears on Home after you partially watch a title.",
        "If empty, start watching any movie and it will show automatically."
      ]
    });
  }

  if (/(my\s+list|watch\s+list|saved\s+list|wishlist)/i.test(q)) {
    if (!user) {
      return "Please sign in to view your Watch List. After login, open Watch List or ask me again and I can summarize your saved titles.";
    }

    const myList = await getDemoUserMyList(user._id).catch(() => null);
    if (!myList?.length) {
      return formatBlock({
        header: "WATCH LIST",
        bullets: [
          "Your Watch List is currently empty.",
          "Open any movie and tap Add to Watch List to save it."
        ]
      });
    }

    const lines = myList.slice(0, 12).map((item, idx) => `${idx + 1}. ${item.title} (${item.genre} • ${item.duration})`).join("\n");
    return formatBlock({
      header: `WATCH LIST (${myList.length} titles)`,
      numbered: lines.split("\n")
    });
  }

  if (/(top\s+rated|best\s+rated|highest\s+rated|top\s+movies)/i.test(q)) {
    const genre = detectGenreFromQuestion(question, catalog);
    const filtered = genre
      ? catalog.filter((film) => normalizeGenre(film.genre).includes(normalizeGenre(genre)))
      : catalog;
    const top = [...filtered].sort((a, b) => b.rating - a.rating).slice(0, 10);
    if (!top.length) return null;

    const list = formatFilmList(top, 10);
    return formatBlock({
      header: genre ? `TOP RATED • ${genre.toUpperCase()}` : "TOP RATED TITLES",
      numbered: list.split("\n")
    });
  }

  if (/(latest|new\s+release|recent\s+movies|new\s+movies)/i.test(q)) {
    const latest = [...catalog].sort((a, b) => b.year - a.year || b.rating - a.rating).slice(0, 10);
    const list = formatFilmList(latest, 10);
    return formatBlock({
      header: "LATEST RELEASES",
      numbered: list.split("\n")
    });
  }

  if (/(recommend|suggest).*(movie|movies|film|films|watch)|what\s+should\s+i\s+watch|movies?\s+for\s+me|movies?\s+based\s+on|based\s+on\s+.*genre|give\s+me\s+movies\s+based\s+on/i.test(q)) {
    const genre = detectGenreFromQuestion(question, catalog);
    const favoriteGenres = user?.details?.favoriteGenres || [];

    let candidates = catalog;
    let reason = "picked from top rated titles";

    if (genre) {
      candidates = catalog.filter((film) => normalizeGenre(film.genre).includes(normalizeGenre(genre)));
      reason = `picked from ${genre} genre`;
    } else if (favoriteGenres.length) {
      const fav = favoriteGenres.map((g) => normalizeGenre(g));
      candidates = catalog.filter((film) => fav.some((fg) => normalizeGenre(film.genre).includes(fg)));
      reason = `picked using your favorite genres (${favoriteGenres.join(", ")})`;
    }

    const picks = [...candidates].sort((a, b) => b.rating - a.rating).slice(0, 5);
    if (!picks.length) return null;

    return formatBlock({
      header: "RECOMMENDED FOR YOU",
      bullets: [reason],
      numbered: formatFilmList(picks, 5).split("\n")
    });
  }

  if (/(which\s+plan|best\s+plan|what\s+plan|subscription\s+plan|plan\s+suits)/i.test(q)) {
    if (!user) {
      return formatBlock({
        header: "SUBSCRIPTION RECOMMENDATION",
        bullets: [
          "Sign in to get a personalized recommendation from your watch time and completion behavior.",
          "Available plans: Pro Monthly, Premium Quarterly, Premium Annual."
        ]
      });
    }

    const insight = formatSuggestionLine(
      user.subscription.plan,
      getSubscriptionSuggestion(user.subscription.plan, user.activity)
    );
    return formatBlock({
      header: "SUBSCRIPTION RECOMMENDATION",
      bullets: [`Current plan: ${inferCurrentPlanLabel(user)}`, insight]
    });
  }

  return null;
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

  const knowledgeAnswer = await getKnowledgeAnswer(message, currentUser, body.continueWatching || []);
  const faq = knowledgeAnswer ? null : getFaqAnswer(message);
  const catalogFallback = knowledgeAnswer || faq ? null : await getCatalogFallbackAnswer(message);
  const isEscalated = !knowledgeAnswer && !faq && !catalogFallback && shouldEscalateQuestion(message);
  const escalationAnswer = getEscalationAnswer();
  const needsPlanSuggestion = /(plan|subscription|pricing|upgrade|downgrade|monthly|yearly)/i.test(message);
  const personalizedPlanHint =
    currentUser && needsPlanSuggestion
      ? formatSuggestionLine(
          currentUser.subscription.plan,
          getSubscriptionSuggestion(currentUser.subscription.plan, currentUser.activity)
        )
      : null;
  const defaultOnTopicAnswer = formatBlock({
    header: "SHORTFUNDLY SUPPORT",
    bullets: [
      "I can help with subscriptions, payments, watch list, continue watching, top rated titles, latest releases, and genre recommendations.",
      "Try: 'top rated thriller movies', 'what is in my watch list', or 'which plan suits me'."
    ]
  });

  const fallbackAnswer = [knowledgeAnswer || faq?.answer || catalogFallback || defaultOnTopicAnswer || escalationAnswer, personalizedPlanHint]
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
                      : knowledgeAnswer
                        ? `Catalog/User context answer candidate: ${knowledgeAnswer}`
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
