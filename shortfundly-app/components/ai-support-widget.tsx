"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_QUESTIONS = [
  "What subscription plans are available?",
  "My payment failed. What should I do?",
  "How do I watch premium content?",
  "I cannot log in to my account.",
  "What is the refund policy?",
  "Which devices are supported?"
];

export function AiSupportWidget() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I am your Shortfundly support assistant. Ask me about plans, payments, premium access, login, refunds, or device compatibility."
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const sessionId = useMemo(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `session-${Date.now()}`;
  }, []);

  const sendQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isStreaming) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }, { role: "assistant", content: "" }]);
    setValue("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/support-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId,
          message: trimmed
        })
      });

      if (!response.ok || !response.body) {
        throw new Error("Support stream failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamed = "";

      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;

        streamed += decoder.decode(chunk, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: streamed
          };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content:
            "I am currently unavailable. Please email support@shortfundly.com and we will help you as soon as possible."
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open AI support chat"
        className="fixed bottom-5 right-5 z-[70] rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_40px_rgba(251,90,50,0.45)] transition hover:brightness-110"
      >
        {open ? "Close" : "AI Support"}
      </button>

      {open ? (
        <section className="fixed bottom-20 right-4 z-[70] flex h-[70vh] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-zinc-700/70 bg-zinc-950/95 shadow-2xl shadow-black/70 backdrop-blur-xl md:right-5 md:w-[25rem]">
          <header className="border-b border-zinc-800 px-4 py-4">
            <h2 className="text-lg font-semibold">Shortfundly AI Support</h2>
            <p className="text-xs text-zinc-400">Live assistant with smart escalation to human support</p>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-zinc-900 text-zinc-100 ring-1 ring-zinc-800"
                }`}
              >
                {message.content || (isStreaming && index === messages.length - 1 ? "Typing..." : "")}
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {STARTER_QUESTIONS.slice(0, 3).map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendQuestion(question)}
                  disabled={isStreaming}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-primary hover:text-white disabled:opacity-40"
                >
                  {question}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendQuestion(value);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Ask your support question"
                disabled={isStreaming}
                className="h-11 flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none transition focus:border-primary"
              />
              <button
                type="submit"
                disabled={isStreaming || !value.trim()}
                className="h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
