import crypto from "node:crypto";

const ADMIN_TOKEN = process.env.ADMIN_DASHBOARD_TOKEN;

function secureCompare(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function isAdminAuthorized(request: Request) {
  if (!ADMIN_TOKEN) {
    return false;
  }

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  const headerToken = request.headers.get("x-admin-token")?.trim();
  const token = bearer || headerToken;

  if (!token) {
    return false;
  }

  return secureCompare(token, ADMIN_TOKEN);
}
