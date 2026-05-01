import Link from "next/link";

import { SidebarNav } from "@/components/admin/sidebar-nav";
import { canManageUsers } from "@/lib/auth/permissions";
import type { CurrentAdminUser } from "@/lib/auth/auth";

const navItems = [
  { href: "/admin/dashboard", label: "نظرة عامة" },
  { href: "/admin/pages", label: "الصفحات" },
  { href: "/admin/services", label: "الخدمات" },
  { href: "/admin/projects", label: "المشاريع" },
  { href: "/admin/sectors", label: "القطاعات" },
  { href: "/admin/partners", label: "الشركاء" },
  { href: "/admin/team", label: "الفريق" },
  { href: "/admin/messages", label: "الرسائل" },
  { href: "/admin/translations", label: "الترجمات" },
  { href: "/admin/settings", label: "الإعدادات", requiresSuperAdmin: true },
  { href: "/admin/users", label: "المستخدمون", requiresSuperAdmin: true },
];

type SidebarProps = {
  user: CurrentAdminUser;
};

export function Sidebar({ user }: SidebarProps) {
  const visibleNavItems = navItems.filter((item) => {
    if (item.requiresSuperAdmin) {
      return canManageUsers(user);
    }

    return true;
  });

  return (
    <aside className="sticky top-0 hidden h-screen w-72 overflow-y-auto border-e border-petrol/10 bg-white px-5 py-6 lg:block">
      <Link className="block rounded-lg bg-petrol px-4 py-4 text-white" href="/admin/dashboard">
        <span className="block text-sm text-white/70">نظام إدارة المحتوى</span>
        <span className="mt-1 block text-lg font-semibold">تناغم الابتكار</span>
      </Link>
      <SidebarNav items={visibleNavItems} />
      <p className="mt-8 rounded-md bg-soft p-4 text-xs leading-6 text-petrol/65">
        مسجل الدخول بصلاحية {user.role === "SUPER_ADMIN" ? "مدير عام" : "مدير محتوى"}.
      </p>
    </aside>
  );
}
