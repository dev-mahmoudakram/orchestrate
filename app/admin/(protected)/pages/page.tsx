import {
  createPageAction,
  deletePageAction,
  updatePageAction,
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

type AdminPagesPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "توجد صفحة بنفس المفتاح أو الرابط بالفعل.",
  "invalid-key": "مفتاح الصفحة يجب أن يحتوي على أحرف صغيرة أو أرقام أو نقاط أو شرطات فقط.",
  "invalid-slug": "الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط.",
  "invalid-sections-json": "حقول الأقسام يجب أن تكون JSON صحيح.",
  "missing-arabic-title": "العنوان العربي مطلوب.",
  "missing-id": "تعذر العثور على الصفحة المحددة.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function PageTranslationFields({
  prefix,
  title,
  summary,
  body,
  sections,
  seoTitle,
  seoDescription,
  requiredTitle,
  dir,
}: {
  prefix: "ar" | "en";
  title?: string | null;
  summary?: string | null;
  body?: string | null;
  sections?: unknown;
  seoTitle?: string | null;
  seoDescription?: string | null;
  requiredTitle?: boolean;
  dir: "rtl" | "ltr";
}) {
  const sectionsValue = sections ? JSON.stringify(sections, null, 2) : "";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <TextField defaultValue={title} dir={dir} label="العنوان" name={`${prefix}Title`} required={requiredTitle} />
      <TextField defaultValue={seoTitle} dir={dir} label="عنوان SEO" name={`${prefix}SeoTitle`} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={summary} dir={dir} label="الملخص" name={`${prefix}Summary`} rows={3} />
      </div>
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={body} dir={dir} label="المحتوى" name={`${prefix}Body`} rows={7} />
      </div>
      <div className="lg:col-span-2">
        <TextAreaField
          defaultValue={sectionsValue}
          dir="ltr"
          label="أقسام JSON"
          name={`${prefix}Sections`}
          placeholder='{"hero":{"headline":""}}'
          rows={8}
        />
      </div>
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={seoDescription} dir={dir} label="وصف SEO" name={`${prefix}SeoDescription`} rows={3} />
      </div>
    </div>
  );
}

export default async function AdminPagesPage({ searchParams }: AdminPagesPageProps) {
  const { error, saved } = await searchParams;
  const pages = await prisma.page.findMany({
    where: { deletedAt: null },
    include: { translations: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={pages.length}
        description="إنشاء وإدارة صفحات الموقع العامة بمحتوى عربي أساسي، ومحتوى إنجليزي اختياري، وحالة نشر، وحقول SEO."
        label="إدارة المحتوى"
        title="الصفحات"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ الصفحة."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ الصفحة: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء صفحة</h3>
        <form action={createPageAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="مفتاح الصفحة" name="key" placeholder="about" required />
            <TextField label="الرابط" name="slug" placeholder="about" required />
            <TextField defaultValue={0} label="ترتيب العرض" name="sortOrder" type="number" />
            <CheckboxField label="منشور" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<PageTranslationFields dir="rtl" prefix="ar" requiredTitle />}
            en={<PageTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">الصفحات الحالية</h3>
        {pages.length === 0 ? (
          <EmptyState description="أنشئ أول صفحة للبدء في إدارة محتوى صفحات الموقع." title="لا توجد صفحات" />
        ) : (
          <div className="space-y-4">
            {pages.map((page) => {
              const ar = translation(page.translations, Locale.ar);
              const en = translation(page.translations, Locale.en);

              return (
                <Card key={page.id}>
                  <form action={updatePageAction} className="space-y-5">
                    <input name="id" type="hidden" value={page.id} />
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{ar?.title || page.key}</h4>
                          <CmsStatus isPublished={page.isPublished} />
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">/{page.slug}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-4">
                      <TextField defaultValue={page.key} label="مفتاح الصفحة" name="key" required />
                      <TextField defaultValue={page.slug} label="الرابط" name="slug" required />
                      <TextField defaultValue={page.sortOrder} label="ترتيب العرض" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={page.isPublished} label="منشور" name="isPublished" />
                    </div>
                    <LocaleTabs
                      ar={
                        <PageTranslationFields
                          body={ar?.body}
                          dir="rtl"
                          prefix="ar"
                          requiredTitle
                          sections={ar?.sections}
                          seoDescription={ar?.seoDescription}
                          seoTitle={ar?.seoTitle}
                          summary={ar?.summary}
                          title={ar?.title}
                        />
                      }
                      en={
                        <PageTranslationFields
                          body={en?.body}
                          dir="ltr"
                          prefix="en"
                          sections={en?.sections}
                          seoDescription={en?.seoDescription}
                          seoTitle={en?.seoTitle}
                          summary={en?.summary}
                          title={en?.title}
                        />
                      }
                    />
                    <FormActions deleteAction={deletePageAction} />
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
