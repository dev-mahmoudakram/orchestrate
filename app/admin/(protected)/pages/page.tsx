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
  "duplicate-slug-or-key": "A page with this key or slug already exists.",
  "invalid-key": "Page key must use lowercase letters, numbers, dots, underscores, or hyphens.",
  "invalid-slug": "Slug must use lowercase letters, numbers, and hyphens.",
  "missing-arabic-title": "Arabic title is required.",
  "missing-id": "The selected page could not be found.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function PageTranslationFields({
  prefix,
  title,
  summary,
  body,
  seoTitle,
  seoDescription,
  requiredTitle,
  dir,
}: {
  prefix: "ar" | "en";
  title?: string | null;
  summary?: string | null;
  body?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  requiredTitle?: boolean;
  dir: "rtl" | "ltr";
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <TextField defaultValue={title} dir={dir} label="Title" name={`${prefix}Title`} required={requiredTitle} />
      <TextField defaultValue={seoTitle} dir={dir} label="SEO title" name={`${prefix}SeoTitle`} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={summary} dir={dir} label="Summary" name={`${prefix}Summary`} rows={3} />
      </div>
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={body} dir={dir} label="Body" name={`${prefix}Body`} rows={7} />
      </div>
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={seoDescription} dir={dir} label="SEO description" name={`${prefix}SeoDescription`} rows={3} />
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
        description="Create and maintain reusable public pages with Arabic-first content, optional English copy, publish state, and SEO fields."
        label="CMS"
        title="Pages"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "Page could not be saved."} tone="error" /> : null}
      {saved ? <CmsNotice message={`Page saved: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">Create page</h3>
        <form action={createPageAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="Page key" name="key" placeholder="about" required />
            <TextField label="Slug" name="slug" placeholder="about" required />
            <TextField defaultValue={0} label="Sort order" name="sortOrder" type="number" />
            <CheckboxField label="Published" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<PageTranslationFields dir="rtl" prefix="ar" requiredTitle />}
            en={<PageTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">Existing pages</h3>
        {pages.length === 0 ? (
          <EmptyState description="Create the first CMS page to begin managing public page content." title="No pages found" />
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
                      <TextField defaultValue={page.key} label="Page key" name="key" required />
                      <TextField defaultValue={page.slug} label="Slug" name="slug" required />
                      <TextField defaultValue={page.sortOrder} label="Sort order" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={page.isPublished} label="Published" name="isPublished" />
                    </div>
                    <LocaleTabs
                      ar={
                        <PageTranslationFields
                          body={ar?.body}
                          dir="rtl"
                          prefix="ar"
                          requiredTitle
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
