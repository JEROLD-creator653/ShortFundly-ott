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
    renewalAt: string;
  };
  activity: {
    last30DaysWatchMinutes: number;
    weeklyActiveDays: number;
    completionRate: number;
    bingeScore: number;
  };
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey! 👋 I'm your subscription advisor. I continuously analyze your viewing patterns and can suggest plan changes tailored to your usage. What would you like to know about your subscription?",
  timestamp: Date.now()
};

export function ProfileChatbot({ currentProfile }: { currentProfile: CurrentProfile }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updatingPlan, setUpdatingPlan] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to bottom */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, [messages, isLoading]);

  const parseSubscriptionRequest = (
    query: string
  ): {
    requestType: "upgrade" | "downgrade" | "check" | "info" | null;
    targetPlan?: "free" | "monthly" | "yearly";
  } => {
    const q = query.toLowerCase();

    if (/(upgrade|switch to|change to).*(monthly|yearly)/i.test(q)) {
      const plan = /yearly/i.test(q) ? "yearly" : "monthly";
      return { requestType: "upgrade", targetPlan: plan };
    }

    if (/(downgrade|switch to).*(free)/i.test(q)) {
      return { requestType: "downgrade", targetPlan: "free" };
    }

    if (/(suggest|recommend|what.*plan|should.*upgrade|should.*downgrade|current.*plan|plan.*options)/i.test(q)) {
      return { requestType: "check" };
    }

    if (/(subscription|plan|pricing|cost)/i.test(q)) {
      return { requestType: "info" };
    }

    return { requestType: null };
  };

  const generateSmartResponse = (): {
    text: string;
    action?: Message["action"];
  } => {
    const { plan } = currentProfile.subscription;
    const { last30DaysWatchMinutes: watchTime, weeklyActiveDays, completionRate, bingeScore } = currentProfile.activity;

    const isActive = weeklyActiveDays >= 5;
    const isHeavyViewer = watchTime >= 300;
    const isCompletionHeavy = completionRate >= 75;

    // Smart suggestion logic
    if (plan === "free") {
      if (isActive && watchTime >= 150) {
        return {
          text: `I see you're quite active! You've watched ${watchTime} minutes in the last month with ${weeklyActiveDays} active days. The **monthly plan** would be perfect for you—unlock all premium content at a great price. Want to upgrade?`,
          action: {
            type: "suggest-upgrade",
            plan: "monthly"
          }
        };
      }

      if (isHeavyViewer && isCompletionHeavy) {
        return {
          text: `You're a power watcher! With ${watchTime} minutes watched and ${completionRate}% completion rate, the **yearly plan** is your best value—watch unlimited premium content year-round.`,
          action: {
            type: "suggest-upgrade",
            plan: "yearly"
          }
        };
      }

      return {
        text: "You're on the free plan. Based on your current viewing habits, keep enjoying free content, or upgrade to monthly/yearly to unlock premium titles."
      };
    }

    if (plan === "monthly") {
      if (watchTime >= 400 && isCompletionHeavy) {
        return {
          text: `Wow, you're a true cinephile! With ${watchTime} minutes watched and ${completionRate}% completion rate, the **yearly plan** saves you money and removes interruptions. Ready to go annual?`,
          action: {
            type: "suggest-upgrade",
            plan: "yearly"
          }
        };
      }

      if (watchTime < 60 && weeklyActiveDays < 2) {
        return {
          text: `I notice your usage has been light recently (${watchTime} minutes in 30 days). Would the free plan work better for you right now?`,
          action: {
            type: "suggest-downgrade",
            plan: "free"
          }
        };
      }

      return {
        text: "You're enjoying the monthly plan! Your viewing is steady. Keep watching, or upgrade to yearly if you want better value."
      };
    }

    if (plan === "yearly") {
      if (watchTime < 50 && weeklyActiveDays < 1) {
        return {
          text: `Your usage has dropped significantly (${watchTime} minutes in 30 days). Consider downgrading to monthly to better match your viewing habits?`,
          action: {
            type: "suggest-downgrade",
            plan: "monthly"
          }
        };
      }

      return {
        text: `You're all set with the yearly plan! You have unlimited access to premium content. Keep enjoying!`
      };
    }

    return { text: "How can I help you with your subscription today?" };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    /* Add user message */
    const userMsg: Message = {
      role: "user",
      content: trimmed,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    /* Parse subscription request */
    const parsed = parseSubscriptionRequest(trimmed);

    try {
      let assistantMsg: Message;

      if (parsed.requestType === "upgrade" && parsed.targetPlan) {
        assistantMsg = {
          role: "assistant",
          content: `Great! Let me help you upgrade to the ${parsed.targetPlan} plan. Click the button below to confirm, and it'll take effect immediately.`,
          timestamp: Date.now(),
          action: {
            type: "accept-plan",
            plan: parsed.targetPlan
          }
        };
      } else if (parsed.requestType === "downgrade" && parsed.targetPlan) {
        assistantMsg = {
          role: "assistant",
          content: `Understood. Let me help you switch to the ${parsed.targetPlan} plan. Click the button below to confirm the change.`,
          timestamp: Date.now(),
          action: {
            type: "accept-plan",
            plan: parsed.targetPlan
          }
        };
      } else if (parsed.requestType === "check") {
        const { text, action } = generateSmartResponse();
        assistantMsg = {
          role: "assistant",
          content: text,
          timestamp: Date.now(),
          action
        };
      } else {
        /* Generic response for other queries */
        const { text } = generateSmartResponse();
        assistantMsg = {
          role: "assistant",
          content: text || "How can I help with your subscription?",
          timestamp: Date.now()
        };
      }

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
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
                  {msg.action.type === "accept-plan" && msg.action.plan && (
                    <button
                      onClick={() => applyPlanChange(msg.action.plan!)}
                      disabled={updatingPlan}
                      className="w-full rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:brightness-110 active:scale-95 disabled:opacity-60"
                    >
                      {updatingPlan ? "Updating..." : `Switch to ${msg.action.plan}`}
                    </button>
                  )}
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
