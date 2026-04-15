import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { getDemoUserById, updateDemoUserDetails } from "@/lib/persistence/local-store";
import { formatSuggestionLine, getSubscriptionSuggestion } from "@/lib/subscription-ai";

type ProfileBody = {
  name?: string;
  phone?: string;
  location?: string;
  favoriteGenres?: string[];
};

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const user = await getDemoUserById(session.userId);
  if (!user) {
    return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
  }

  const suggestion = getSubscriptionSuggestion(user.subscription.plan, user.activity);

  return NextResponse.json({
    ok: true,
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
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

export async function PATCH(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as ProfileBody;

  const updated = await updateDemoUserDetails(session.userId, {
    name: body.name,
    phone: body.phone,
    location: body.location,
    favoriteGenres: body.favoriteGenres
  });

  if (!updated) {
    return NextResponse.json({ ok: false, message: "Unable to update profile" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, profile: updated });
}
