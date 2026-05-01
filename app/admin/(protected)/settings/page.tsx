import {
  createSettingAction,
  deleteSettingAction,
  updateSettingAction,
} from "@/app/admin/(protected)/settings/actions";
import { AdminPageHeading, CheckboxField, CmsNotice, TextAreaField, TextField } from "@/components/admin/cms-fields";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireSuperAdmin } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

type AdminSettingsPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-key": "يوجد إعداد بنفس المفتاح بالفعل.",
  "invalid-key": "المفتاح يجب أن يبدأ بحرف أو رقم ويحتوي على أحرف صغيرة وأرقام ونقاط وشرطات فقط.",
  "missing-id": "تعذر العثور على الإعداد المحدد.",
};

const starterSettings = [
  "site.email",
  "site.phone",
  "site.address_ar",
  "site.address_en",
  "site.map_url",
  "social.linkedin",
  "social.x",
];

export default async function AdminSettingsPage({ searchParams }: AdminSettingsPageProps) {
  await requireSuperAdmin();

  const { error, saved } = await searchParams;
  const settings = await prisma.siteSetting.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={settings.length}
        description="إدارة إعدادات الموقع العامة مثل بيانات التواصل، الروابط الاجتماعية، وأي مفاتيح قابلة للاستخدام لاحقاً في الواجهة العامة."
        label="إدارة النظام"
        title="الإعدادات"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ الإعداد."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ الإعداد: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء إعداد</h3>
        <p className="mt-2 text-sm leading-7 text-petrol/60">
          أمثلة مفيدة: {starterSettings.join("، ")}
        </p>
        <form action={createSettingAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <TextField label="المفتاح" name="key" placeholder="site.email" required />
            <TextField defaultValue="general" label="المجموعة" name="group" required />
            <TextField label="العنوان الإداري" name="label" placeholder="البريد الإلكتروني" />
          </div>
          <TextAreaField dir="rtl" label="القيمة" name="value" rows={4} />
          <CheckboxField
            defaultChecked
            description="الإعدادات العامة يمكن استخدامها لاحقاً في الواجهة العامة."
            label="إعداد عام"
            name="isPublic"
          />
          <button className="min-h-11 rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]" type="submit">
            حفظ الإعداد
          </button>
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">الإعدادات الحالية</h3>
        {settings.length === 0 ? (
          <EmptyState description="أنشئ أول إعداد عام للموقع، مثل البريد الإلكتروني أو رقم التواصل." title="لا توجد إعدادات" />
        ) : (
          <div className="space-y-4">
            {settings.map((setting) => (
              <Card key={setting.id}>
                <form action={updateSettingAction} className="space-y-5">
                  <input name="id" type="hidden" value={setting.id} />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-petrol">{setting.label || setting.key}</h4>
                      <p className="mt-1 text-sm text-petrol/55">{setting.group}</p>
                    </div>
                    <span className="rounded-full bg-turquoise/20 px-3 py-1 text-xs font-semibold text-petrol">
                      {setting.isPublic ? "عام" : "داخلي"}
                    </span>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <TextField defaultValue={setting.key} label="المفتاح" name="key" required />
                    <TextField defaultValue={setting.group} label="المجموعة" name="group" required />
                    <TextField defaultValue={setting.label} label="العنوان الإداري" name="label" />
                  </div>
                  <TextAreaField defaultValue={setting.value} dir="rtl" label="القيمة" name="value" rows={4} />
                  <CheckboxField defaultChecked={setting.isPublic} label="إعداد عام" name="isPublic" />
                  <div className="flex flex-wrap gap-3">
                    <button className="min-h-11 rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]" type="submit">
                      حفظ
                    </button>
                    <button
                      className="min-h-11 rounded-md border border-orange/30 bg-white px-5 text-sm font-semibold text-orange transition hover:bg-orange/10"
                      formAction={deleteSettingAction}
                      type="submit"
                    >
                      حذف
                    </button>
                  </div>
                </form>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
