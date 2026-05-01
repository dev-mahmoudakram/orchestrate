import {
  createPartnerAction,
  deletePartnerAction,
  updatePartnerAction,
} from "@/app/admin/(protected)/cms-actions";
import {
  AdminPageHeading,
  CheckboxField,
  CmsNotice,
  CmsStatus,
  FormActions,
  TextAreaField,
  TextField,
} from "@/components/admin/cms-fields";
import { LocaleTabs } from "@/components/admin/locale-tabs";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Locale } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type AdminPartnersPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "يوجد شريك بنفس الرابط بالفعل.",
  "invalid-slug": "الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط.",
  "missing-arabic-title": "اسم الشريك بالعربية مطلوب.",
  "missing-id": "تعذر العثور على الشريك المحدد.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function PartnerTranslationFields({
  prefix,
  name,
  description,
  requiredName,
  dir,
}: {
  prefix: "ar" | "en";
  name?: string | null;
  description?: string | null;
  requiredName?: boolean;
  dir: "rtl" | "ltr";
}) {
  return (
    <div className="grid gap-4">
      <TextField defaultValue={name} dir={dir} label="الاسم" name={`${prefix}Name`} required={requiredName} />
      <TextAreaField defaultValue={description} dir={dir} label="الوصف" name={`${prefix}Description`} rows={4} />
    </div>
  );
}

export default async function AdminPartnersPage({ searchParams }: AdminPartnersPageProps) {
  const { error, saved } = await searchParams;
  const partners = await prisma.partner.findMany({
    where: { deletedAt: null },
    include: { translations: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={partners.length}
        description="إدارة الشركاء، وحالة الظهور في الموقع، وروابط المواقع، ووصف الشريك باللغتين. سيتم ربط الشعارات في مرحلة الوسائط."
        label="إدارة المحتوى"
        title="الشركاء"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ الشريك."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ الشريك: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء شريك</h3>
        <form action={createPartnerAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="الرابط" name="slug" placeholder="strategic-partner" required />
            <TextField label="رابط الموقع" name="websiteUrl" placeholder="https://example.com" type="url" />
            <TextField defaultValue={0} label="ترتيب العرض" name="sortOrder" type="number" />
            <CheckboxField label="منشور" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<PartnerTranslationFields dir="rtl" prefix="ar" requiredName />}
            en={<PartnerTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">الشركاء الحاليون</h3>
        {partners.length === 0 ? (
          <EmptyState description="أنشئ سجلات الشركاء الآن؛ وسيتم إضافة اختيار الشعارات مع مرحلة الوسائط." title="لا يوجد شركاء" />
        ) : (
          <div className="space-y-4">
            {partners.map((partner) => {
              const ar = translation(partner.translations, Locale.ar);
              const en = translation(partner.translations, Locale.en);

              return (
                <Card key={partner.id}>
                  <form action={updatePartnerAction} className="space-y-5">
                    <input name="id" type="hidden" value={partner.id} />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{ar?.name || partner.slug}</h4>
                          <CmsStatus isPublished={partner.isPublished} />
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">{partner.websiteUrl || "لا يوجد رابط موقع"}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-4">
                      <TextField defaultValue={partner.slug} label="الرابط" name="slug" required />
                      <TextField defaultValue={partner.websiteUrl} label="رابط الموقع" name="websiteUrl" type="url" />
                      <TextField defaultValue={partner.sortOrder} label="ترتيب العرض" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={partner.isPublished} label="منشور" name="isPublished" />
                    </div>
                    <LocaleTabs
                      ar={
                        <PartnerTranslationFields
                          description={ar?.description}
                          dir="rtl"
                          name={ar?.name}
                          prefix="ar"
                          requiredName
                        />
                      }
                      en={
                        <PartnerTranslationFields
                          description={en?.description}
                          dir="ltr"
                          name={en?.name}
                          prefix="en"
                        />
                      }
                    />
                    <FormActions deleteAction={deletePartnerAction} />
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
