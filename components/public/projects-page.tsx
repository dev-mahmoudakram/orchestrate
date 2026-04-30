import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { localizePath } from "@/lib/i18n/routes";
import { getPageContent, getPublishedSectors } from "@/lib/public/content";
import { localized } from "@/lib/public/content";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

type PageSections = {
  hero?: {
    headline?: string;
    subheadline?: string;
  };
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
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
  ]);
  const sections = pageSections(page?.translation.sections);

  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description={sections.hero?.subheadline ?? page?.translation.summary ?? undefined}
          eyebrow={page?.translation.title}
          title={sections.hero?.headline ?? page?.translation.title ?? "Projects"}
        />

        {sectors.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <span className="rounded-full border border-petrol/10 bg-white px-4 py-2 text-sm font-semibold text-petrol/70" key={sector.id}>
                {sector.translation?.title}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const translation = localized(project.translations, locale);
            const sectorTranslation = project.sector ? localized(project.sector.translations, locale) : null;

            return (
              <Card key={project.id}>
                <p className="text-xs font-semibold text-orange">{sectorTranslation?.title}</p>
                <h2 className="mt-4 text-xl font-semibold text-petrol">{translation?.title}</h2>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{translation?.summary}</p>
                <Link
                  className="mt-5 inline-flex text-sm font-semibold text-orange"
                  href={`${localizePath("/projects", locale)}/${project.slug}`}
                >
                  {locale === "ar" ? "عرض دراسة الحالة" : "View Case Study"}
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
