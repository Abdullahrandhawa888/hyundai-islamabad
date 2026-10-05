import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) {
    throw new Error("ADMIN_SESSION_SECRET is not set. Add a long random string as an environment variable.");
  }
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Build a signed session cookie value: "<base64url email>.<expiryEpoch>.<signature>"
 * The email is base64url-encoded before joining with "." because email
 * addresses can themselves contain "." (e.g. "name@example.com"), which
 * would make a plain "." split ambiguous. */
export function createSessionToken(email: string): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const encodedEmail = Buffer.from(email, "utf-8").toString("base64url");
  const payload = `${encodedEmail}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

/** Verify a session cookie value. Returns the logged-in email, or null if
 * missing, malformed, expired, or tampered with. */
export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [encodedEmail, expiresStr, signature] = parts;
  const payload = `${encodedEmail}.${expiresStr}`;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Date.now() / 1000) return null;
  try {
    return Buffer.from(encodedEmail, "base64url").toString("utf-8");
  } catch {
    return null;
  }
}

/** Validate a login attempt against the configured admin accounts.
 * ADMIN_USERS format: "email1:password1,email2:password2" */
export function checkCredentials(email: string, password: string): boolean {
  const raw = process.env.ADMIN_USERS;
  if (!raw) {
    throw new Error("ADMIN_USERS is not set. Add it as \"email:password,email2:password2\".");
  }
  const accounts = raw.split(",").map((pair) => {
    const idx = pair.indexOf(":");
    return { email: pair.slice(0, idx).trim(), password: pair.slice(idx + 1) };
  });
  const match = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  if (!match) return false;
  const a = Buffer.from(match.password);
  const b = Buffer.from(password);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
