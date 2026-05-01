"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen || !isRendered) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsRendered(false);
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [isOpen, isRendered]);

  function openMenu() {
    setIsRendered(true);
    window.requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  }

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        className="inline-flex min-h-10 items-center rounded-md border border-petrol/15 bg-white px-4 text-sm font-semibold text-petrol shadow-sm"
        onClick={toggleMenu}
        type="button"
      >
        {menuLabel}
      </button>

      {isRendered ? (
        <div
          className={`absolute inset-x-5 top-24 z-50 origin-top rounded-lg border border-petrol/10 bg-white p-4 shadow-[0_24px_70px_rgba(15,61,68,0.18)] transition-all duration-200 ease-out ${
            isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
          }`}
        >
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {navItems.map((item) => (
              <Link
                className={`rounded-md px-3 py-3 text-sm font-semibold transition ${
                  item.isActive ? "bg-orange/10 text-orange" : "text-petrol hover:bg-soft"
                }`}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-petrol/10 pt-4">
            <LanguageSwitcher
              className="min-h-11 justify-center"
              currentLocale={currentLocale}
              currentPathname={currentPathname}
              labels={languageLabels}
            />
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]"
              href={ctaHref}
              onClick={closeMenu}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
