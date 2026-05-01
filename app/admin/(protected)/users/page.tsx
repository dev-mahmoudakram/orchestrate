import {
  activateUserAction,
  createUserAction,
  deactivateUserAction,
  updateUserAction,
} from "@/app/admin/(protected)/users/actions";
import { AdminPageHeading, CheckboxField, CmsNotice, TextField } from "@/components/admin/cms-fields";
import { ReactSelectField } from "@/components/admin/react-select-field";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireSuperAdmin } from "@/lib/auth/auth";
import { UserRole } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type AdminUsersPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "cannot-deactivate-self": "لا يمكن تعطيل حسابك الحالي.",
  "duplicate-email": "يوجد مستخدم بنفس البريد الإلكتروني بالفعل.",
  "invalid-email": "صيغة البريد الإلكتروني غير صحيحة.",
  "missing-id": "تعذر العثور على المستخدم المحدد.",
  "missing-name": "اسم المستخدم مطلوب.",
  "weak-password": "كلمة المرور يجب ألا تقل عن 8 أحرف.",
};

const roleOptions = [
  { label: "مدير محتوى", value: UserRole.ADMIN },
  { label: "مدير عام", value: UserRole.SUPER_ADMIN },
];

function formatDate(date?: Date | null) {
  if (!date) {
    return "لم يسجل الدخول بعد";
  }

  return new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function PasswordField({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="flex flex-col justify-between">
      <span className="text-sm font-medium text-petrol">{label}</span>
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
        minLength={8}
        name={name}
        required={required}
        type="password"
      />
    </label>
  );
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const currentUser = await requireSuperAdmin();
  const { error, saved } = await searchParams;
  const users = await prisma.user.findMany({
    orderBy: [{ role: "desc" }, { createdAt: "asc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={users.length}
        description="إدارة مستخدمي لوحة التحكم والصلاحيات. المدير العام فقط يستطيع إنشاء المستخدمين أو تغيير الأدوار أو تعطيل الحسابات."
        label="صلاحيات الإدارة"
        title="إدارة المستخدمين"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ المستخدم."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ المستخدم: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء مستخدم</h3>
        <form action={createUserAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="الاسم" name="name" required />
            <TextField dir="ltr" label="البريد الإلكتروني" name="email" required type="email" />
            <PasswordField label="كلمة المرور" name="password" required />
            <ReactSelectField
              defaultValue={UserRole.ADMIN}
              emptyLabel="اختر الدور"
              label="الدور"
              name="role"
              options={roleOptions}
              placeholder="اختر الدور"
            />
          </div>
          <CheckboxField defaultChecked label="حساب فعال" name="isActive" />
          <button className="min-h-11 rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]" type="submit">
            إنشاء المستخدم
          </button>
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">المستخدمون الحاليون</h3>
        {users.length === 0 ? (
          <EmptyState description="لا يوجد مستخدمون بعد." title="لا توجد حسابات" />
        ) : (
          <div className="space-y-4">
            {users.map((user) => {
              const isCurrentUser = user.id === currentUser.userId;

              return (
                <Card key={user.id}>
                  <form action={updateUserAction} className="space-y-5">
                    <input name="id" type="hidden" value={user.id} />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{user.name}</h4>
                          <Badge tone={user.isActive ? "turquoise" : "orange"}>{user.isActive ? "فعال" : "معطل"}</Badge>
                          {isCurrentUser ? <Badge>حسابك الحالي</Badge> : null}
                        </div>
                        <p className="mt-1 text-sm text-petrol/55" dir="ltr">
                          {user.email}
                        </p>
                      </div>
                      <p className="text-sm text-petrol/55">آخر دخول: {formatDate(user.lastLoginAt)}</p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-4">
                      <TextField defaultValue={user.name} label="الاسم" name="name" required />
                      <TextField defaultValue={user.email} dir="ltr" label="البريد الإلكتروني" name="email" required type="email" />
                      <PasswordField label="كلمة مرور جديدة" name="password" />
                      <ReactSelectField
                        defaultValue={isCurrentUser ? UserRole.SUPER_ADMIN : user.role}
                        emptyLabel="اختر الدور"
                        label="الدور"
                        name="role"
                        options={roleOptions}
                        placeholder="اختر الدور"
                      />
                    </div>

                    <CheckboxField
                      defaultChecked={isCurrentUser || user.isActive}
                      description={isCurrentUser ? "لا يمكن تعطيل حسابك الحالي." : undefined}
                      label="حساب فعال"
                      name="isActive"
                    />

                    <div className="flex flex-wrap gap-3">
                      <button className="min-h-11 rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]" type="submit">
                        حفظ
                      </button>
                      {!isCurrentUser && user.isActive ? (
                        <button
                          className="min-h-11 rounded-md border border-orange/30 bg-white px-5 text-sm font-semibold text-orange transition hover:bg-orange/10"
                          formAction={deactivateUserAction}
                          type="submit"
                        >
                          تعطيل
                        </button>
                      ) : null}
                      {!isCurrentUser && !user.isActive ? (
                        <button
                          className="min-h-11 rounded-md border border-turquoise/40 bg-turquoise/15 px-5 text-sm font-semibold text-petrol transition hover:bg-turquoise/25"
                          formAction={activateUserAction}
                          type="submit"
                        >
                          تفعيل
                        </button>
                      ) : null}
                    </div>
                  </form>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
