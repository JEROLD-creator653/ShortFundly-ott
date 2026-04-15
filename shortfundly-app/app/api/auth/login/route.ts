import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth/demo-session";
import { touchDemoUserLogin, validateDemoCredentials } from "@/lib/persistence/local-store";

type LoginBody = {
  email?: string;
  password?: string;
  role?: "user" | "admin";
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as LoginBody;
  const email = String(body.email || "").trim();
  const password = String(body.password || "").trim();
  const role = body.role === "admin" ? "admin" : "user";

  if (!email || !password) {
    return NextResponse.json({ ok: false, message: "email and password are required" }, { status: 400 });
  }

  const user = await validateDemoCredentials(email, password, role);
  if (!user) {
    return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
  }

  await touchDemoUserLogin(user._id);

  const response = NextResponse.json({
    ok: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      subscription: user.subscription
    }
  });

  setSessionCookie(response, {
    userId: user._id,
    role: user.role,
    name: user.name,
    email: user.email
  });

  return response;
}
