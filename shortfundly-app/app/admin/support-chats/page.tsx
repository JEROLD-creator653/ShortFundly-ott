import { connectMongo } from "@/lib/db/mongo";
import { SupportChat } from "@/lib/models/support-chat";
import { hasMongoConnection, listSupportChats } from "@/lib/persistence/local-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function SupportChatsAdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token || "";

  if (!process.env.ADMIN_DASHBOARD_TOKEN || token !== process.env.ADMIN_DASHBOARD_TOKEN) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 md:px-8">
        <h1 className="text-3xl uppercase [font-family:var(--font-heading)]">Support Chats Admin</h1>
        <p className="mt-4 text-zinc-300">
          Unauthorized. Add your token in URL query: <span className="text-primary">?token=YOUR_ADMIN_DASHBOARD_TOKEN</span>
        </p>
      </div>
    );
  }

  const chats = hasMongoConnection()
    ? await (async () => {
        await connectMongo();
        return SupportChat.find({}).sort({ updatedAt: -1 }).limit(100).lean();
      })()
    : await listSupportChats(100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl uppercase [font-family:var(--font-heading)]">Support Chats</h1>
          <p className="mt-2 text-sm text-zinc-400">Recent AI support conversations and escalation status</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300">
          Total sessions: <span className="font-semibold text-white">{chats.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {chats.map((chat: any) => (
          <article key={chat._id.toString()} className="rounded-2xl border border-zinc-800 bg-zinc-950/75 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Session</p>
                <p className="text-sm text-zinc-200">{chat.sessionId}</p>
              </div>
              <div className="text-sm text-zinc-300">
                {chat.escalated ? (
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-300">Escalated</span>
                ) : (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">Resolved by AI</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {(chat.messages || []).slice(-6).map((msg: any, idx: number) => (
                <div
                  key={`${chat._id.toString()}-${idx}`}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-900/50 text-zinc-300"
                  }`}
                >
                  <span className="mr-2 text-xs uppercase tracking-wider text-zinc-500">{msg.role}</span>
                  {msg.content}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
