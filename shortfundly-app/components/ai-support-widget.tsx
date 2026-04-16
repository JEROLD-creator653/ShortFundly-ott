"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

type ContinueItem = {
  slug: string;
  title: string;
  progress: number;
};

const CONTINUE_KEY = "shortfundly:continue";

/* ─── FAQ Quick Replies ─── */
const QUICK_REPLIES = [
  { label: "Subscription Plans", question: "What subscription plans are available?" },
  { label: "Payment Issues", question: "My payment failed. What should I do?" },
  { label: "Premium Access", question: "How do I watch premium content?" },
  { label: "Login Help", question: "I cannot log in to my account." },
  { label: "Refund Policy", question: "What is the refund policy?" },
  { label: "Supported Devices", question: "Which devices are supported?" }
];

/* ─── Relative Time Formatter ─── */
function relativeTime(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 10) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

/* ═══════════════ SVG Icons ═══════════════ */

function BotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M26 70 C24 85, 30 95, 40 95 L60 95 C70 95, 76 85, 74 70 Z" fill="#FB5A32" />
      <rect x="42" y="65" width="16" height="10" rx="4" fill="#FF8A3D" />
      <path d="M20 40 C20 28, 28 25, 50 25 C72 25, 80 28, 80 40 C82 55, 78 68, 50 68 C22 68, 18 55, 20 40 Z" fill="#FB5A32" />
      <rect x="12" y="42" width="10" height="12" rx="3" fill="#FF3A12" />
      <rect x="78" y="42" width="10" height="12" rx="3" fill="#FF3A12" />
      <rect x="15" y="15" width="3" height="18" rx="1.5" fill="#FF3A12" />
      <circle cx="16.5" cy="13" r="4.5" fill="#FF8A3D" />
      <path d="M26 44 C26 36, 32 35, 50 35 C68 35, 74 36, 74 44 C74 54, 69 58, 50 58 C31 58, 26 54, 26 44 Z" fill="#F0F5FA" />
      <circle cx="38" cy="46" r="4.5" fill="#FF3A12" />
      <circle cx="62" cy="46" r="4.5" fill="#FF3A12" />
      <circle cx="75" cy="22" r="18" fill="#FF8A3D" />
      <path
        d="M75 9 C70 9, 67 12, 67 15 L71 15 C71 13, 73 12, 75 12 C77 12, 79 13.5, 79 16 C79 18, 77 19.5, 75 22 C73 24, 73 25, 73 27 L77 27 C77 25.5, 79 24, 82 21.5 C83.5 20, 84 18, 84 15 C84 11, 80 9, 75 9 Z M73 29 L77 29 L77 33 L73 33 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2.5 max-w-[5rem] rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 animate-msg">
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
    </div>
  );
}

/* ═══════════════ Widget ═══════════════ */

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm your Shortfundly support assistant. Ask me about plans, payments, premium access, login, refunds, or device compatibility.",
  timestamp: Date.now()
};

