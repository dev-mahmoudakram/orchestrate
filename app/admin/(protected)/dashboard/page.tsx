import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/auth";
import { canManageSettings, canManageUsers } from "@/lib/auth/permissions";

const phaseModules = [
  "Pages",
  "Services",
  "Projects",
  "Sectors",
  "Partners",
  "Team",
  "Messages",
  "Translations",
  "Settings",
  "Users",
];

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const visibleModules = phaseModules.filter((module) => {
    if (module === "Users") {
      return canManageUsers(user);
    }

    if (module === "Settings") {
      return canManageSettings(user);
    }

    return true;
  });

  return (
    <div>
      <Badge tone="orange">Dashboard overview</Badge>
      <h2 className="mt-4 text-3xl font-semibold text-petrol">CMS foundation</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-petrol/65">
        This shell establishes the admin route map. Auth, RBAC, server actions, and database-backed modules are intentionally scheduled for later phases.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {visibleModules.map((module) => (
          <Card className="min-h-28" key={module}>
            <p className="font-semibold text-petrol">{module}</p>
            <p className="mt-3 text-sm text-petrol/60">Pending implementation</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
