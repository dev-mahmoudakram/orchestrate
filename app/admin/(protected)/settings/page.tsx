import { EmptyState } from "@/components/ui/empty-state";
import { requireSuperAdmin } from "@/lib/auth/auth";

export default async function AdminSettingsPage() {
  await requireSuperAdmin();

  return (
    <EmptyState
      description="This route is guarded for SUPER_ADMIN only. Site settings for contact data, social links, and global metadata will be implemented with the database."
      title="Settings placeholder"
    />
  );
}
