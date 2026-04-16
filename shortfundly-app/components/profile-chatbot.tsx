"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  action?: {
    type: "suggest-upgrade" | "suggest-downgrade" | "accept-plan";
    plan?: "free" | "monthly" | "yearly";
  };
};

type CurrentProfile = {
  subscription: {
    plan: "free" | "monthly" | "yearly";
    displayPlan?: string;
    purchasedPlanId?: string;
    renewalAt: string;
  };
  activity: {
    last30DaysWatchMinutes: number;
    weeklyActiveDays: number;
    completionRate: number;
    bingeScore: number;
  };
};

type PlanRecommendationId = "free" | "pro_monthly" | "premium_quarterly" | "premium_annual";

const PLAN_DETAILS: Record<
  PlanRecommendationId,
  {
    label: string;
    priceText: string;
    mappedPlan?: "free" | "monthly" | "yearly";
  }
> = {
  free: {
    label: "Free",
    priceText: "Rs.0"
  },
  pro_monthly: {
    label: "Pro Monthly",
    priceText: "Rs.199/month",
    mappedPlan: "monthly"
  },
  premium_quarterly: {
    label: "Premium Quarterly",
    priceText: "Rs.499/quarter",
    mappedPlan: "monthly"
  },
  premium_annual: {
    label: "Premium Annual",
    priceText: "Rs.1499/year",
    mappedPlan: "yearly"
  }
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey! 👋 I'm your subscription advisor. I continuously analyze your viewing patterns and can suggest plan changes tailored to your usage. What would you like to know about your subscription?",
  timestamp: Date.now()
};

const QUICK_QUESTIONS = [
  "What is my current plan?",
  "When does my plan renew?",
  "Which plan suits my watch time?",
  "Compare Pro, Quarterly, and Annual",
  "Should I upgrade or downgrade?",
  "Show all available plans and prices"
];

