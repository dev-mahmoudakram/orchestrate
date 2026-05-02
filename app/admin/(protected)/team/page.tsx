import {
  createTeamMemberAction,
  deleteTeamMemberAction,
  updateTeamMemberAction,
} from "@/app/admin/(protected)/cms-actions";
import { MediaField } from "@/components/admin/media-field";
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
import { prisma } from "@/lib/prisma";
import { Locale } from "@/lib/prisma/enums";

type AdminTeamPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-slug-or-key": "يوجد عضو فريق بنفس الرابط بالفعل.",
  "invalid-slug": "الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط.",
  "missing-arabic-title": "اسم عضو الفريق بالعربية مطلوب.",
  "missing-id": "تعذر العثور على عضو الفريق المحدد.",
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
      <TextField defaultValue={name} dir={dir} label="الاسم" name={`${prefix}Name`} required={requiredName} />
      <TextField defaultValue={position} dir={dir} label="المنصب" name={`${prefix}Position`} />
      <div className="lg:col-span-2">
        <TextAreaField defaultValue={bio} dir={dir} label="السيرة" name={`${prefix}Bio`} rows={5} />
      </div>
    </div>
  );
}

export default async function AdminTeamPage({ searchParams }: AdminTeamPageProps) {
  const { error, saved } = await searchParams;
  const [teamMembers, media] = await Promise.all([
    prisma.teamMember.findMany({
      where: { deletedAt: null },
      include: { imageMedia: true, translations: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, url: true, filename: true, altAr: true, altEn: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={teamMembers.length}
        description="إدارة ملفات القيادة والفريق مع المناصب والسير الذاتية باللغتين. سيتم ربط الصور الشخصية في مرحلة الوسائط."
        label="إدارة المحتوى"
        title="الفريق"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ عضو الفريق."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ عضو الفريق: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء عضو فريق</h3>
        <form action={createTeamMemberAction} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-5">
            <TextField label="الرابط" name="slug" placeholder="first-last" required />
            <TextField label="البريد الإلكتروني" name="email" type="email" />
            <TextField label="رابط لينكدإن" name="linkedInUrl" type="url" />
            <TextField defaultValue={0} label="ترتيب العرض" name="sortOrder" type="number" />
            <CheckboxField label="منشور" name="isPublished" />
          </div>
          <MediaField label="الصورة الشخصية" media={media} name="imageMediaId" />
          <LocaleTabs
            ar={<TeamTranslationFields dir="rtl" prefix="ar" requiredName />}
            en={<TeamTranslationFields dir="ltr" prefix="en" />}
          />
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">أعضاء الفريق الحاليون</h3>
        {teamMembers.length === 0 ? (
          <EmptyState description="أنشئ سجلات القيادة والفريق الآن؛ وسيتم إضافة رفع الصور مع إدارة الوسائط." title="لا يوجد أعضاء فريق" />
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
                        <p className="mt-1 text-sm text-petrol/55">{ar?.position || teamMember.email || "لا يوجد منصب"}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-5">
                      <TextField defaultValue={teamMember.slug} label="الرابط" name="slug" required />
                      <TextField defaultValue={teamMember.email} label="البريد الإلكتروني" name="email" type="email" />
                      <TextField defaultValue={teamMember.linkedInUrl} label="رابط لينكدإن" name="linkedInUrl" type="url" />
                      <TextField defaultValue={teamMember.sortOrder} label="ترتيب العرض" name="sortOrder" type="number" />
                      <CheckboxField defaultChecked={teamMember.isPublished} label="منشور" name="isPublished" />
                    </div>
                    <MediaField
                      label="الصورة الشخصية"
                      media={media}
                      name="imageMediaId"
                      selectedId={teamMember.imageMediaId}
                    />
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
