import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

export type DemoRole = "user" | "admin";

export type DemoSession = {
  userId: string;
  role: DemoRole;
  name: string;
  email: string;
};

const SESSION_COOKIE = "sf_demo_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret() {
  return process.env.DEMO_SESSION_SECRET?.trim() || "shortfundly-demo-secret";
}

function b64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadEncoded: string) {
  return b64Url(crypto.createHmac("sha256", getSessionSecret()).update(payloadEncoded).digest());
}

export function createSessionToken(session: DemoSession) {
  const payload = {
    ...session,
    iat: Date.now()
  };

  const payloadEncoded = b64Url(JSON.stringify(payload));
  const signature = sign(payloadEncoded);
  return `${payloadEncoded}.${signature}`;
}

export function verifySessionToken(token?: string | null): DemoSession | null {
  if (!token) return null;

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) return null;

  const expectedSig = sign(payloadEncoded);
  const sigA = Buffer.from(signature);
  const sigB = Buffer.from(expectedSig);

  if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payloadEncoded, "base64url").toString("utf8")) as DemoSession & {
      iat?: number;
    };

    if (!parsed.userId || !parsed.role || !parsed.email || !parsed.name) {
      return null;
    }

    if (parsed.role !== "user" && parsed.role !== "admin") {
      return null;
    }

    return {
      userId: parsed.userId,
      role: parsed.role,
      name: parsed.name,
      email: parsed.email
    };
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, session: DemoSession) {
  const token = createSessionToken(session);

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0
  });
}

export function getSessionFromRequest(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function getServerSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value || null);
}
