import Image from "next/image";
import Link from "next/link";

import { ContentIcon } from "@/components/public/content-icon";
import { Reveal, Stagger, StaggerItem } from "@/components/public/reveal";
import { Container } from "@/components/ui/container";
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

const copy = {
  ar: {
    eyebrow: "تناغم الابتكار",
    proofOne: "منهجية منظومية",
    proofTwo: "قطاعات حيوية",
    proofThree: "حلول قابلة للتنفيذ",
    sectorsTitle: "قطاعات نعمل معها",
    sectorsBody: "نصمم التدخلات من داخل الواقع المؤسسي والاجتماعي لكل قطاع.",
    servicesTitle: "خدمات تحول التعقيد إلى مسار عمل",
    servicesBody: "كل خدمة مصممة لتقريب الرؤية من التنفيذ، وتوضيح الأدوار، وبناء أثر قابل للقياس.",
    methodologyEyebrow: "المنهجية",
    projectsTitle: "نماذج من العمل المنظومي",
    projectsBody: "مشاريع مختارة تعرض كيف نربط التحدي بالمنهجية والنتائج.",
    partnersTitle: "شركاء وثقة مؤسسية",
    partnersBody: "نعمل مع جهات تسعى إلى تحويل المبادرات إلى نماذج واضحة، قابلة للتنفيذ والقياس.",
    partnersKicker: "شبكة ثقة",
    noItems: "سيتم عرض المحتوى بعد نشره من لوحة التحكم.",
    viewCase: "عرض دراسة الحالة",
    finalCtaTitle: "هل تعمل على مبادرة تحتاج إلى تنسيق منظومي؟",
    finalCtaBody: "دعنا نساعدك في تحويل الرؤية إلى إطار عمل واضح، قابل للتنفيذ، ومصمم للأثر.",
    finalCtaLabel: "ابدأ المحادثة",
  },
  en: {
    eyebrow: "Orchestrate Innovation",
    proofOne: "Systemic method",
    proofTwo: "Vital sectors",
    proofThree: "Actionable solutions",
    sectorsTitle: "Sectors We Serve",
    sectorsBody: "We design interventions from inside each institutional and social context.",
    servicesTitle: "Services that turn complexity into a work path",
    servicesBody: "Every service brings vision closer to execution, clarifies roles, and builds measurable impact.",
    methodologyEyebrow: "Methodology",
    projectsTitle: "Examples of systemic work",
    projectsBody: "Selected projects showing how challenge, method, and results connect.",
    partnersTitle: "Institutional trust and partners",
    partnersBody: "We work with entities seeking to turn initiatives into clear, actionable, and measurable models.",
    partnersKicker: "Trust network",
    noItems: "Published content will appear here from the dashboard.",
    viewCase: "View Case Study",
    finalCtaTitle: "Working on an initiative that needs systemic coordination?",
    finalCtaBody: "Let us help you turn your vision into a clear, actionable, and impact-driven framework.",
    finalCtaLabel: "Start the Conversation",
  },
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
  const text = copy[locale];

  return (
    <main className="bg-soft text-petrol">
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-petrol text-white">
        <div className="absolute inset-0 orchestration-grid opacity-45" aria-hidden="true" />
        <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-8 sm:py-24 lg:py-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-turquoise">
                {text.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
                {hero?.headline ?? page?.translation.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                {hero?.subheadline ?? page?.translation.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-12 items-center rounded-md bg-orange px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d76719]"
                  href={hero?.primaryCtaHref ?? localizePath("/contact", locale)}
                >
                  {hero?.primaryCtaLabel ?? (locale === "ar" ? "تواصل معنا" : "Contact Us")}
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center rounded-md border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/45"
                  href={hero?.secondaryCtaHref ?? localizePath("/services", locale)}
                >
                  {hero?.secondaryCtaLabel ?? (locale === "ar" ? "الخدمات" : "Services")}
                </Link>
              </div>
              <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                {[text.proofOne, text.proofTwo, text.proofThree].map((item) => (
                  <div className="border-s border-turquoise/50 ps-4" key={item}>
                    <p className="text-sm font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="rounded-lg border border-white/10 bg-white/6 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.24)]" delay={0.12}>
              <div className="rounded-md bg-white px-5 py-6">
                <Image
                  alt={text.eyebrow}
                  className="mx-auto h-auto w-full max-w-sm"
                  height={190}
                  priority
                  quality={58}
                  sizes="(min-width: 640px) 380px, 90vw"
                  src="/assets/logo.png"
                  width={380}
                />
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-14 rounded-lg border border-white/10 bg-white px-6 py-8 text-petrol shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10" delay={0.18}>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <p className="text-3xl font-semibold leading-tight text-petrol sm:text-4xl">{sections.philosophy?.title}</p>
            <p className="text-base leading-8 text-petrol/70 sm:text-l">{sections.philosophy?.body}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#a84b13]">{locale === "ar" ? "القطاعات" : "Sectors"}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-petrol sm:text-4xl">{text.sectorsTitle}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-petrol/75">{text.sectorsBody}</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {sectors.length > 0 ? (
              sectors.map((sector, index) => (
                <StaggerItem key={sector.id}>
                <article
                  className="group flex min-h-64 flex-col rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.07)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_24px_70px_rgba(15,61,68,0.12)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-orange text-white transition group-hover:bg-petrol">
                        <ContentIcon icon={sector.icon ?? sector.slug} />
                      </span>
                      <span className="text-sm font-semibold text-petrol/55">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-8 text-xl font-semibold text-petrol">{sector.translation?.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-petrol/75">{sector.translation?.summary}</p>
                  </div>
                  <span className="mt-auto block h-1 w-12 rounded-full bg-turquoise transition-all duration-300 ease-out group-hover:w-20 group-hover:bg-orange" />
                </article>
                </StaggerItem>
              ))
            ) : (
              <p className="text-sm text-petrol/60">{text.noItems}</p>
            )}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white py-18 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Reveal>
              <p className="text-sm font-semibold text-[#a84b13]">{locale === "ar" ? "الخدمات" : "Services"}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-petrol sm:text-4xl">{text.servicesTitle}</h2>
              <p className="mt-5 text-sm leading-7 text-petrol/75">{text.servicesBody}</p>
              </Reveal>
            </div>
            <Stagger className="grid gap-4 xl:grid-cols-1">
              {services.slice(0, 4).map((service) => (
                <StaggerItem key={service.id}>
                <article
                  className="group grid gap-4 rounded-lg border border-petrol/10 bg-soft p-5 transition hover:border-orange/35 hover:bg-white sm:grid-cols-[auto_1fr]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-orange text-white transition group-hover:bg-petrol">
                    <ContentIcon icon={service.icon ?? service.slug} />
                  </span>
                  <div>
                    {service.featuredImage ? (
                      <div className="mb-4 overflow-hidden rounded-md border border-petrol/10 bg-white">
                        <img
                          alt={service.featuredImage.altAr || service.featuredImage.altEn || service.translation?.title || service.slug}
                          className="h-36 w-full object-cover"
                          src={service.featuredImage.url}
                        />
                      </div>
                    ) : null}
                    <h3 className="text-xl font-semibold text-petrol">{service.translation?.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-petrol/75">{service.translation?.summary}</p>
                  </div>
                </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold text-[#a84b13]">{text.methodologyEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-petrol sm:text-4xl">{sections.methodology?.title}</h2>
            <p className="mt-5 text-sm leading-7 text-petrol/75">{sections.methodology?.body}</p>
          </Reveal>
          <Stagger className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(sections.methodology?.steps ?? []).map((step, index) => (
              <StaggerItem key={`${step.title}-${index}`}>
              <article className="flex h-full min-h-60 flex-col rounded-lg border border-petrol/10 bg-white p-5 shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
                <p className="text-3xl font-semibold text-[#a84b13]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-12 text-lg font-semibold text-petrol">{step.title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-7 text-petrol/75">{step.description}</p>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-petrol py-18 text-white sm:py-20">
        <Container>
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-turquoise">{locale === "ar" ? "دراسات حالة" : "Case Studies"}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{text.projectsTitle}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/65">{text.projectsBody}</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
              <article className="flex min-h-64 flex-col rounded-lg border border-white/10 bg-white/6 p-6 transition hover:-translate-y-1 hover:border-orange/40">
                <p className="text-xs font-semibold text-turquoise">{project.sectorTranslation?.title}</p>
                {project.featuredImage ? (
                  <div className="mt-4 overflow-hidden rounded-md border border-white/10 bg-white/10">
                    <img
                      alt={project.featuredImage.altAr || project.featuredImage.altEn || project.translation?.title || project.slug}
                      className="h-40 w-full object-cover"
                      src={project.featuredImage.url}
                    />
                  </div>
                ) : null}
                <h3 className="mt-4 text-2xl font-semibold">{project.translation?.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{project.translation?.summary}</p>
                <Link className="mt-auto inline-flex pt-6 text-sm font-semibold text-orange" href={`${localizePath("/projects", locale)}/${project.slug}`}>
                  {text.viewCase}
                </Link>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {partners.length > 0 ? (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <Reveal className="overflow-hidden rounded-lg border border-petrol/10 bg-soft shadow-[0_24px_70px_rgba(15,61,68,0.08)]">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative bg-petrol p-8 text-white sm:p-10">
                  <div className="absolute inset-y-8 inset-e-0 hidden w-px bg-white/15 lg:block" aria-hidden="true" />
                  <p className="text-sm font-semibold text-turquoise">{text.partnersKicker}</p>
                  <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight">{text.partnersTitle}</h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-white/70">{text.partnersBody}</p>
                </div>

                <div className="grid content-center gap-3 p-5 sm:p-8">
                  {partners.map((partner, index) => (
                    <div
                      className="group flex min-h-16 items-center justify-between rounded-md border border-petrol/10 bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-orange/30 hover:shadow-[0_14px_35px_rgba(15,61,68,0.08)]"
                      key={partner.id}
                    >
                      <div>
                        {partner.logoMedia ? (
                          <img
                            alt={partner.logoMedia.altAr || partner.logoMedia.altEn || partner.translation?.name || partner.slug}
                            className="mb-3 max-h-10 max-w-36 object-contain"
                            src={partner.logoMedia.url}
                          />
                        ) : null}
                        <p className="text-sm font-semibold text-petrol">{partner.translation?.name}</p>
                        {partner.translation?.description ? (
                          <p className="mt-1 text-xs leading-5 text-petrol/55">{partner.translation.description}</p>
                        ) : null}
                      </div>
                      <span className="text-sm font-semibold text-[#a84b13] transition group-hover:text-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="bg-soft py-18 sm:py-20">
        <Container>
          <Reveal className="rounded-lg bg-petrol p-8 text-white sm:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{finalCta?.title || text.finalCtaTitle}</h2>
              <p className="mt-5 text-base leading-8 text-white/70">{finalCta?.body || text.finalCtaBody}</p>
              <Link
                className="mt-8 inline-flex min-h-12 items-center rounded-md bg-orange px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d76719]"
                href={finalCta?.ctaHref ?? localizePath("/contact", locale)}
              >
                {finalCta?.ctaLabel || text.finalCtaLabel}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
