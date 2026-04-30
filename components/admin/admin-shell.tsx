import type { ReactNode } from "react";

import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-soft text-petrol" dir="ltr">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <main className="px-5 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
