import {
  createTeamMemberAction,
  deleteTeamMemberAction,
  updateTeamMemberAction,
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

type AdminTeamPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "A team member with this slug already exists.",
  "invalid-slug": "Slug must use lowercase letters, numbers, and hyphens.",
  "missing-arabic-title": "Arabic team member name is required.",
  "missing-id": "The selected team member could not be found.",
};

function translation<T extends { locale: Locale }>(items: T[], locale: Locale) {
  return items.find((item) => item.locale === locale);
}

function TeamTranslationFields({
  prefix,
  name,
  position,
  bio,
  requiredName,
  dir,
}: {
  prefix: "ar" | "en";
  name?: string | null;
  position?: string | null;
  bio?: string | null;
  requiredName?: boolean;
  dir: "rtl" | "ltr";
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <TextField defaultValue={name} dir={dir} label="Name" name={`${prefix}Name`} required={requiredName} />
      <TextField defaultValue={position} dir={dir} label="Position" name={`${prefix}Position`} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={bio} dir={dir} label="Biography" name={`${prefix}Bio`} rows={5} />
      </div>
    </div>
  );
}

export default async function AdminTeamPage({ searchParams }: AdminTeamPageProps) {
  const { error, saved } = await searchParams;
  const teamMembers = await prisma.teamMember.findMany({
    where: { deletedAt: null },
    include: { translations: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={teamMembers.length}
        description="Manage leadership and team profiles with bilingual roles and biographies. Profile images will be connected in the media phase."
        label="CMS"
        title="Team"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "Team member could not be saved."} tone="error" /> : null}
      {saved ? <CmsNotice message={`Team member saved: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">Create team member</h3>
        <form action={createTeamMemberAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-5">
            <TextField label="Slug" name="slug" placeholder="first-last" required />
            <TextField label="Email" name="email" type="email" />
            <TextField label="LinkedIn URL" name="linkedInUrl" type="url" />
            <TextField defaultValue={0} label="Sort order" name="sortOrder" type="number" />
            <CheckboxField label="Published" name="isPublished" />
          </div>
          <LocaleTabs
            ar={<TeamTranslationFields dir="rtl" prefix="ar" requiredName />}
            en={<TeamTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">Existing team members</h3>
        {teamMembers.length === 0 ? (
          <EmptyState description="Create leadership and team records now; image upload will arrive with media management." title="No team members found" />
        ) : (
          <div className="space-y-4">
            {teamMembers.map((teamMember) => {
              const ar = translation(teamMember.translations, Locale.ar);
              const en = translation(teamMember.translations, Locale.en);

              return (
                <Card key={teamMember.id}>
                  <form action={updateTeamMemberAction} className="space-y-5">
                    <input name="id" type="hidden" value={teamMember.id} />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-petrol">{ar?.name || teamMember.slug}</h4>
                          <CmsStatus isPublished={teamMember.isPublished} />
                        </div>
                        <p className="mt-1 text-sm text-petrol/55">{ar?.position || teamMember.email || "No position"}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-5">
                      <TextField defaultValue={teamMember.slug} label="Slug" name="slug" required />
                      <TextField defaultValue={teamMember.email} label="Email" name="email" type="email" />
                      <TextField defaultValue={teamMember.linkedInUrl} label="LinkedIn URL" name="linkedInUrl" type="url" />
                      <TextField defaultValue={teamMember.sortOrder} label="Sort order" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={teamMember.isPublished} label="Published" name="isPublished" />
                    </div>
                    <LocaleTabs
                      ar={
                        <TeamTranslationFields
                          bio={ar?.bio}
                          dir="rtl"
                          name={ar?.name}
                          position={ar?.position}
                          prefix="ar"
                          requiredName
                        />
                      }
                      en={
                        <TeamTranslationFields
                          bio={en?.bio}
                          dir="ltr"
                          name={en?.name}
                          position={en?.position}
                          prefix="en"
                        />
                      }
                    />
                    <FormActions deleteAction={deleteTeamMemberAction} />
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
