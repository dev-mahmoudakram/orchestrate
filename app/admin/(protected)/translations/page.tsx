import { createTranslationKeyAction, updateTranslationKeyAction } from "@/app/admin/(protected)/translations/actions";
import { ReactSelectField } from "@/components/admin/react-select-field";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/auth/auth";
import { getTranslationGroups } from "@/lib/i18n/translations";
import { prisma } from "@/lib/prisma";

type AdminTranslationsPageProps = {
  searchParams: Promise<{
    q?: string;
    group?: string;
    error?: string;
    created?: string;
    updated?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "duplicate-key": "يوجد مفتاح ترجمة بهذا الاسم بالفعل.",
  "missing-required-fields": "المفتاح والمجموعة والقيمة العربية مطلوبة.",
};

export default async function AdminTranslationsPage({ searchParams }: AdminTranslationsPageProps) {
  await requireAdmin();

  const { q, group, error, created, updated } = await searchParams;
  const search = q?.trim() ?? "";
  const selectedGroup = group?.trim() ?? "";
  const groups = await getTranslationGroups();
  const groupOptions = groups.map((item) => ({ label: item, value: item }));

  const translationKeys = await prisma.translationKey.findMany({
    where: {
      ...(selectedGroup ? { group: selectedGroup } : {}),
      ...(search
        ? {
            OR: [
              { key: { contains: search } },
              { group: { contains: search } },
              { ar: { contains: search } },
              { en: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge tone="orange">لوحة الترجمة</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-petrol">مفاتيح ترجمة الواجهة</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-petrol/65">
            إدارة العبارات المتكررة في الواجهة باللغتين العربية والإنجليزية. القيمة العربية مطلوبة، ويمكن للإنجليزية الرجوع للعربية حتى تتم ترجمتها.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" method="GET">
          <input
            className="min-h-11 rounded-md border border-petrol/15 bg-white px-3 text-sm text-petrol outline-none focus:border-orange"
            defaultValue={search}
            name="q"
            placeholder="ابحث في المفاتيح أو النصوص"
            type="search"
          />
          <div className="min-w-56">
            <ReactSelectField
              defaultValue={selectedGroup}
              emptyLabel="كل المجموعات"
              name="group"
              options={groupOptions}
              placeholder="اختر المجموعة"
            />
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-petrol px-5 text-sm font-semibold text-white transition hover:bg-[#123238]"
            type="submit"
          >
            تصفية
          </button>
        </form>
      </header>

      {error ? (
        <p className="rounded-md border border-orange/25 bg-orange/10 px-4 py-3 text-sm font-medium text-petrol">
          {errorMessages[error] ?? "تعذر حفظ مفتاح الترجمة."}
        </p>
      ) : null}
      {created ? (
        <p className="rounded-md border border-turquoise/40 bg-turquoise/15 px-4 py-3 text-sm font-medium text-petrol">
          تم إنشاء مفتاح الترجمة: {created}
        </p>
      ) : null}
      {updated ? (
        <p className="rounded-md border border-turquoise/40 bg-turquoise/15 px-4 py-3 text-sm font-medium text-petrol">
          تم تحديث مفتاح الترجمة.
        </p>
      ) : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">إنشاء مفتاح ترجمة</h3>
        <form action={createTranslationKeyAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="flex flex-col justify-between">
            <span className="text-sm font-medium text-petrol">المفتاح</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              name="key"
              placeholder="nav.home"
              required
            />
          </label>
          <label className="flex flex-col justify-between">
            <span className="text-sm font-medium text-petrol">المجموعة</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              name="group"
              placeholder="nav"
              required
            />
          </label>
          <label className="flex flex-col justify-between">
            <span className="text-sm font-medium text-petrol">العربية</span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-md border border-petrol/15 bg-white px-3 py-3 text-petrol outline-none focus:border-orange"
              dir="rtl"
              name="ar"
              required
            />
          </label>
          <label className="flex flex-col justify-between">
            <span className="text-sm font-medium text-petrol">الإنجليزية</span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-md border border-petrol/15 bg-white px-3 py-3 text-petrol outline-none focus:border-orange"
              dir="ltr"
              name="en"
            />
          </label>
          <label className="flex flex-col justify-between lg:col-span-2">
            <span className="text-sm font-medium text-petrol">الوصف</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              name="description"
              placeholder="مكان استخدام هذا النص"
            />
          </label>
          <div className="lg:col-span-2">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]"
              type="submit"
            >
              إنشاء المفتاح
            </button>
          </div>
        </form>
      </Card>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-petrol">المفاتيح الحالية</h3>
          <span className="text-sm text-petrol/65">{translationKeys.length} سجل</span>
        </div>

        {translationKeys.length === 0 ? (
          <EmptyState
            description="جرّب تغيير البحث أو تصفية المجموعة، أو أنشئ مفتاحاً جديداً."
            title="لا توجد مفاتيح ترجمة"
          />
        ) : (
          <div className="space-y-4">
            {translationKeys.map((translationKey) => {
              const englishMissing = !translationKey.en?.trim();

              return (
                <Card className="p-0" key={translationKey.id}>
                  <form action={updateTranslationKeyAction} className="grid gap-4 p-5 xl:grid-cols-[1fr_1fr_1fr_auto]">
                    <input name="id" type="hidden" value={translationKey.id} />
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-petrol/50">المفتاح</p>
                        <p className="mt-1 font-mono text-sm text-petrol">{translationKey.key}</p>
                      </div>
                      <label className="flex flex-col justify-between">
                        <span className="text-xs font-semibold text-petrol/50">المجموعة</span>
                        <input
                          className="mt-2 min-h-10 w-full rounded-md border border-petrol/15 bg-white px-3 text-sm text-petrol outline-none focus:border-orange"
                          defaultValue={translationKey.group}
                          name="group"
                          required
                        />
                      </label>
                      <label className="flex flex-col justify-between">
                        <span className="text-xs font-semibold text-petrol/50">الوصف</span>
                        <input
                          className="mt-2 min-h-10 w-full rounded-md border border-petrol/15 bg-white px-3 text-sm text-petrol outline-none focus:border-orange"
                          defaultValue={translationKey.description ?? ""}
                          name="description"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col justify-between">
                      <span className="text-xs font-semibold text-petrol/50">العربية</span>
                      <textarea
                        className="mt-2 min-h-40 w-full rounded-md border border-petrol/15 bg-white px-3 py-3 text-sm leading-7 text-petrol outline-none focus:border-orange"
                        defaultValue={translationKey.ar}
                        dir="rtl"
                        name="ar"
                        required
                      />
                    </label>

                    <label className="flex flex-col justify-between">
                      <span className="flex items-center gap-2 text-xs font-semibold text-petrol/50">
                        الإنجليزية
                        {englishMissing ? <Badge tone="orange">غير مكتملة</Badge> : null}
                      </span>
                      <textarea
                        className="mt-2 min-h-40 w-full rounded-md border border-petrol/15 bg-white px-3 py-3 text-sm leading-7 text-petrol outline-none focus:border-orange"
                        defaultValue={translationKey.en ?? ""}
                        dir="ltr"
                        name="en"
                      />
                    </label>

                    <div className="flex items-end xl:justify-end">
                      <button
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-petrol/15 bg-white px-5 text-sm font-semibold text-petrol transition hover:border-orange hover:text-orange"
                        type="submit"
                      >
                        حفظ
                      </button>
                    </div>
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
