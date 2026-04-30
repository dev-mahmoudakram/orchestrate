type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
}: SectionHeaderProps) {
  return (
    <header className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.12em] text-orange uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-4xl font-semibold leading-tight text-petrol sm:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-5 text-base leading-8 text-petrol/75 sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
