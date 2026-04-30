"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { getDirection, getLocaleFromPathname } from "@/lib/i18n/locale";

export function HtmlLocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname);

    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [pathname]);

  return null;
}
