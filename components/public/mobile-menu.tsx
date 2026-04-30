"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import type { Locale } from "@/types/locale";

type NavItem = {
  href: string;
  label: string;
  isActive: boolean;
};

type MobileMenuProps = {
  ctaHref: string;
  ctaLabel: string;
  currentLocale: Locale;
  currentPathname: string;
  languageLabels: {
    ar?: string;
    en?: string;
  };
  menuLabel: string;
  navItems: NavItem[];
};

export function MobileMenu({
  ctaHref,
  ctaLabel,
  currentLocale,
  currentPathname,
  languageLabels,
  menuLabel,
  navItems,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        className="inline-flex min-h-10 items-center rounded-md border border-petrol/15 bg-white px-4 text-sm font-semibold text-petrol"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        {menuLabel}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-5 top-20 z-50 rounded-lg border border-petrol/10 bg-white p-4 shadow-[0_24px_70px_rgba(15,61,68,0.18)]">
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {navItems.map((item) => (
              <Link
                className={`rounded-md px-3 py-3 text-sm font-semibold transition ${
                  item.isActive ? "bg-orange/10 text-orange" : "text-petrol hover:bg-petrol/5"
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-3 border-t border-petrol/10 pt-4">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]"
              href={ctaHref}
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </Link>
            <LanguageSwitcher currentLocale={currentLocale} currentPathname={currentPathname} labels={languageLabels} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
