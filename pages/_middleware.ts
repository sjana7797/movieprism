import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { nextUrl: url, geo } = req;
  const country = geo?.country || "US";
  url.searchParams.set("country", country);
  return NextResponse.rewrite(url);
}
