import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  // Handle unauthenticated user access
  if (!currentUser) {
    if (
      pathname.startsWith("/profile") ||
      pathname.startsWith("/authTask") ||
      pathname.startsWith("/authBlog")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next(); // Allow access to other routes
  }

  // Handle authenticated user access
  if (currentUser) {
    if (pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/authTask", request.url));
    }
    return NextResponse.next(); // Allow access to other routes
  }

  // Default response
  return NextResponse.next();
}
