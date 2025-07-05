import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from 'jose'

export default async function middleware(req: NextRequest) {
  // Extract JWT from cookies or Authorization header
  const token =
    req.cookies.get("token")?.value ||
    (req.headers.get("Authorization")
      ? req.headers.get("Authorization")!.replace("Bearer ", "")
      : "");

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "JWT secret is not defined in environment variables",
        },
        { status: 500 }
      );
    }
    const secret = new TextEncoder().encode(jwtSecret);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.log("Something went wrong in middleware", error)
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/seller/:path*"],
};