export function ProfileChatbot({ currentProfile }: { currentProfile: CurrentProfile }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updatingPlan, setUpdatingPlan] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasUserSent = messages.some((message) => message.role === "user");

  /* Auto-scroll to bottom */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, [messages, isLoading]);

  const getCurrentPlanLabel = () => {
    if (currentProfile.subscription.displayPlan?.trim()) {
      return currentProfile.subscription.displayPlan.trim();
    }

    if (currentProfile.subscription.plan === "yearly") return "Premium Annual";
    if (currentProfile.subscription.plan === "monthly") return "Pro Monthly";
    return "Free";
  };

  const getCurrentPurchasedId = (): PlanRecommendationId => {
    const purchased = currentProfile.subscription.purchasedPlanId;
    if (purchased === "pro_monthly" || purchased === "premium_quarterly" || purchased === "premium_annual") {
      return purchased;
    }

    if (currentProfile.subscription.plan === "yearly") return "premium_annual";
    if (currentProfile.subscription.plan === "monthly") return "pro_monthly";
    return "free";
  };

  const getPlanRecommendation = () => {
    const { last30DaysWatchMinutes: watchTime, weeklyActiveDays, completionRate, bingeScore } = currentProfile.activity;

    const watchHours = Math.round((watchTime / 60) * 10) / 10;
    let recommended: PlanRecommendationId = "pro_monthly";
    let reason = "You are watching regularly and would benefit from a premium plan.";

    if (watchTime < 60 && weeklyActiveDays <= 1 && completionRate < 40) {
      recommended = "free";
      reason = "Your current usage is light, so the free plan is enough for now.";
    } else if (watchTime >= 420 || (weeklyActiveDays >= 5 && completionRate >= 70) || bingeScore >= 0.85) {
      recommended = "premium_annual";
      reason =
        "You have strong binge behavior and high consistency. Annual gives the best value for your usage level.";
    } else if (watchTime >= 180 || weeklyActiveDays >= 3 || completionRate >= 60 || bingeScore >= 0.5) {
      recommended = "premium_quarterly";
      reason = "Your usage is moderate-to-high, and quarterly is the best balance of value and flexibility.";
    }

    return {
      recommended,
      watchHours,
      reason,
      statsLine: `Watch time: ${watchHours}h/30d, active days: ${weeklyActiveDays}/week, completion: ${completionRate}%, binge score: ${bingeScore}.`
    };
  };

  const parseSubscriptionRequest = (
    query: string
  ): {
    requestType: "upgrade" | "downgrade" | "check" | "info" | "recommend" | null;
    targetPlan?: "free" | "monthly" | "yearly";
  } => {
    const q = query.toLowerCase();

    if (/(upgrade|switch to|change to).*(monthly|pro|yearly|annual)/i.test(q)) {
      const plan = /(yearly|annual)/i.test(q) ? "yearly" : "monthly";
      return { requestType: "upgrade", targetPlan: plan };
    }

    if (/(downgrade|switch to).*(free)/i.test(q)) {
      return { requestType: "downgrade", targetPlan: "free" };
    }

    if (/(suggest|recommend|what.*plan|which.*plan|best.*plan|suits?.*watch|watch.*time|completion.*rate|should.*upgrade|should.*downgrade|current.*plan|plan.*options|which.*subscription|purchase.*plan|buy.*plan)/i.test(q)) {
      return { requestType: "recommend" };
    }

    if (/(quarterly|annual|monthly|pro|premium).*plan|plan.*(quarterly|annual|monthly|pro|premium)/i.test(q)) {
      return { requestType: "check" };
    }

    if (/(subscription|plan|pricing|cost)/i.test(q)) {
      return { requestType: "info" };
    }

    return { requestType: null };
  };

  const fetchAdvisorReply = async (question: string) => {
    const response = await fetch("/api/subscription-advisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: question,
        profile: currentProfile
      })
    });

    if (!response.ok || !response.body) {
      throw new Error("Unable to get advisor response");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let output = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      output += decoder.decode(value, { stream: true });
    }

    output += decoder.decode();
    return output.trim();
  };

  const processQuestion = async (rawQuestion: string) => {
    const trimmed = rawQuestion.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: trimmed,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const parsed = parseSubscriptionRequest(trimmed);
    const recommendation = getPlanRecommendation();
    const currentPurchasedId = getCurrentPurchasedId();

    try {
      const advisorText = await fetchAdvisorReply(trimmed);
      const action: Message["action"] =
        parsed.requestType === "upgrade" && parsed.targetPlan
          ? {
              type: "accept-plan",
              plan: parsed.targetPlan
            }
          : parsed.requestType === "downgrade" && parsed.targetPlan
            ? {
                type: "accept-plan",
                plan: parsed.targetPlan
              }
            : parsed.requestType === "recommend" && recommendation.recommended !== currentPurchasedId
              ? {
                  type: recommendation.recommended === "free" ? "suggest-downgrade" : "suggest-upgrade",
                  plan: PLAN_DETAILS[recommendation.recommended].mappedPlan
                }
              : undefined;

      const assistantMsg: Message = {
        role: "assistant",
        content: advisorText || "I can help with your subscription, billing, renewal date, and plan options.",
        timestamp: Date.now(),
        action
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await processQuestion(input);
  };

  const askQuickQuestion = async (question: string) => {
    await processQuestion(question);
  };

  const applyPlanChange = async (newPlan: "free" | "monthly" | "yearly") => {
    if (updatingPlan) return;

    setUpdatingPlan(true);

    try {
      const response = await fetch("/api/user/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: newPlan })
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to update plan");
      }

      /* Add confirmation message */
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✅ Perfect! Your subscription has been updated to the **${newPlan}** plan. Changes are effective immediately. Enjoy!`,
          timestamp: Date.now()
        }
      ]);

      /* Trigger a parent refresh or notify that plan changed */
      window.dispatchEvent(new CustomEvent("subscription-updated", { detail: { plan: newPlan } }));
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Oops! I couldn't update your plan: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setUpdatingPlan(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-700/70 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 px-5 py-4">
        <h3 className="text-sm font-semibold">Subscription AI Advisor</h3>
        <p className="mt-1 text-xs text-zinc-500">Personalized recommendations based on your viewing behavior</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] space-y-2 rounded-2xl px-4 py-3 ${
                msg.role === "user" ? "rounded-br-none bg-primary/20 text-primary" : "rounded-bl-none bg-zinc-900 ring-1 ring-zinc-800 text-zinc-200"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>

              {msg.action && (
                <div className="pt-2">
                  {msg.action.type === "accept-plan" && msg.action.plan
                    ? (() => {
                        const actionPlan = msg.action.plan;
                        return (
                          <button
                            onClick={() => applyPlanChange(actionPlan)}
                            disabled={updatingPlan}
                            className="w-full rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:brightness-110 active:scale-95 disabled:opacity-60"
                          >
                            {updatingPlan ? "Updating..." : `Switch to ${actionPlan}`}
                          </button>
                        );
                      })()
                    : null}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-none bg-zinc-900 ring-1 ring-zinc-800 px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.1s]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {!hasUserSent && (
        <div className="border-t border-zinc-800/80 bg-zinc-950/40 px-4 py-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">Quick Questions</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => void askQuickQuestion(question)}
                disabled={isLoading}
                className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1.5 text-[11px] text-zinc-300 transition hover:border-primary hover:text-white disabled:opacity-40"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="border-t border-zinc-800/80 bg-zinc-950/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about plans, upgrades, or just chat..."
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm outline-none transition focus:border-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:brightness-110 active:scale-95 disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
