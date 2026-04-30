import Link from "next/link";

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
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/users", label: "Users" },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-e border-petrol/10 bg-white px-5 py-6 lg:block">
      <Link className="block rounded-lg bg-petrol px-4 py-4 text-white" href="/admin/dashboard">
        <span className="block text-sm text-white/70">Orchestrate CMS</span>
        <span className="mt-1 block text-lg font-semibold">تناغم الابتكار</span>
      </Link>
      <nav className="mt-8 space-y-1">
        {navItems.map((item) => (
          <Link
            className="block rounded-md px-4 py-3 text-sm font-medium text-petrol/75 transition hover:bg-soft hover:text-petrol"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p className="mt-8 rounded-md bg-soft p-4 text-xs leading-6 text-petrol/65">
        Auth and role-filtered navigation are scheduled for Phase 3.
      </p>
    </aside>
  );
}
