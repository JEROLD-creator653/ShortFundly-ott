import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { listDemoUsers } from "@/lib/persistence/local-store";
import { getSubscriptionSuggestion } from "@/lib/subscription-ai";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const users = await listDemoUsers();
  const userRows = users
    .filter((user) => user.role === "user")
    .map((user) => {
      const suggestion = getSubscriptionSuggestion(user.subscription.plan, user.activity);
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        activity: user.activity,
        aiSuggestion: suggestion
      };
    });

  return NextResponse.json({ ok: true, users: userRows });
}
