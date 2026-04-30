import { EmptyState } from "@/components/ui/empty-state";
import { requireSuperAdmin } from "@/lib/auth/auth";

export default async function AdminUsersPage() {
  await requireSuperAdmin();

  return (
    <EmptyState
      description="This route is guarded for SUPER_ADMIN only. User management CRUD will be implemented in a later admin CMS phase."
      title="Users management placeholder"
    />
  );
}
