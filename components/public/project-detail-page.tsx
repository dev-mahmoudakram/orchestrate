import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import { localized } from "@/lib/public/content";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

const labels = {
  ar: {
    caseStudy: "دراسة حالة",
    challenge: "التحدي",
    approach: "النهج المنظومي",
    results: "النتائج المحققة",
    overview: "نظرة عامة",
    back: "العودة إلى المشاريع",
  },
  en: {
    caseStudy: "Case Study",
    challenge: "Challenge",
    approach: "Systemic Approach",
    results: "Results Achieved",
    overview: "Overview",
    back: "Back to Projects",
  },
};

export async function ProjectDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = await prisma.project.findFirst({
    where: {
      deletedAt: null,
      isPublished: true,
      slug,
    },
    include: {
      sector: { include: { translations: true } },
      translations: true,
    },
  });

  if (!project) {
    notFound();
  }

  const translation = localized(project.translations, locale);
  const sectorTranslation = project.sector ? localized(project.sector.translations, locale) : null;
  const text = labels[locale];

  return (
    <main className="min-h-screen bg-soft text-petrol">
      <section className="bg-petrol text-white">
        <Container className="py-16 sm:py-20">
          <Link className="text-sm font-semibold text-turquoise" href={localizePath("/projects", locale)}>
            {text.back}
          </Link>
          <p className="mt-8 text-sm font-semibold text-orange">{sectorTranslation?.title ?? text.caseStudy}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{translation?.title ?? project.slug}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">{translation?.summary}</p>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: text.challenge, body: translation?.challenge },
              { title: text.approach, body: translation?.approach },
              { title: text.results, body: translation?.results },
            ].map((item, index) => (
              <article className="min-h-64 rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)]" key={item.title}>
                <p className="text-3xl font-semibold text-orange">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-8 text-xl font-semibold text-petrol">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-petrol/65">{item.body}</p>
              </article>
            ))}
          </div>

          {translation?.body ? (
            <article className="mt-5 rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
              <p className="text-sm font-semibold text-orange">{text.overview}</p>
              <p className="mt-4 text-base leading-8 text-petrol/70">{translation.body}</p>
            </article>
          ) : null}
        </Container>
      </section>
    </main>
  );
}
