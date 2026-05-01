import type { Metadata } from "next";
import { headers } from "next/headers";
import NextTopLoader from "nextjs-toploader";

import "@/app/globals.css";
import { HtmlLocaleSync } from "@/components/public/html-locale-sync";
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
      <body>
        <NextTopLoader
          color="#E87722"
          crawl
          height={3}
          shadow="0 0 12px rgba(232,119,34,0.55), 0 0 6px rgba(232,119,34,0.35)"
          showSpinner={false}
          zIndex={9999}
        />
        <HtmlLocaleSync />
        {children}
      </body>
    </html>
  );
}
