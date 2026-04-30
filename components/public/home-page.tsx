import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { localizePath } from "@/lib/i18n/routes";
import {
  getFeaturedProjects,
  getPageContent,
  getPublishedPartners,
  getPublishedSectors,
  getPublishedServices,
} from "@/lib/public/content";
import type { Locale } from "@/types/locale";

type HomeSections = {
  hero?: {
    headline?: string;
    subheadline?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  philosophy?: {
    title?: string;
    body?: string;
  };
  methodology?: {
    title?: string;
    body?: string;
    steps?: Array<{
      title?: string;
      description?: string;
    }>;
  };
  finalCta?: {
    title?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
};

function homeSections(value: unknown): HomeSections {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as HomeSections;
}

export async function HomePage({ locale }: { locale: Locale }) {
  const [page, sectors, services, projects, partners] = await Promise.all([
    getPageContent("home", locale),
    getPublishedSectors(locale),
    getPublishedServices(locale),
    getFeaturedProjects(locale),
    getPublishedPartners(locale),
  ]);
  const sections = homeSections(page?.translation.sections);
  const hero = sections.hero;
  const finalCta = sections.finalCta;

  return (
    <main className="bg-soft">
      <section className="orchestration-grid overflow-hidden bg-petrol py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-turquoise">{locale === "ar" ? "تناغم الابتكار" : "Orchestrate Innovation"}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
                {hero?.headline ?? page?.translation.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                {hero?.subheadline ?? page?.translation.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-12 items-center rounded-md bg-orange px-6 text-sm font-semibold text-white transition hover:bg-[#d76719]"
                  href={hero?.primaryCtaHref ?? localizePath("/contact", locale)}
                >
                  {hero?.primaryCtaLabel ?? (locale === "ar" ? "تواصل معنا" : "Contact Us")}
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center rounded-md border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-white/40"
                  href={hero?.secondaryCtaHref ?? localizePath("/services", locale)}
                >
                  {hero?.secondaryCtaLabel ?? (locale === "ar" ? "الخدمات" : "Services")}
                </Link>
              </div>
            </div>
            <div className="grid h-80 grid-cols-7 items-end gap-3">
              {[42, 70, 54, 90, 62, 78, 48].map((height, index) => (
                <span
                  className="rounded-t-full bg-white/12 ring-1 ring-white/10"
                  key={height + index}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="rounded-lg border border-petrol/10 bg-soft p-8">
            <p className="text-2xl font-semibold text-petrol">{sections.philosophy?.title}</p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-petrol/70">{sections.philosophy?.body}</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            description={locale === "ar" ? "قطاعات حيوية نخدمها بمنهجية منظومية." : "Vital sectors served through a systemic methodology."}
            eyebrow={locale === "ar" ? "القطاعات" : "Sectors"}
            title={locale === "ar" ? "مجالات العمل" : "Sectors We Serve"}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <Card className="min-h-48 transition hover:-translate-y-1 hover:border-orange/30" key={sector.id}>
                <p className="text-xs font-semibold uppercase text-orange">{sector.icon ?? sector.slug}</p>
                <h2 className="mt-5 text-xl font-semibold text-petrol">{sector.translation?.title}</h2>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{sector.translation?.summary}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeader
            description={locale === "ar" ? "خدمات تساعد على الانتقال من التعقيد إلى مسار عمل واضح." : "Services that move complex work into clear execution paths."}
            eyebrow={locale === "ar" ? "الخدمات" : "Services"}
            title={locale === "ar" ? "ما نقدمه" : "What We Do"}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <Card className="transition hover:-translate-y-1 hover:border-orange/30" key={service.id}>
                <p className="text-xs font-semibold uppercase text-orange">{service.icon ?? service.slug}</p>
                <h2 className="mt-4 text-xl font-semibold text-petrol">{service.translation?.title}</h2>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{service.translation?.summary}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            description={sections.methodology?.body}
            eyebrow={locale === "ar" ? "المنهجية" : "Methodology"}
            title={sections.methodology?.title ?? ""}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {(sections.methodology?.steps ?? []).map((step, index) => (
              <Card className="min-h-44" key={`${step.title}-${index}`}>
                <p className="text-3xl font-semibold text-orange">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-5 text-lg font-semibold text-petrol">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeader
            eyebrow={locale === "ar" ? "دراسات حالة" : "Case Studies"}
            title={locale === "ar" ? "مشاريع مختارة" : "Featured Projects"}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id}>
                <p className="text-xs font-semibold text-orange">{project.sectorTranslation?.title}</p>
                <h2 className="mt-4 text-xl font-semibold text-petrol">{project.translation?.title}</h2>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{project.translation?.summary}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {partners.length > 0 ? (
        <section className="py-12">
          <Container>
            <div className="grid gap-3 rounded-lg border border-petrol/10 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <p className="text-sm font-semibold text-petrol/70" key={partner.id}>
                  {partner.translation?.name}
                </p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-petrol py-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{finalCta?.title}</h2>
            <p className="mt-5 text-base leading-8 text-white/70">{finalCta?.body}</p>
            <Link
              className="mt-8 inline-flex min-h-12 items-center rounded-md bg-orange px-6 text-sm font-semibold text-white transition hover:bg-[#d76719]"
              href={finalCta?.ctaHref ?? localizePath("/contact", locale)}
            >
              {finalCta?.ctaLabel ?? (locale === "ar" ? "ابدأ المحادثة" : "Start the Conversation")}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
