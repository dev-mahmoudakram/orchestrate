import { updateMediaAction, uploadMediaAction } from "@/app/admin/(protected)/media/actions";
import { AdminPageHeading, CmsNotice, FormActions, TextField } from "@/components/admin/cms-fields";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatFileSize, maxUploadSize } from "@/lib/media/storage";
import { prisma } from "@/lib/prisma";

type AdminMediaPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "file-too-large": `حجم الملف أكبر من ${formatFileSize(maxUploadSize)}.`,
  "missing-file": "اختر صورة قبل الحفظ.",
  "missing-id": "تعذر العثور على الوسيط المحدد.",
  "unsupported-file-type": "صيغة الملف غير مدعومة. الصيغ المسموحة: JPG و PNG و WEBP.",
};

export default async function AdminMediaPage({ searchParams }: AdminMediaPageProps) {
  const { error, saved } = await searchParams;
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={media.length}
        description="رفع وإدارة الصور المستخدمة في الخدمات والمشاريع والشركاء والفريق. يتم حفظ الملفات محلياً في المسار المحدد عبر UPLOAD_DIR."
        label="إدارة المحتوى"
        title="الوسائط"
      />

      {error ? <CmsNotice message={errorMessages[error] ?? "تعذر حفظ الوسيط."} tone="error" /> : null}
      {saved ? <CmsNotice message={`تم حفظ الوسيط: ${saved}`} /> : null}

      <Card>
        <h3 className="text-xl font-semibold text-petrol">رفع صورة جديدة</h3>
        <form action={uploadMediaAction} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-petrol">الصورة</span>
            <input
              accept="image/jpeg,image/png,image/webp"
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 py-2 text-sm text-petrol file:me-4 file:rounded-md file:border-0 file:bg-petrol file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              name="file"
              required
              type="file"
            />
          </label>
          <div className="grid gap-4 lg:grid-cols-2">
            <TextField label="النص البديل بالعربية" name="altAr" />
            <TextField dir="ltr" label="Alt text in English" name="altEn" />
          </div>
          <p className="text-xs leading-6 text-petrol/55">
            الصيغ المسموحة: JPG و PNG و WEBP. الحد الأقصى: {formatFileSize(maxUploadSize)}.
          </p>
          <FormActions />
        </form>
      </Card>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-petrol">الوسائط الحالية</h3>
        {media.length === 0 ? (
          <EmptyState description="ارفع أول صورة لاستخدامها داخل حقول المحتوى." title="لا توجد وسائط" />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {media.map((item) => (
              <Card className="p-4" key={item.id}>
                <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
                  <a className="block overflow-hidden rounded-md border border-petrol/10 bg-soft" href={item.url} target="_blank">
                    <img
                      alt={item.altAr || item.altEn || item.filename}
                      className="h-36 w-full object-cover"
                      src={item.url}
                    />
                  </a>
                  <form action={updateMediaAction} className="min-w-0 space-y-4">
                    <input name="id" type="hidden" value={item.id} />
                    <div>
                      <p className="truncate text-sm font-semibold text-petrol">{item.originalName || item.filename}</p>
                      <p className="mt-1 truncate text-xs text-petrol/55">{item.filename}</p>
                      <p className="mt-2 text-xs text-petrol/55">
                        {item.mimeType} - {formatFileSize(item.size)}
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <TextField defaultValue={item.altAr} label="النص البديل بالعربية" name="altAr" />
                      <TextField defaultValue={item.altEn} dir="ltr" label="Alt text in English" name="altEn" />
                    </div>
                    <FormActions />
                  </form>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
