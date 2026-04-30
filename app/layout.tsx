import type { Metadata } from "next";
import { headers } from "next/headers";

import "@/app/globals.css";
import { brand } from "@/lib/constants/brand";
import { defaultLocale } from "@/lib/i18n/config";
import { getDirection, isLocale } from "@/lib/i18n/locale";
import type { Locale } from "@/types/locale";

export const metadata: Metadata = {
  title: {
    default: `${brand.nameAr} | ${brand.nameEn}`,
    template: `%s | ${brand.nameEn}`,
  },
  description:
    "Premium bilingual corporate website and custom CMS foundation for Orchestrate Innovation.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-orchestrate-locale") ?? defaultLocale;
  const locale: Locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