export function AiSupportWidget() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `session-${Date.now()}`;
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep sessionId reference stable for the memoized value
  const sessionId = currentSessionId;

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, [messages, isStreaming]);

  /* Auto-focus input when widget opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  const hasUserSent = messages.some((m) => m.role === "user");

  /* Clear chat — reset messages, new session */
  const clearChat = () => {
    if (isStreaming) return;
    setMessages([{ ...INITIAL_MESSAGE, timestamp: Date.now() }]);
    setValue("");
    setCurrentSessionId(
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}`
    );
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isStreaming) return;

    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed, timestamp: now },
      { role: "assistant", content: "", timestamp: now }
    ]);
    setValue("");
    setIsStreaming(true);

    try {
      let continueWatching: ContinueItem[] = [];
      try {
        const raw = localStorage.getItem(CONTINUE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ContinueItem[];
          continueWatching = Array.isArray(parsed) ? parsed.slice(0, 12) : [];
        }
      } catch {
        continueWatching = [];
      }

      const response = await fetch("/api/support-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: trimmed, continueWatching })
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
          next[next.length - 1] = { role: "assistant", content: streamed, timestamp: now };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "I'm currently unavailable. Please email support@shortfundly.com and we'll help you as soon as possible.",
          timestamp: Date.now()
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* ─── Floating Action Button ─── */}
      <div className="fixed bottom-5 right-5 z-[70]">
        {!open && (
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/50 duration-[3000ms]" />
        )}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close support chat" : "Open AI support chat"}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 ring-2 ring-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(251,90,50,0.6)] shadow-[0_0_15px_rgba(251,90,50,0.3)]
            ${open
              ? "scale-90 rotate-90 ease-out"
              : "hover:scale-110 hover:-translate-y-1 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90"
            }`}
        >
          {open ? (
            <CloseIcon className="h-6 w-6 text-white transition-opacity duration-300" />
          ) : (
            <BotIcon className="h-9 w-9 drop-shadow-[0_0_5px_rgba(251,90,50,0.8)] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(251,90,50,1)]" />
          )}
        </button>
      </div>

      {/* ─── Chat Panel ─── */}
      {open && (
        <section
          className="fixed bottom-24 right-4 z-[70] flex h-[70vh] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-zinc-700/70 bg-zinc-950/95 shadow-2xl shadow-black/70 backdrop-blur-xl md:right-5 md:w-[25rem] animate-rise"
          role="dialog"
          aria-label="Support chat"
        >
          {/* ── Header ── */}
          <header className="relative border-b border-zinc-800/80 px-5 py-4 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
                  <BotIcon className="h-6 w-6" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold leading-tight">Shortfundly AI Support</h2>
                  <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                    {isStreaming ? (
                      <span className="text-emerald-400">Typing a response…</span>
                    ) : (
                      "Typically replies instantly"
                    )}
                  </p>
                </div>
              </div>

              {/* Clear chat button — only visible when there's conversation history */}
              {hasUserSent && (
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={isStreaming}
                  aria-label="Clear chat history"
                  title="Clear chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-zinc-800 hover:text-zinc-300 active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </header>

          {/* ── Messages ── */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-1 overflow-y-auto px-4 py-4 scrollbar-hide"
          >
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const isLast = index === messages.length - 1;
              const showTimestamp =
                index === 0 ||
                message.role !== messages[index - 1].role ||
                message.timestamp - messages[index - 1].timestamp > 60_000;

              return (
                <div key={`${message.role}-${index}`} className="animate-msg">
                  {/* Timestamp divider */}
                  {showTimestamp && (
                    <p className={`text-[10px] text-zinc-600 mb-1 mt-2 ${isUser ? "text-right pr-1" : "pl-1"}`}>
                      {isUser ? "You" : "Support"} · {relativeTime(message.timestamp)}
                    </p>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed transition-all ${
                      isUser
                        ? "ml-auto bg-gradient-to-br from-primary to-primary/85 text-white rounded-br-md"
                        : "bg-zinc-900/90 text-zinc-100 ring-1 ring-zinc-800/60 rounded-bl-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content || (isStreaming && isLast ? null : "")}</p>
                  </div>

                  {/* Typing indicator for empty streaming message */}
                  {isStreaming && isLast && !message.content && !isUser && (
                    <TypingIndicator />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Quick Replies (only shown before first user message) ── */}
          {!hasUserSent && (
            <div className="border-t border-zinc-800/50 px-4 pt-3 pb-1">
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2 font-medium">Quick questions</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    type="button"
                    onClick={() => sendQuestion(qr.question)}
                    disabled={isStreaming}
                    className="rounded-full border border-zinc-700/60 bg-zinc-900/50 px-3 py-1.5 text-[11px] text-zinc-400 transition-all duration-200 hover:border-primary/60 hover:text-white hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Input Area ── */}
          <div className="border-t border-zinc-800/60 px-4 py-3 bg-zinc-950/60">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendQuestion(value);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={isStreaming ? "Waiting for response…" : "Type your question…"}
                disabled={isStreaming}
                className="h-11 flex-1 rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-primary/70 focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isStreaming || !value.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_12px_rgba(251,90,50,0.35)] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
                aria-label="Send message"
              >
                <SendIcon className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
