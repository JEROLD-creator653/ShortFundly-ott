import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { getDemoUserById } from "@/lib/persistence/local-store";
import { formatSuggestionLine, getSubscriptionSuggestion } from "@/lib/subscription-ai";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ ok: true, authenticated: false, user: null });
  }

  const user = await getDemoUserById(session.userId);
  if (!user) {
    return NextResponse.json({ ok: true, authenticated: false, user: null });
  }

  const suggestion = getSubscriptionSuggestion(user.subscription.plan, user.activity);

  return NextResponse.json({
    ok: true,
    authenticated: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      details: user.details,
      activity: user.activity,
      subscription: {
        ...user.subscription,
        aiSuggestion: suggestion,
        aiSummary: formatSuggestionLine(user.subscription.plan, suggestion)
      }
    }
  });
}
