import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host"); // e.g. "juan-kingdom.vercel.app"

  // Redirect root path only for specific domain
  if (url.pathname === "/" && hostname === "juan-kingdom.vercel.app") {
    return NextResponse.redirect(new URL("/draft", request.url));
  }

  // Add a custom header to all other responses
  const response = NextResponse.next();
  response.headers.set("x-custom-path", url.pathname);
  return response;
}

export const config = {
  matcher: ["/", "/:path*"], // Run on root and all subpaths
};
