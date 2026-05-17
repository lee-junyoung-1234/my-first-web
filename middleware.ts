import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/login" || pathname === "/signup") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/posts/new")) {
    // simple cookie-based presence check; replace with robust server-side session check when configured
    const cookie = req.headers.get("cookie") || "";
    const hasAuth = /sb-|supabase|sb:/.test(cookie);
    if (!hasAuth) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.search = `redirect=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/posts/new"],
};
