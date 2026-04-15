import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { getDemoUserById, recordDemoUserActivity } from "@/lib/persistence/local-store";
import { formatSuggestionLine, getSubscriptionSuggestion } from "@/lib/subscription-ai";

type ActivityBody = {
  watchMinutes?: number;
  completed?: boolean;
  searched?: boolean;
  liked?: boolean;
  supportChat?: boolean;
};

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as ActivityBody;

  const updated = await recordDemoUserActivity(session.userId, {
    watchMinutes: Number.isFinite(body.watchMinutes) ? Math.max(0, Number(body.watchMinutes)) : 0,
    completed: Boolean(body.completed),
    searched: Boolean(body.searched),
    liked: Boolean(body.liked),
    supportChat: Boolean(body.supportChat)
  });

  if (!updated) {
    return NextResponse.json({ ok: false, message: "Activity update failed" }, { status: 400 });
  }

  const user = await getDemoUserById(session.userId);
  if (!user) {
    return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
  }

  const suggestion = getSubscriptionSuggestion(user.subscription.plan, user.activity);

  return NextResponse.json({
    ok: true,
    activity: user.activity,
    aiSummary: formatSuggestionLine(user.subscription.plan, suggestion)
  });
}
