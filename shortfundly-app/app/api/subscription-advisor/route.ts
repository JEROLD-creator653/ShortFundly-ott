import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";

export const runtime = "nodejs";

type AdvisorProfile = {
  subscription?: {
    plan?: "free" | "monthly" | "yearly";
    displayPlan?: string;
    purchasedPlanId?: string;
    renewalAt?: string;
  };
  activity?: {
    last30DaysWatchMinutes?: number;
    weeklyActiveDays?: number;
    completionRate?: number;
    bingeScore?: number;
  };
};

type AdvisorBody = {
  message?: string;
  profile?: AdvisorProfile;
};

type IntentType =
  | "renewal"
  | "current_plan"
  | "recommendation"
  | "purchase_reason"
  | "comparison"
  | "upgrade_downgrade"
  | "general";

type PlanId = "free" | "pro_monthly" | "premium_quarterly" | "premium_annual";

const PLAN_INFO: Record<PlanId, { label: string; price: string; mappedPlan: "free" | "monthly" | "yearly" }> = {
  free: {
    label: "Free",
    price: "Rs.0",
    mappedPlan: "free"
  },
  pro_monthly: {
    label: "Pro Monthly",
    price: "Rs.199/month",
    mappedPlan: "monthly"
  },
  premium_quarterly: {
    label: "Premium Quarterly",
    price: "Rs.499/quarter",
    mappedPlan: "monthly"
  },
  premium_annual: {
    label: "Premium Annual",
    price: "Rs.1499/year",
    mappedPlan: "yearly"
  }
};

function getCurrentPlanId(profile?: AdvisorProfile): PlanId {
  if (profile?.subscription?.purchasedPlanId === "pro_monthly") return "pro_monthly";
  if (profile?.subscription?.purchasedPlanId === "premium_quarterly") return "premium_quarterly";
  if (profile?.subscription?.purchasedPlanId === "premium_annual") return "premium_annual";

  if (profile?.subscription?.plan === "yearly") return "premium_annual";
  if (profile?.subscription?.plan === "monthly") return "pro_monthly";
  return "free";
}

function getRecommendation(profile?: AdvisorProfile) {
  const watchMinutes = profile?.activity?.last30DaysWatchMinutes ?? 0;
  const weeklyActiveDays = profile?.activity?.weeklyActiveDays ?? 0;
  const completionRate = profile?.activity?.completionRate ?? 0;
  const bingeScore = profile?.activity?.bingeScore ?? 0;
  const watchHours = Math.round((watchMinutes / 60) * 10) / 10;

  let recommended: PlanId = "pro_monthly";
  let reason = "Your usage is regular, so a paid plan gives better value than staying on Free.";

  if (watchMinutes < 60 && weeklyActiveDays <= 1 && completionRate < 40) {
    recommended = "free";
    reason = "Your usage is currently light, so Free is sufficient right now.";
  } else if (watchMinutes >= 420 || (weeklyActiveDays >= 5 && completionRate >= 70) || bingeScore >= 0.85) {
    recommended = "premium_annual";
    reason = "You watch heavily and consistently, so Annual gives the best long-term value.";
  } else if (watchMinutes >= 180 || weeklyActiveDays >= 3 || completionRate >= 60 || bingeScore >= 0.5) {
    recommended = "premium_quarterly";
    reason = "Your usage is moderate to high, so Quarterly balances flexibility and savings.";
  }

  return {
    recommended,
    reason,
    watchHours,
    weeklyActiveDays,
    completionRate,
    bingeScore
  };
}

function detectPlanMention(message: string): PlanId | null {
  const q = message.toLowerCase();
  if (/(pro\s*monthly|monthly\s*plan|rs\.?\s*199)/i.test(q)) return "pro_monthly";
  if (/(premium\s*quarterly|quarterly\s*plan|rs\.?\s*499)/i.test(q)) return "premium_quarterly";
  if (/(premium\s*annual|annual\s*plan|yearly\s*plan|rs\.?\s*1499)/i.test(q)) return "premium_annual";
  if (/(free\s*plan|free\s*tier)/i.test(q)) return "free";
  return null;
}

