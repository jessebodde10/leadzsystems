import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE = true; // zet op false om onderhoud uit te zetten

export function middleware(request: NextRequest) {
  if (!MAINTENANCE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Onderhoudspagina zelf doorlaten, anders loop
  if (pathname.startsWith("/maintenance")) return NextResponse.next();

  // Statische bestanden en Next.js internals doorlaten
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/logo") ||
    pathname.startsWith("/icon") ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/maintenance", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
