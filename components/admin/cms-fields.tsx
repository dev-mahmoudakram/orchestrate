import { Badge } from "@/components/ui/badge";

type FieldProps = {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  dir?: "rtl" | "ltr";
  type?: "text" | "number" | "email" | "url";
};

type TextAreaProps = FieldProps & {
  rows?: number;
};

type CheckboxProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
  description?: string;
};

export function AdminPageHeading({
  label,
  title,
  description,
  count,
}: {
  label: string;
  title: string;
  description: string;
  count?: number;
}) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Badge tone="orange">{label}</Badge>
        <h2 className="mt-4 text-3xl font-semibold text-petrol">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-petrol/65">{description}</p>
      </div>
      {typeof count === "number" ? <span className="text-sm font-medium text-petrol/55">{count} سجل</span> : null}
    </header>
  );
}

export function CmsNotice({ message, tone = "success" }: { message: string; tone?: "success" | "error" }) {
  return (
    <p
      className={`rounded-md border px-4 py-3 text-sm font-medium text-petrol ${
        tone === "error" ? "border-orange/25 bg-orange/10" : "border-turquoise/40 bg-turquoise/15"
      }`}
    >
      {message}
    </p>
  );
}

export function TextField({
  name,
  label,
  defaultValue,
  placeholder,
  required,
  dir,
  type = "text",
}: FieldProps) {
  return (
    <label className="flex flex-col justify-between">
      <span className="text-sm font-medium text-petrol">{label}</span>
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
        defaultValue={defaultValue ?? ""}
        dir={dir}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function TextAreaField({ name, label, defaultValue, placeholder, required, dir, rows = 5 }: TextAreaProps) {
  return (
    <label className="flex flex-col justify-between">
      <span className="text-sm font-medium text-petrol">{label}</span>
      <textarea
        className="mt-2 min-h-32 w-full rounded-md border border-petrol/15 bg-white px-3 py-3 text-petrol outline-none focus:border-orange"
        defaultValue={defaultValue ?? ""}
        dir={dir}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </label>
  );
}

export function CheckboxField({ name, label, defaultChecked, description }: CheckboxProps) {
  return (
    <label className="mt-auto flex min-h-11 items-start gap-3 rounded-md border border-petrol/10 bg-white px-3 py-3">
      <input className="mt-1 h-4 w-4 accent-orange" defaultChecked={defaultChecked} name={name} type="checkbox" />
      <span>
        <span className="block text-sm font-semibold text-petrol">{label}</span>
        {description ? <span className="mt-1 block text-xs leading-5 text-petrol/55">{description}</span> : null}
      </span>
    </label>
  );
}

export function CmsStatus({ isPublished }: { isPublished: boolean }) {
  return <Badge tone={isPublished ? "turquoise" : "orange"}>{isPublished ? "منشور" : "مسودة"}</Badge>;
}

export function FormActions({ deleteAction }: { deleteAction?: (formData: FormData) => void | Promise<void> }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]"
        type="submit"
      >
        حفظ
      </button>
      {deleteAction ? (
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-orange/30 bg-white px-5 text-sm font-semibold text-orange transition hover:bg-orange/10"
          formAction={deleteAction}
          type="submit"
        >
          حذف
        </button>
      ) : null}
    </div>
  );
}
