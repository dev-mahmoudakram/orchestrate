import type { ReactNode } from "react";

import { AdminRouteProgress } from "@/components/admin/admin-route-progress";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";
import type { CurrentAdminUser } from "@/lib/auth/auth";

type AdminShellProps = {
  children: ReactNode;
  user: CurrentAdminUser;
};

export function AdminShell({ children, user }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-soft text-petrol" dir="ltr">
      <AdminRouteProgress />
      <div className="flex min-h-screen">
        <Sidebar user={user} />
        <div className="min-w-0 flex-1">
          <Topbar user={user} />
          <main className="px-5 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
