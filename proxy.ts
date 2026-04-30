import { NextRequest, NextResponse } from "next/server";

import { getLocaleFromPathname } from "@/lib/i18n/locale";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = getLocaleFromPathname(request.nextUrl.pathname);

  requestHeaders.set("x-orchestrate-locale", locale);
  requestHeaders.set("x-orchestrate-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