function detectIntent(message: string): IntentType {
  const q = message.toLowerCase();
  if (/(renew|renewal|when.*renew|when.*expire|expires)/i.test(q)) return "renewal";
  if (/(current|my plan|what plan.*on|subscription status|have|using now)/i.test(q)) return "current_plan";
  if (/(why.*purchase|why.*buy|why.*pro|why.*monthly|worth it|benefit|advantage|why should i)/i.test(q)) return "purchase_reason";
  if (/(recommend|suggest|best.*plan|suits?|fit|should.*upgrade|should.*downgrade|which.*plan|buy.*plan|purchase.*plan)/i.test(q)) return "recommendation";
  if (/(compare|comparison|difference|monthly.*annual|quarterly.*annual|pros.*cons)/i.test(q)) return "comparison";
  if (/(upgrade|downgrade|switch|change.*plan|move to|go to)/i.test(q)) return "upgrade_downgrade";
  return "general";
}

function streamText(text: string) {
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

function buildFallbackAnswer(message: string, profile?: AdvisorProfile, intent?: IntentType) {
  const currentPlanId = getCurrentPlanId(profile);
  const currentPlan = profile?.subscription?.displayPlan?.trim() || PLAN_INFO[currentPlanId].label;
  const renewalDate = profile?.subscription?.renewalAt ? new Date(profile.subscription.renewalAt).toLocaleDateString() : "not available";
  const recommendation = getRecommendation(profile);
  const askedPlan = detectPlanMention(message);

  switch (intent) {
    case "renewal":
      return `Your current plan is ${currentPlan}, and it renews on ${renewalDate}.`;
    
    case "current_plan":
      return `You are currently on ${currentPlan}. Your plan renews on ${renewalDate}.`;

    case "purchase_reason": {
      const targetPlan = askedPlan ?? recommendation.recommended;
      const target = PLAN_INFO[targetPlan];
      const usageLine = `Your usage: ${recommendation.watchHours}h/30d, ${recommendation.weeklyActiveDays} active days/week, ${recommendation.completionRate}% completion.`;

      if (targetPlan === "pro_monthly") {
        return `Pro Monthly (${target.price}) is good if you want full premium access without a long commitment. ${usageLine} It is a practical step up from Free and easier to manage month-to-month.`;
      }
      if (targetPlan === "premium_quarterly") {
        return `Premium Quarterly (${target.price}) gives better value than paying monthly and still keeps flexibility every 3 months. ${usageLine} It suits regular viewers who want savings without committing for a full year.`;
      }
      if (targetPlan === "premium_annual") {
        return `Premium Annual (${target.price}) is best when you watch consistently because it gives the strongest overall value. ${usageLine} If your usage stays steady, annual is the most cost-effective choice.`;
      }

      return `If your viewing is light, Free is enough for now. ${usageLine} You can upgrade later when your watch time increases.`;
    }
    
    case "recommendation":
      return `Based on your activity (${recommendation.watchHours}h/30d, ${recommendation.weeklyActiveDays} active days/week, ${recommendation.completionRate}% completion), I recommend ${PLAN_INFO[recommendation.recommended].label} (${PLAN_INFO[recommendation.recommended].price}). ${recommendation.reason}`;
    
    case "comparison":
      return `Pro Monthly (${PLAN_INFO.pro_monthly.price}) is best for light to moderate usage without long commitment. Premium Quarterly (${PLAN_INFO.premium_quarterly.price}) offers better short-term value for regular viewers. Premium Annual (${PLAN_INFO.premium_annual.price}) is best for heavy, consistent viewing and gives the strongest savings. Based on your ${recommendation.watchHours}h/30d activity, ${PLAN_INFO[recommendation.recommended].label} is the best fit.`;
    
    case "upgrade_downgrade":
      return `You can switch anytime. Based on your usage, ${PLAN_INFO[recommendation.recommended].label} is the best move now. Tell me the plan you want and I will help you change it.`;
    
    default:
      return `Ask me about your current plan, renewal date, recommendations, plan comparisons, or why a specific plan is worth buying. Based on your profile, ${PLAN_INFO[recommendation.recommended].label} is currently the strongest fit.`;
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as AdvisorBody;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ ok: false, message: "message is required" }, { status: 400 });
  }

  const intent = detectIntent(message);
  const modelAvailable = Boolean(process.env.GEMINI_API_KEY?.trim());
  const fallbackAnswer = buildFallbackAnswer(message, body.profile, intent);

  if (!modelAvailable) {
    return new Response(await streamText(fallbackAnswer), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  try {
    const model = getGeminiModel();
    const currentPlanLabel = body.profile?.subscription?.displayPlan?.trim() || body.profile?.subscription?.plan || "free";
    const renewalAt = body.profile?.subscription?.renewalAt ? new Date(body.profile.subscription.renewalAt).toLocaleDateString() : "unknown";
    const watchTime = body.profile?.activity?.last30DaysWatchMinutes ?? 0;
    const weeklyActiveDays = body.profile?.activity?.weeklyActiveDays ?? 0;
    const completionRate = body.profile?.activity?.completionRate ?? 0;
    const bingeScore = body.profile?.activity?.bingeScore ?? 0;
    const intentPrompt: Record<IntentType, string> = {
      renewal: "The user asked about renewal date. State their renewal date clearly in the first sentence.",
      current_plan: "The user asked their current plan. State current plan clearly in the first sentence.",
      recommendation: "The user asked for recommendation. Use their watch activity to suggest stay/upgrade/downgrade with one clear reason.",
      purchase_reason: "The user asked why they should purchase a plan. Give concrete value reasons (price/value/flexibility) for the asked plan and connect to their usage metrics.",
      comparison: "The user asked to compare plans. Compare Pro Monthly, Premium Quarterly, Premium Annual with concise practical differences.",
      upgrade_downgrade: "The user asked about switching plans. Tell them what switch makes sense and ask for confirmation if needed.",
      general: "Answer directly based on intent; do not return a generic support blurb."
    };

    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are Shortfundly's subscription advisor.
Only answer Shortfundly subscription and billing questions.
${intentPrompt[intent]}

Rules:
1. Give a direct answer to the exact question in 2-4 short sentences.
2. Avoid generic phrases like "I can help with subscriptions" unless user asked what you can do.
3. If user asks current plan or renewal, include the exact values.
4. If user asks recommendation, use watch metrics and give one concrete plan suggestion.
5. If user asks why they should purchase a specific plan, include at least two concrete reasons linked to price/flexibility/value and their usage profile.
5. If unrelated question, respond: "I can only help with Shortfundly subscription questions."

User Profile Data:
- Current Plan: ${currentPlanLabel}
- Renewal Date: ${renewalAt}
- Watch Time (Last 30 Days): ${watchTime} minutes
- Weekly Active Days: ${weeklyActiveDays}
- Completion Rate: ${completionRate}%
- Binge Score: ${bingeScore}

User Question: ${message}`
            }
          ]
        }
      ]
    });

    let assistantText = "";

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (!text) continue;
      assistantText += text;
    }

    const cleaned = assistantText.trim();
    const looksGeneric = /i can help with|ask me about|subscription questions/i.test(cleaned);
    const missingDirectPlan = intent === "current_plan" && !new RegExp(currentPlanLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(cleaned);
    const missingRenewal = intent === "renewal" && !/renew|date|on\s+\w+/i.test(cleaned);
    const missingPurchaseReason = intent === "purchase_reason" && !/because|value|benefit|price|flexib|worth/i.test(cleaned);
    const finalAnswer = !cleaned || looksGeneric || missingDirectPlan || missingRenewal || missingPurchaseReason ? fallbackAnswer : cleaned;

    return new Response(await streamText(finalAnswer), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  } catch (err) {
    console.error("[SubscriptionAdvisor] Outer error:", err);
    return new Response(await streamText(fallbackAnswer), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
}