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
  "duplicate-slug-or-key": "A partner with this slug already exists.",
  "invalid-slug": "Slug must use lowercase letters, numbers, and hyphens.",
  "missing-arabic-title": "Arabic partner name is required.",
  "missing-id": "The selected partner could not be found.",
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
      <TextField defaultValue={name} dir={dir} label="Name" name={`${prefix}Name`} required={requiredName} />
      <TextAreaField defaultValue={description} dir={dir} label="Description" name={`${prefix}Description`} rows={4} />
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
        description="Manage partner records, public visibility, website links, and bilingual partner descriptions. Logo upload will be connected in the media phase."
        label="CMS"
        title="Partners"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "Partner could not be saved."} tone="error" /> : null}
      {saved ? <CmsNotice message={`Partner saved: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">Create partner</h3>
        <form action={createPartnerAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-4">
            <TextField label="Slug" name="slug" placeholder="strategic-partner" required />
            <TextField label="Website URL" name="websiteUrl" placeholder="https://example.com" type="url" />
            <TextField defaultValue={0} label="Sort order" name="sortOrder" type="number" />
            <CheckboxField label="Published" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<PartnerTranslationFields dir="rtl" prefix="ar" requiredName />}
            en={<PartnerTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">Existing partners</h3>
        {partners.length === 0 ? (
          <EmptyState description="Create partner records now; logo selection will arrive with uploads and media." title="No partners found" />
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
                        <p className="mt-1 text-sm text-petrol/55">{partner.websiteUrl || "No website URL"}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-4">
                      <TextField defaultValue={partner.slug} label="Slug" name="slug" required />
                      <TextField defaultValue={partner.websiteUrl} label="Website URL" name="websiteUrl" type="url" />
                      <TextField defaultValue={partner.sortOrder} label="Sort order" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={partner.isPublished} label="Published" name="isPublished" />
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
