import Link from "next/link";

import { SidebarNav } from "@/components/admin/sidebar-nav";
import { canManageUsers } from "@/lib/auth/permissions";
import type { CurrentAdminUser } from "@/lib/auth/auth";

const navItems = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/sectors", label: "Sectors" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/translations", label: "Translations" },
  { href: "/admin/settings", label: "Settings", requiresSuperAdmin: true },
  { href: "/admin/users", label: "Users", requiresSuperAdmin: true },
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
        <span className="block text-sm text-white/70">Orchestrate CMS</span>
        <span className="mt-1 block text-lg font-semibold">Orchestrate Innovation</span>
      </Link>
      <SidebarNav items={visibleNavItems} />
      <p className="mt-8 rounded-md bg-soft p-4 text-xs leading-6 text-petrol/65">
        Signed in as {user.role.replace("_", " ").toLowerCase()}.
      </p>
    </aside>
  );
}
