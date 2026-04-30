import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/app/admin/(protected)/cms-actions";
import {
  AdminPageHeading,
  CheckboxField,
  CmsNotice,
  CmsStatus,
  FormActions,
  SelectField,
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
  "duplicate-slug-or-key": "A project with this slug already exists.",
  "invalid-slug": "Slug must use lowercase letters, numbers, and hyphens.",
  "missing-arabic-title": "Arabic project title is required.",
  "missing-id": "The selected project could not be found.",
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
      <TextField defaultValue={title} dir={dir} label="Title" name={`${prefix}Title`} required={requiredTitle} />
      <TextField defaultValue={seoTitle} dir={dir} label="SEO title" name={`${prefix}SeoTitle`} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={summary} dir={dir} label="Summary" name={`${prefix}Summary`} rows={3} />
      </div>
      <TextAreaField defaultValue={challenge} dir={dir} label="Challenge" name={`${prefix}Challenge`} rows={4} />
      <TextAreaField defaultValue={approach} dir={dir} label="Approach" name={`${prefix}Approach`} rows={4} />
      <TextAreaField defaultValue={results} dir={dir} label="Results" name={`${prefix}Results`} rows={4} />
      <TextAreaField defaultValue={seoDescription} dir={dir} label="SEO description" name={`${prefix}SeoDescription`} rows={4} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={body} dir={dir} label="Long body" name={`${prefix}Body`} rows={7} />
      </div>
    </div>
  );
}

function SectorOptions({
  sectors,
}: {
  sectors: Array<{ id: string; slug: string; translations: Array<{ locale: Locale; title: string }> }>;
}) {
  return (
    <>
      <option value="">No sector</option>
      {sectors.map((sector) => {
        const ar = translation(sector.translations, Locale.ar);

        return (
          <option key={sector.id} value={sector.id}>
            {ar?.title || sector.slug}
          </option>
        );
      })}
    </>
  );
}

export default async function AdminProjectsPage({ searchParams }: AdminProjectsPageProps) {
  const { error, saved } = await searchParams;
  const [projects, sectors] = await Promise.all([
    prisma.project.findMany({
      where: { deletedAt: null },
      include: {
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
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={projects.length}
        description="Manage case studies with sector relation, featured state, bilingual challenge/approach/results copy, and SEO fields."
        label="CMS"
        title="Projects"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "Project could not be saved."} tone="error" /> : null}
      {saved ? <CmsNotice message={`Project saved: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">Create project</h3>
        <form action={createProjectAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-5">
            <TextField label="Slug" name="slug" placeholder="national-platform" required />
            <SelectField label="Sector" name="sectorId">
              <SectorOptions sectors={sectors} />
            </SelectField>
            <TextField defaultValue={0} label="Sort order" name="sortOrder" type="number" />
            <CheckboxField label="Featured" name="isFeatured" />
            <CheckboxField label="Published" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<ProjectTranslationFields dir="rtl" prefix="ar" requiredTitle />}
            en={<ProjectTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">Existing projects</h3>
        {projects.length === 0 ? (
          <EmptyState description="Create a project once sectors are available for public filtering." title="No projects found" />
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
                          {project.isFeatured ? <span className="text-xs font-semibold text-orange">Featured</span> : null}
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">
                          {sectorAr?.title || project.sector?.slug || "No sector"} · /projects/{project.slug}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-5">
                      <TextField defaultValue={project.slug} label="Slug" name="slug" required />
                      <SelectField defaultValue={project.sectorId} label="Sector" name="sectorId">
                        <SectorOptions sectors={sectors} />
                      </SelectField>
                      <TextField defaultValue={project.sortOrder} label="Sort order" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={project.isFeatured} label="Featured" name="isFeatured" />
                      <CheckboxField defaultChecked={project.isPublished} label="Published" name="isPublished" />
                    </div>
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
