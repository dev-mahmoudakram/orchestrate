import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, Stagger, StaggerItem } from "@/components/public/reveal";
import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import { localized } from "@/lib/public/content";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

const labels = {
  ar: {
    caseStudy: "دراسة حالة",
    challenge: "التحدي",
    approach: "المنهج المنظومي",
    results: "النتائج المحققة",
    overview: "نظرة عامة",
    back: "العودة إلى المشاريع",
    next: "ابدأ مشروعاً مشابهاً",
    featured: "مشروع مميز",
  },
  en: {
    caseStudy: "Case Study",
    challenge: "Challenge",
    approach: "Systemic Approach",
    results: "Results Achieved",
    overview: "Overview",
    back: "Back to Projects",
    next: "Start a Similar Project",
    featured: "Featured Project",
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
      featuredImage: true,
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
  const blocks = [
    { title: text.challenge, body: translation?.challenge },
    { title: text.approach, body: translation?.approach },
    { title: text.results, body: translation?.results },
  ];

  return (
    <main className="min-h-screen bg-soft text-petrol">
      <section className="relative overflow-hidden bg-petrol text-white">
        <div className="absolute inset-0 orchestration-grid opacity-25" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Reveal>
            <Link className="text-sm font-semibold text-turquoise transition hover:text-white" href={localizePath("/projects", locale)}>
              {text.back}
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <p className="rounded-full bg-turquoise/15 px-3 py-1 text-xs font-semibold text-turquoise">{sectorTranslation?.title ?? text.caseStudy}</p>
              {project.isFeatured ? <p className="rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange">{text.featured}</p> : null}
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{translation?.title ?? project.slug}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{translation?.summary}</p>
          </Reveal>
          {project.featuredImage ? (
            <Reveal className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-white/10" delay={0.12}>
              <img
                alt={project.featuredImage.altAr || project.featuredImage.altEn || translation?.title || project.slug}
                className="max-h-[28rem] w-full object-cover"
                src={project.featuredImage.url}
              />
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <Stagger className="grid gap-4 lg:grid-cols-3">
            {blocks.map((item, index) => (
              <StaggerItem key={item.title}>
              <article
                className="flex min-h-72 flex-col rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_24px_70px_rgba(15,61,68,0.12)]"
              >
                <p className="text-3xl font-semibold text-orange">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-8 text-xl font-semibold text-petrol">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-petrol/65">{item.body}</p>
                <span className="mt-auto block h-1 w-12 rounded-full bg-turquoise" />
              </article>
              </StaggerItem>
            ))}
          </Stagger>

          {translation?.body ? (
            <Reveal className="mt-6 overflow-hidden rounded-lg border border-petrol/10 bg-white shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
              <div className="grid lg:grid-cols-[0.35fr_0.65fr]">
                <div className="bg-petrol p-6 text-white sm:p-8">
                  <p className="text-sm font-semibold text-turquoise">{text.overview}</p>
                  <div className="mt-8 flex h-24 items-end gap-2" aria-hidden="true">
                    {["h-8", "h-16", "h-11", "h-20", "h-14"].map((height, index) => (
                      <span className={`${height} w-3 rounded-t-full ${index % 2 === 0 ? "bg-orange" : "bg-turquoise"}`} key={`${height}-${index}`} />
                    ))}
                  </div>
                </div>
                <p className="p-6 text-base leading-8 text-petrol/70 sm:p-8">{translation.body}</p>
              </div>
            </Reveal>
          ) : null}

          <Reveal className="mt-8 rounded-lg bg-petrol p-8 text-white sm:p-10">
            <h2 className="max-w-2xl text-2xl font-semibold leading-tight">
              {locale === "ar" ? "هل تعمل على مبادرة تحتاج إلى تنسيق منظومي؟" : "Working on an initiative that needs systemic coordination?"}
            </h2>
            <Link
              className="mt-6 inline-flex min-h-11 min-w-32 items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold transition hover:bg-[#d76719]"
              href={localizePath("/contact", locale)}
            >
              <span className="text-white">{text.next}</span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
