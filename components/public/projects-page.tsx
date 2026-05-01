import Link from "next/link";

import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import { getPageContent, getPublishedProjects, getPublishedSectors } from "@/lib/public/content";
import type { Locale } from "@/types/locale";

type PageSections = {
  hero?: {
    headline?: string;
    subheadline?: string;
  };
};

const labels = {
  ar: {
    sectors: "القطاعات",
    all: "كل المشاريع",
    allProjects: "المشاريع المنشورة",
    view: "عرض دراسة الحالة",
    featured: "مميز",
    noProjects: "لا توجد مشاريع ضمن هذا القطاع حالياً.",
    reset: "عرض كل المشاريع",
    count: "مشروع",
  },
  en: {
    sectors: "Sectors",
    all: "All Projects",
    allProjects: "Published Projects",
    view: "View Case Study",
    featured: "Featured",
    noProjects: "No projects are published for this sector yet.",
    reset: "View All Projects",
    count: "projects",
  },
};

function pageSections(value: unknown): PageSections {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as PageSections;
}

function projectFilterPath(locale: Locale, sectorSlug?: string) {
  const basePath = localizePath("/projects", locale);

  return sectorSlug ? `${basePath}?sector=${encodeURIComponent(sectorSlug)}` : basePath;
}

export async function ProjectsPage({ locale, selectedSectorSlug }: { locale: Locale; selectedSectorSlug?: string }) {
  const selectedSector = selectedSectorSlug?.trim() || undefined;
  const [page, sectors, projects] = await Promise.all([
    getPageContent("projects", locale),
    getPublishedSectors(locale),
    getPublishedProjects(locale, selectedSector),
  ]);
  const sections = pageSections(page?.translation.sections);
  const text = labels[locale];

  return (
    <main className="min-h-screen bg-soft text-petrol">
      <section className="relative overflow-hidden bg-petrol text-white">
        <div className="absolute inset-0 orchestration-grid opacity-25" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <p className="text-sm font-semibold text-turquoise">{page?.translation.title}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            {sections.hero?.headline ?? page?.translation.title ?? text.allProjects}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            {sections.hero?.subheadline ?? page?.translation.summary}
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <div className="rounded-lg border border-petrol/10 bg-white p-5 shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm font-semibold text-orange">{text.sectors}</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedSector
                      ? "border-petrol/10 bg-soft text-petrol/70 hover:border-orange/35 hover:text-orange"
                      : "border-orange/30 bg-orange/10 text-orange"
                  }`}
                  href={projectFilterPath(locale)}
                >
                  {text.all}
                </Link>
                {sectors.map((sector) => {
                  const isActive = selectedSector === sector.slug;

                  return (
                    <Link
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-orange/30 bg-orange/10 text-orange"
                          : "border-petrol/10 bg-soft text-petrol/70 hover:border-orange/35 hover:text-orange"
                      }`}
                      href={projectFilterPath(locale, sector.slug)}
                      key={sector.id}
                    >
                      {sector.translation?.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold text-petrol">{text.allProjects}</h2>
            <span className="text-sm font-semibold text-petrol/45">
              {projects.length} {text.count}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="mt-6 rounded-lg border border-petrol/10 bg-white p-8 text-center shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
              <p className="text-base font-semibold text-petrol">{text.noProjects}</p>
              <Link className="mt-5 inline-flex min-h-11 min-w-32 items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold" href={projectFilterPath(locale)}>
                <span className="text-white">{text.reset}</span>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  className="flex min-h-80 flex-col rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_24px_70px_rgba(15,61,68,0.12)]"
                  key={project.id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {project.sectorTranslation?.title ? (
                      <p className="rounded-full bg-turquoise/20 px-3 py-1 text-xs font-semibold text-petrol">{project.sectorTranslation.title}</p>
                    ) : null}
                    {project.isFeatured ? <p className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">{text.featured}</p> : null}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight text-petrol">{project.translation?.title}</h3>
                  {project.featuredImage ? (
                    <div className="mt-5 overflow-hidden rounded-md border border-petrol/10 bg-soft">
                      <img
                        alt={project.featuredImage.altAr || project.featuredImage.altEn || project.translation?.title || project.slug}
                        className="h-52 w-full object-cover transition duration-300 hover:scale-[1.03]"
                        src={project.featuredImage.url}
                      />
                    </div>
                  ) : null}
                  <p className="mt-4 text-sm leading-7 text-petrol/65">{project.translation?.summary}</p>
                  {project.translation?.challenge ? (
                    <p className="mt-6 border-t border-petrol/10 pt-5 text-sm leading-7 text-petrol/65">{project.translation.challenge}</p>
                  ) : null}
                  <Link
                    className="mt-auto inline-flex min-h-11 min-w-32 items-center justify-center self-start rounded-md bg-petrol px-5 pt-0 text-sm font-semibold transition hover:bg-[#123238]"
                    href={`${localizePath("/projects", locale)}/${project.slug}`}
                  >
                    <span className="text-white">{text.view}</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
