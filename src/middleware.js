import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.pathname; // Get the requested path (e.g., "/web-dev")

  // Clone the response and set a custom header
  const response = NextResponse.next();
  response.headers.set("x-custom-path", url); // ✅ Adds a custom header for reliable pathname detection

  return response;
}

// Apply middleware to all paths
export const config = {
  matcher: "/:path*", // ✅ Runs middleware for all routes
};
