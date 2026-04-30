"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarNavItem = {
  href: string;
  label: string;
};

type SidebarNavProps = {
  items: SidebarNavItem[];
};

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="mt-8 space-y-1">
      {items.map((item) => {
        const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            aria-current={isCurrent ? "page" : undefined}
            className={`block rounded-md px-4 py-3 text-sm font-medium transition ${
              isCurrent
                ? "border border-orange/30 bg-orange/10 text-orange shadow-sm"
                : "text-petrol/75 hover:bg-soft hover:text-petrol"
            }`}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
