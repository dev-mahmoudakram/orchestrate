import { EmptyState } from "@/components/ui/empty-state";
import { requireSuperAdmin } from "@/lib/auth/auth";

export default async function AdminSettingsPage() {
  await requireSuperAdmin();

  return (
    <EmptyState
      description="هذه الصفحة متاحة للمدير العام فقط. سيتم تنفيذ إعدادات بيانات التواصل والروابط الاجتماعية والبيانات العامة من قاعدة البيانات."
      title="الإعدادات"
    />
  );
}
