import { NextRequest, NextResponse } from "next/server";
import {
  CRM_COOKIE,
  CRM_COOKIE_MAX_AGE,
  expectedSessionToken,
  isCrmAuthConfigured,
  verifyPassword,
} from "@/lib/crm/auth";
import { enforceRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const limited = enforceRateLimit(req, "crm-login", 10);
  if (limited) return limited;

  if (!isCrmAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/crm/login?error=config", req.url),
      { status: 303 }
    );
  }

  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  const ok = await verifyPassword(password);
  if (!ok) {
    return NextResponse.redirect(new URL("/crm/login?error=1", req.url), {
      status: 303,
    });
  }

  const token = await expectedSessionToken();
  const res = NextResponse.redirect(new URL("/crm", req.url), { status: 303 });

  if (token) {
    res.cookies.set(CRM_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: CRM_COOKIE_MAX_AGE,
    });
  }

  return res;
}
