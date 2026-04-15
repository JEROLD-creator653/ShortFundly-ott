import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth/admin";
import { connectMongo } from "@/lib/db/mongo";
import { SupportChat } from "@/lib/models/support-chat";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectMongo();

  const chats = await SupportChat.find({})
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

  return NextResponse.json({ ok: true, chats });
}
