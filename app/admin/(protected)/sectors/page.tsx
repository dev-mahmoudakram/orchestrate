import {
  createSectorAction,
  deleteSectorAction,
  updateSectorAction,
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

type AdminSectorsPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "يوجد قطاع بنفس الرابط بالفعل.",
  "invalid-slug": "الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط.",
  "missing-arabic-title": "عنوان القطاع بالعربية مطلوب.",
  "missing-id": "تعذر العثور على القطاع المحدد.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function SectorTranslationFields({
  prefix,
  title,
  summary,
  requiredTitle,
  dir,
}: {
  prefix: "ar" | "en";
  title?: string | null;
  summary?: string | null;
  requiredTitle?: boolean;
  dir: "rtl" | "ltr";
}) {
  return (
    <div className="grid gap-4">
      <TextField defaultValue={title} dir={dir} label="العنوان" name={`${prefix}Title`} required={requiredTitle} />
      <TextAreaField defaultValue={summary} dir={dir} label="الملخص" name={`${prefix}Summary`} rows={4} />
    </div>
  );
}

export default async function AdminSectorsPage({ searchParams }: AdminSectorsPageProps) {
  const { error, saved } = await searchParams;
  const sectors = await prisma.sector.findMany({
    where: { deletedAt: null },
    include: { translations: true, _count: { select: { projects: true } } },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={sectors.length}
        description="إدارة تصنيف القطاعات المستخدم في تصفية المشاريع وتجميع دراسات الحالة في الموقع."
        label="إدارة المحتوى"
        title="القطاعات"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ القطاع."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ القطاع: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء قطاع</h3>
        <form action={createSectorAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="الرابط" name="slug" placeholder="government" required />
            <TextField label="رمز الأيقونة" name="icon" placeholder="landmark" />
            <TextField defaultValue={0} label="ترتيب العرض" name="sortOrder" type="number" />
            <CheckboxField label="منشور" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<SectorTranslationFields dir="rtl" prefix="ar" requiredTitle />}
            en={<SectorTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">القطاعات الحالية</h3>
        {sectors.length === 0 ? (
          <EmptyState description="أنشئ القطاعات قبل ربط المشاريع بها واستخدامها في التصفية." title="لا توجد قطاعات" />
        ) : (
          <div className="space-y-4">
            {sectors.map((sector) => {
              const ar = translation(sector.translations, Locale.ar);
              const en = translation(sector.translations, Locale.en);

              return (
                <Card key={sector.id}>
                  <form action={updateSectorAction} className="space-y-5">
                    <input name="id" type="hidden" value={sector.id} />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{ar?.title || sector.slug}</h4>
                          <CmsStatus isPublished={sector.isPublished} />
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">{sector._count.projects} مشروع مرتبط</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-4">
                      <TextField defaultValue={sector.slug} label="الرابط" name="slug" required />
                      <TextField defaultValue={sector.icon} label="رمز الأيقونة" name="icon" />
                      <TextField defaultValue={sector.sortOrder} label="ترتيب العرض" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={sector.isPublished} label="منشور" name="isPublished" />
                    </div>
                    <LocaleTabs
                      ar={
                        <SectorTranslationFields
                          dir="rtl"
                          prefix="ar"
                          requiredTitle
                          summary={ar?.summary}
                          title={ar?.title}
                        />
                      }
                      en={<SectorTranslationFields dir="ltr" prefix="en" summary={en?.summary} title={en?.title} />}
                    />
                    <FormActions deleteAction={deleteSectorAction} />
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
