import { EmptyState } from "@/components/ui/empty-state";
import { requireSuperAdmin } from "@/lib/auth/auth";

export default async function AdminUsersPage() {
  await requireSuperAdmin();

  return (
    <EmptyState
      description="هذه الصفحة متاحة للمدير العام فقط. سيتم تنفيذ إدارة المستخدمين والصلاحيات في مرحلة لاحقة."
      title="إدارة المستخدمين"
    />
  );
}
