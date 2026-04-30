import { EmptyState } from "@/components/ui/empty-state";

export default function AdminUsersPage() {
  return (
    <EmptyState
      description="This route must be guarded for SUPER_ADMIN only when RBAC is implemented in Phase 3."
      title="Users placeholder"
    />
  );
}
