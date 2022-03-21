import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl: url } = req;
  if (url.pathname.includes("/api")) {
    const token = url.searchParams.get("token");

    if (token !== process.env.NEXT_PUBLIC_BLOGGER_TOKEN) {
      return NextResponse.json({ error: "Invalid Token" });
    }
    return NextResponse.rewrite(url);
  }
}
