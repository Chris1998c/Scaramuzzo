import { NextRequest, NextResponse } from "next/server";
import { CRM_COOKIE } from "@/lib/crm/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/crm/login", req.url), {
    status: 303,
  });
  res.cookies.set(CRM_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
