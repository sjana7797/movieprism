import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  if (!url.pathname.includes("/api")) {
    const country = geo?.country || "IN";
    url.searchParams.set("country", country);
    return NextResponse.rewrite(url);
  }
}
