import { ReactSelectField } from "@/components/admin/react-select-field";

type MediaOption = {
  id: string;
  url: string;
  filename: string;
  altAr: string | null;
  altEn: string | null;
};

type MediaFieldProps = {
  label: string;
  name: string;
  media: MediaOption[];
  selectedId?: string | null;
};

export function MediaField({ label, name, media, selectedId }: MediaFieldProps) {
  const selected = media.find((item) => item.id === selectedId);
  const options = media.map((item) => ({
    label: item.altAr || item.altEn || item.filename,
    value: item.id,
  }));

  return (
    <div className="rounded-md border border-petrol/10 bg-soft p-4">
      <ReactSelectField
        defaultValue={selectedId}
        emptyLabel="بدون صورة"
        label={label}
        name={name}
        options={options}
        placeholder="اختر صورة"
      />

      {selected ? (
        <div className="mt-4 flex items-center gap-3 rounded-md border border-petrol/10 bg-white p-3">
          <img
            alt={selected.altAr || selected.altEn || selected.filename}
            className="h-16 w-20 rounded-md object-cover"
            src={selected.url}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-petrol">{selected.altAr || selected.filename}</p>
            <p className="mt-1 truncate text-xs text-petrol/55">{selected.filename}</p>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs leading-5 text-petrol/55">ارفع الصور من صفحة الوسائط ثم اخترها هنا.</p>
      )}
    </div>
  );
}
