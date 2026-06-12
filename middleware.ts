import { NextRequest, NextResponse } from "next/server";
import { CRM_COOKIE, isValidSessionValue } from "@/lib/crm/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // La pagina di login è sempre accessibile.
  if (pathname === "/crm/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(CRM_COOKIE)?.value;
  const valid = await isValidSessionValue(cookie);

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/crm/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm", "/crm/:path*"],
};
