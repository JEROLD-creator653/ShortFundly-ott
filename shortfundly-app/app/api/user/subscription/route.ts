import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { getDemoUserById, updateDemoUserSubscription } from "@/lib/persistence/local-store";
import { formatSuggestionLine, getSubscriptionSuggestion, type PlanType } from "@/lib/subscription-ai";

type SubscriptionBody = {
  plan?: PlanType;
};

export async function PATCH(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SubscriptionBody;
  const plan = body.plan;

  if (!plan || !["free", "monthly", "yearly"].includes(plan)) {
    return NextResponse.json({ ok: false, message: "A valid plan is required" }, { status: 400 });
  }

  const updated = await updateDemoUserSubscription(session.userId, plan);
  if (!updated) {
    return NextResponse.json({ ok: false, message: "Subscription update failed" }, { status: 400 });
  }

  const user = await getDemoUserById(session.userId);
  if (!user) {
    return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
  }

  const suggestion = getSubscriptionSuggestion(user.subscription.plan, user.activity);

  return NextResponse.json({
    ok: true,
    subscription: {
      ...user.subscription,
      aiSuggestion: suggestion,
      aiSummary: formatSuggestionLine(user.subscription.plan, suggestion)
    }
  });
}
