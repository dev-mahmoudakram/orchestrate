import Link from "next/link";

import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import { getPageContent, getPublishedSectors, localized } from "@/lib/public/content";
import { prisma } from "@/lib/prisma";
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
    allProjects: "المشاريع المنشورة",
    view: "عرض دراسة الحالة",
    featured: "مميز",
  },
  en: {
    sectors: "Sectors",
    allProjects: "Published Projects",
    view: "View Case Study",
    featured: "Featured",
  },
};

function pageSections(value: unknown): PageSections {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as PageSections;
}

export async function ProjectsPage({ locale }: { locale: Locale }) {
  const [page, sectors, projects] = await Promise.all([
    getPageContent("projects", locale),
    getPublishedSectors(locale),
    prisma.project.findMany({
      where: { deletedAt: null, isPublished: true },
      include: {
        sector: { include: { translations: true } },
        translations: true,
      },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
  ]);
  const sections = pageSections(page?.translation.sections);
  const text = labels[locale];

  return (
    <main className="min-h-screen bg-soft text-petrol">
      <section className="bg-petrol text-white">
        <Container className="py-16 sm:py-20">
          <p className="text-sm font-semibold text-turquoise">{page?.translation.title}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            {sections.hero?.headline ?? page?.translation.title ?? "Projects"}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            {sections.hero?.subheadline ?? page?.translation.summary}
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          {sectors.length > 0 ? (
            <div>
              <p className="text-sm font-semibold text-orange">{text.sectors}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <span className="rounded-full border border-petrol/10 bg-white px-4 py-2 text-sm font-semibold text-petrol/70" key={sector.id}>
                    {sector.translation?.title}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold text-petrol">{text.allProjects}</h2>
            <span className="text-sm font-semibold text-petrol/45">{projects.length}</span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {projects.map((project) => {
              const translation = localized(project.translations, locale);
              const sectorTranslation = project.sector ? localized(project.sector.translations, locale) : null;

              return (
                <article
                  className="rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)] transition hover:-translate-y-1 hover:border-orange/35"
                  key={project.id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="rounded-full bg-turquoise/20 px-3 py-1 text-xs font-semibold text-petrol">{sectorTranslation?.title}</p>
                    {project.isFeatured ? <p className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">{text.featured}</p> : null}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight text-petrol">{translation?.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-petrol/65">{translation?.summary}</p>
                  <div className="mt-6 grid gap-3 border-t border-petrol/10 pt-5 text-sm leading-7 text-petrol/65">
                    {translation?.challenge ? <p>{translation.challenge}</p> : null}
                  </div>
                  <Link
                    className="mt-6 inline-flex min-h-11 items-center rounded-md bg-petrol px-5 text-sm font-semibold text-white transition hover:bg-[#123238]"
                    href={`${localizePath("/projects", locale)}/${project.slug}`}
                  >
                    {text.view}
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
