import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
