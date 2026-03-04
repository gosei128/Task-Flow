import { auth } from "@/middleware/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Protected routes that require authentication
  const protectedRoutes = ["/app"];

  const pathname = request.nextUrl.pathname;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    // Check if user is authenticated
    const session = await auth();

    if (!session || !session.user) {
      // Redirect to sign in page or home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/app/:path*"],
};
