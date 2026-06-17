import { NextRequest, NextResponse } from "next/server";

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

type RateLimitConfig = {
  limit: number;
  windowMs?: number;
};

type RateLimitOutcome =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

/** In-memory sliding window — best effort per istanza serverless (Vercel Node). */
const hits = new Map<string, number[]>();

function pruneStore(windowStart: number) {
  if (hits.size <= 5000) return;

  for (const [key, timestamps] of hits) {
    const active = timestamps.filter((t) => t > windowStart);
    if (active.length === 0) hits.delete(key);
    else hits.set(key, active);
  }
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

export function checkRateLimit(
  key: string,
  { limit, windowMs = FIFTEEN_MINUTES_MS }: RateLimitConfig
): RateLimitOutcome {
  const now = Date.now();
  const windowStart = now - windowMs;

  const previous = hits.get(key) ?? [];
  const active = previous.filter((t) => t > windowStart);

  if (active.length >= limit) {
    const oldest = active[0] ?? now;
    const retryAfterMs = Math.max(oldest + windowMs - now, 1000);
    hits.set(key, active);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  active.push(now);
  hits.set(key, active);
  pruneStore(windowStart);

  return { allowed: true };
}

export function rateLimitResponse(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { error: "Too many requests" },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    }
  );
}

/** Returns a 429 response when limited, otherwise null. */
export function enforceRateLimit(
  req: NextRequest,
  namespace: string,
  limit: number,
  windowMs = FIFTEEN_MINUTES_MS
): NextResponse | null {
  const ip = getClientIp(req);
  const outcome = checkRateLimit(`${namespace}:${ip}`, { limit, windowMs });

  if (!outcome.allowed) {
    return rateLimitResponse(outcome.retryAfterSeconds);
  }

  return null;
}
