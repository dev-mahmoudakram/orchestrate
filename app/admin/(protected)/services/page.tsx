import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction,
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

type AdminServicesPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "A service with this slug already exists.",
  "invalid-slug": "Slug must use lowercase letters, numbers, and hyphens.",
  "missing-arabic-title": "Arabic service title is required.",
  "missing-id": "The selected service could not be found.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function ServiceTranslationFields({
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

export default async function AdminServicesPage({ searchParams }: AdminServicesPageProps) {
  const { error, saved } = await searchParams;
  const services = await prisma.service.findMany({
    where: { deletedAt: null },
    include: { translations: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={services.length}
        description="Manage service cards and detail copy with bilingual descriptions, publish control, icon token, and SEO fields."
        label="CMS"
        title="Services"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "Service could not be saved."} tone="error" /> : null}
      {saved ? <CmsNotice message={`Service saved: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">Create service</h3>
        <form action={createServiceAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="Slug" name="slug" placeholder="strategy-design" required />
            <TextField label="Icon token" name="icon" placeholder="layers" />
            <TextField defaultValue={0} label="Sort order" name="sortOrder" type="number" />
            <CheckboxField label="Published" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<ServiceTranslationFields dir="rtl" prefix="ar" requiredTitle />}
            en={<ServiceTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">Existing services</h3>
        {services.length === 0 ? (
          <EmptyState description="Create the first service to start building the public services page." title="No services found" />
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const ar = translation(service.translations, Locale.ar);
              const en = translation(service.translations, Locale.en);

              return (
                <Card key={service.id}>
                  <form action={updateServiceAction} className="space-y-5">
                    <input name="id" type="hidden" value={service.id} />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{ar?.title || service.slug}</h4>
                          <CmsStatus isPublished={service.isPublished} />
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">/services/{service.slug}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-4">
                      <TextField defaultValue={service.slug} label="Slug" name="slug" required />
                      <TextField defaultValue={service.icon} label="Icon token" name="icon" />
                      <TextField defaultValue={service.sortOrder} label="Sort order" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={service.isPublished} label="Published" name="isPublished" />
                    </div>
                    <LocaleTabs
                      ar={
                        <ServiceTranslationFields
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
                        <ServiceTranslationFields
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
                    <FormActions deleteAction={deleteServiceAction} />
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
