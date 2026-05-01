import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/app/admin/(protected)/cms-actions";
import { MediaField } from "@/components/admin/media-field";
import { ReactSelectField } from "@/components/admin/react-select-field";
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

type AdminProjectsPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "يوجد مشروع بنفس الرابط بالفعل.",
  "invalid-slug": "الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط.",
  "missing-arabic-title": "عنوان المشروع بالعربية مطلوب.",
  "missing-id": "تعذر العثور على المشروع المحدد.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function ProjectTranslationFields({
  prefix,
  title,
  summary,
  challenge,
  approach,
  results,
  body,
  seoTitle,
  seoDescription,
  requiredTitle,
  dir,
}: {
  prefix: "ar" | "en";
  title?: string | null;
  summary?: string | null;
  challenge?: string | null;
  approach?: string | null;
  results?: string | null;
  body?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  requiredTitle?: boolean;
  dir: "rtl" | "ltr";
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <TextField defaultValue={title} dir={dir} label="العنوان" name={`${prefix}Title`} required={requiredTitle} />
      <TextField defaultValue={seoTitle} dir={dir} label="عنوان SEO" name={`${prefix}SeoTitle`} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={summary} dir={dir} label="الملخص" name={`${prefix}Summary`} rows={3} />
      </div>
      <TextAreaField defaultValue={challenge} dir={dir} label="التحدي" name={`${prefix}Challenge`} rows={4} />
      <TextAreaField defaultValue={approach} dir={dir} label="المنهجية" name={`${prefix}Approach`} rows={4} />
      <TextAreaField defaultValue={results} dir={dir} label="النتائج" name={`${prefix}Results`} rows={4} />
      <TextAreaField defaultValue={seoDescription} dir={dir} label="وصف SEO" name={`${prefix}SeoDescription`} rows={4} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={body} dir={dir} label="المحتوى التفصيلي" name={`${prefix}Body`} rows={7} />
      </div>
    </div>
  );
}

export default async function AdminProjectsPage({ searchParams }: AdminProjectsPageProps) {
  const { error, saved } = await searchParams;
  const [projects, sectors, media] = await Promise.all([
    prisma.project.findMany({
      where: { deletedAt: null },
      include: {
        featuredImage: true,
        sector: { include: { translations: true } },
        translations: true,
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.sector.findMany({
      where: { deletedAt: null },
      include: { translations: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, url: true, filename: true, altAr: true, altEn: true },
    }),
  ]);
  const sectorOptions = sectors.map((sector) => {
    const ar = translation(sector.translations, Locale.ar);

    return {
      label: ar?.title || sector.slug,
      value: sector.id,
    };
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={projects.length}
        description="إدارة دراسات الحالة مع ربط القطاع، وحالة التمييز، ونصوص التحدي والمنهجية والنتائج باللغتين، وحقول SEO."
        label="إدارة المحتوى"
        title="المشاريع"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ المشروع."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ المشروع: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء مشروع</h3>
        <form action={createProjectAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-5">
            <TextField label="الرابط" name="slug" placeholder="national-platform" required />
            <ReactSelectField emptyLabel="بدون قطاع" label="القطاع" name="sectorId" options={sectorOptions} />
            <TextField defaultValue={0} label="ترتيب العرض" name="sortOrder" type="number" />
            <CheckboxField label="مميز" name="isFeatured" />
            <CheckboxField label="منشور" name="isPublished" />
          </div>
          <MediaField label="الصورة الرئيسية" media={media} name="featuredImageId" />
          <LocaleTabs
            ar={<ProjectTranslationFields dir="rtl" prefix="ar" requiredTitle />}
            en={<ProjectTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">المشاريع الحالية</h3>
        {projects.length === 0 ? (
          <EmptyState description="أنشئ مشروعاً بعد توفر القطاعات لاستخدامها في تصفية الموقع." title="لا توجد مشاريع" />
        ) : (
          <div className="space-y-4">
            {projects.map((project) => {
              const ar = translation(project.translations, Locale.ar);
              const en = translation(project.translations, Locale.en);
              const sectorAr = project.sector ? translation(project.sector.translations, Locale.ar) : null;

              return (
                <Card key={project.id}>
                  <form action={updateProjectAction} className="space-y-5">
                    <input name="id" type="hidden" value={project.id} />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{ar?.title || project.slug}</h4>
                          <CmsStatus isPublished={project.isPublished} />
                          {project.isFeatured ? <span className="text-xs font-semibold text-orange">مميز</span> : null}
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">
                          {sectorAr?.title || project.sector?.slug || "بدون قطاع"} - /projects/{project.slug}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-5">
                      <TextField defaultValue={project.slug} label="الرابط" name="slug" required />
                      <ReactSelectField
                        defaultValue={project.sectorId}
                        emptyLabel="بدون قطاع"
                        label="القطاع"
                        name="sectorId"
                        options={sectorOptions}
                      />
                      <TextField defaultValue={project.sortOrder} label="ترتيب العرض" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={project.isFeatured} label="مميز" name="isFeatured" />
                      <CheckboxField defaultChecked={project.isPublished} label="منشور" name="isPublished" />
                    </div>
                    <MediaField
                      label="الصورة الرئيسية"
                      media={media}
                      name="featuredImageId"
                      selectedId={project.featuredImageId}
                    />
                    <LocaleTabs
                      ar={
                        <ProjectTranslationFields
                          approach={ar?.approach}
                          body={ar?.body}
                          challenge={ar?.challenge}
                          dir="rtl"
                          prefix="ar"
                          requiredTitle
                          results={ar?.results}
                          seoDescription={ar?.seoDescription}
                          seoTitle={ar?.seoTitle}
                          summary={ar?.summary}
                          title={ar?.title}
                        />
                      }
                      en={
                        <ProjectTranslationFields
                          approach={en?.approach}
                          body={en?.body}
                          challenge={en?.challenge}
                          dir="ltr"
                          prefix="en"
                          results={en?.results}
                          seoDescription={en?.seoDescription}
                          seoTitle={en?.seoTitle}
                          summary={en?.summary}
                          title={en?.title}
                        />
                      }
                    />
                    <FormActions deleteAction={deleteProjectAction} />
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
