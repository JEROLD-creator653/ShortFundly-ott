import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth/admin";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { connectMongo } from "@/lib/db/mongo";
import { SupportChat } from "@/lib/models/support-chat";
import { hasMongoConnection, listSupportChats } from "@/lib/persistence/local-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  const hasSessionAccess = Boolean(session && session.role === "admin");

  if (!hasSessionAccess && !isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const chats = hasMongoConnection()
    ? await (async () => {
        await connectMongo();
        return SupportChat.find({})
          .sort({ updatedAt: -1 })
          .limit(200)
          .select({
            sessionId: 1,
            userEmail: 1,
            escalated: 1,
            escalationEmail: 1,
            messages: 1,
            createdAt: 1,
            updatedAt: 1
          })
          .lean();
      })()
    : await listSupportChats(200);

  return NextResponse.json({ ok: true, chats });
}
