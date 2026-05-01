import Link from "next/link";

import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import { getPageContent, getPublishedServices, getPublishedTeam } from "@/lib/public/content";
import type { Locale } from "@/types/locale";

type StandardPageProps = {
  pageKey: "about" | "services" | "projects" | "contact";
  locale: Locale;
};

type PageSections = {
  hero?: {
    headline?: string;
    subheadline?: string;
  };
  story?: {
    title?: string;
    body?: string;
  };
  values?: {
    title?: string;
    items?: string[];
  };
  formIntro?: string;
};

const labels = {
  ar: {
    aboutStory: "القصة والمنهج",
    values: "مبادئ العمل",
    team: "الفريق",
    services: "الخدمات",
    serviceDetails: "تفاصيل الخدمة",
    contactInfo: "بيانات التواصل",
    contactForm: "نموذج التواصل",
    name: "الاسم",
    organization: "الجهة",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    submit: "إرسال الرسالة",
    unavailable: "سيتم تفعيل الإرسال في مرحلة التواصل والبريد.",
    cta: "ابدأ المحادثة",
    method: "منهج عملي",
    focus: "وضوح",
    alignment: "تنسيق",
    impact: "أثر",
    discuss: "ناقش الخدمة",
    servicesIntro: "كل خدمة مصممة لتقريب الرؤية من التنفيذ، وتوضيح الأدوار، وبناء أثر قابل للقياس.",
    noServices: "سيتم عرض الخدمات بعد نشرها من لوحة الإدارة.",
    contactPhase: "نموذج التواصل معروض الآن كواجهة فقط، وسيتم تفعيل الإرسال والحفظ والبريد الإلكتروني في Phase 8.",
    location: "الرياض، المملكة العربية السعودية",
    phone: "الهاتف",
    address: "الموقع",
    readiness: "جاهزية التواصل",
    readinessBody: "يمكن تجهيز بيانات التواصل والرسائل الآن بصرياً، مع إبقاء المعالجة الفعلية للمرحلة المخصصة للبريد والرسائل.",
  },
  en: {
    aboutStory: "Story and Method",
    values: "Working Principles",
    team: "Team",
    services: "Services",
    serviceDetails: "Service Details",
    contactInfo: "Contact Details",
    contactForm: "Contact Form",
    name: "Name",
    organization: "Organization",
    email: "Email",
    subject: "Subject",
    message: "Message",
    submit: "Send Message",
    unavailable: "Submission will be enabled in the contact and email phase.",
    cta: "Start the Conversation",
    method: "Working Method",
    focus: "Clarity",
    alignment: "Alignment",
    impact: "Impact",
    discuss: "Discuss Service",
    servicesIntro: "Every service brings vision closer to execution, clarifies roles, and builds measurable impact.",
    noServices: "Published services will appear here from the dashboard.",
    contactPhase: "The contact form is currently presented as UI only; sending, storage, and email will be enabled in Phase 8.",
    location: "Riyadh, Saudi Arabia",
    phone: "Phone",
    address: "Location",
    readiness: "Contact Readiness",
    readinessBody: "The contact experience can be prepared visually now while actual processing remains scoped to the email and messages phase.",
  },
};

function pageSections(value: unknown): PageSections {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as PageSections;
}

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-petrol text-white">
      <div className="absolute inset-0 orchestration-grid opacity-25" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-4xl">
          {eyebrow ? <p className="text-sm font-semibold text-turquoise">{eyebrow}</p> : null}
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
          {description ? <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{description}</p> : null}
        </div>
      </Container>
    </section>
  );
}

function AboutNarrative({
  intro,
  label,
  locale,
  storyBody,
  storyTitle,
}: {
  intro?: string | null;
  label: string;
  locale: Locale;
  storyBody?: string;
  storyTitle?: string;
}) {
  const text = labels[locale];
  const highlights = [text.focus, text.alignment, text.impact];
  const bars = ["h-[70%]", "h-[44%]", "h-[86%]", "h-[58%]", "h-[96%]", "h-[66%]", "h-[78%]"];
  const resolvedIntro =
    intro ??
    (locale === "ar"
      ? "نربط بين الرؤية والاحتياجات الوطنية ضمن إطار منظومي واضح."
      : "We connect vision, institutional needs, and delivery inside a clear operating system.");
  const resolvedStory =
    storyBody ??
    (locale === "ar"
      ? "نساعد المؤسسات والجهات على تحويل الأفكار والمبادرات إلى نماذج عمل واضحة تجمع بين التفكير الاستراتيجي والتنفيذ المنظم."
      : "We help institutions turn ideas and initiatives into clear operating models that connect strategy with disciplined execution.");
  const resolvedTitle = storyTitle ?? (locale === "ar" ? "قصة تناغم" : "The Orchestrate Story");

  return (
    <div className="overflow-hidden rounded-lg border border-petrol/10 bg-white shadow-[0_24px_80px_rgba(15,61,68,0.08)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-orange">{label}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-petrol sm:text-4xl">{resolvedTitle}</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-petrol/70">{resolvedStory}</p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div className="border-t border-petrol/10 pt-4" key={item}>
                <p className="text-2xl font-semibold text-orange">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold text-petrol">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative isolate flex min-h-80 flex-col justify-between bg-petrol p-6 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(107,191,181,0.22),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_55%)]" />
          <div>
            <p className="text-sm font-semibold text-turquoise">{text.method}</p>
            <p className="mt-5 text-base leading-8 text-white/75">{resolvedIntro}</p>
          </div>

          <div className="mt-10">
            <div className="mt-6 border-t border-white/15 pt-5 text-sm leading-7 text-white/65">
              {locale === "ar"
                ? "من الفكرة إلى نموذج عمل قابل للتنفيذ والمتابعة."
                : "From idea to an operating model that can be executed and measured."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesShowcase({
  locale,
  services,
  intro,
}: {
  locale: Locale;
  services: Awaited<ReturnType<typeof getPublishedServices>>;
  intro?: string | null;
}) {
  const text = labels[locale];

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold text-orange">{text.services}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-petrol sm:text-4xl">{text.serviceDetails}</h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-petrol/65">{intro ?? text.servicesIntro}</p>
      </div>

      {services.length === 0 ? (
        <div className="mt-8 rounded-lg border border-petrol/10 bg-white p-8 text-center shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
          <p className="text-base font-semibold text-petrol">{text.noServices}</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              className="group flex min-h-80 flex-col rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_24px_70px_rgba(15,61,68,0.12)]"
              key={service.id}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase text-orange">{service.icon ?? service.slug}</p>
                <p className="text-sm font-semibold text-petrol/35">{String(index + 1).padStart(2, "0")}</p>
              </div>
              {service.featuredImage ? (
                <div className="mt-6 overflow-hidden rounded-md border border-petrol/10 bg-soft">
                  <img
                    alt={service.featuredImage.altAr || service.featuredImage.altEn || service.translation?.title || service.slug}
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    src={service.featuredImage.url}
                  />
                </div>
              ) : null}
              <h2 className="mt-8 text-2xl font-semibold leading-tight text-petrol">{service.translation?.title}</h2>
              <p className="mt-4 text-sm leading-7 text-petrol/65">{service.translation?.summary}</p>
              {service.translation?.body ? (
                <p className="mt-5 border-t border-petrol/10 pt-5 text-sm leading-7 text-petrol/65">{service.translation.body}</p>
              ) : null}
              <Link
                className="mt-auto inline-flex min-h-11 min-w-32 items-center justify-center self-start rounded-md bg-petrol px-5 text-sm font-semibold transition hover:bg-[#123238]"
                href={localizePath("/contact", locale)}
              >
                <span className="text-white">{text.discuss}</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactPreview({ locale, intro }: { locale: Locale; intro?: string }) {
  const text = labels[locale];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="overflow-hidden rounded-lg bg-petrol text-white shadow-[0_24px_70px_rgba(15,61,68,0.16)]">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-turquoise">{text.contactInfo}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">{text.readiness}</h2>
          <p className="mt-5 text-sm leading-7 text-white/70">{intro ?? text.readinessBody}</p>
        </div>
        <div className="grid border-t border-white/10">
          {[
            { label: text.email, value: "hello@orchestrate.local", dir: "ltr" },
            { label: text.phone, value: "+966 00 000 0000", dir: "ltr" },
            { label: text.address, value: text.location },
          ].map((item) => (
            <div className="border-b border-white/10 px-6 py-5 last:border-b-0 sm:px-8" key={item.label}>
              <p className="text-xs font-semibold text-turquoise">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-white" dir={item.dir}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </aside>

      <form className="rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.07)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange">{text.contactForm}</p>
            <h2 className="mt-3 text-2xl font-semibold text-petrol">{text.cta}</h2>
          </div>
          <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">Phase 8</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[text.name, text.organization, text.email, text.subject].map((item) => (
            <label className="grid gap-2 text-sm font-semibold text-petrol" key={item}>
              {item}
              <input className="min-h-11 rounded-md border border-petrol/15 bg-soft px-3 outline-none focus:border-orange" disabled />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-petrol sm:col-span-2">
            {text.message}
            <textarea className="min-h-36 rounded-md border border-petrol/15 bg-soft px-3 py-3 outline-none focus:border-orange" disabled />
          </label>
        </div>
        <button className="mt-6 min-h-11 rounded-md bg-orange px-5 text-sm font-semibold text-white opacity-75" disabled type="button">
          {text.submit}
        </button>
        <p className="mt-4 rounded-md border border-petrol/10 bg-soft px-4 py-3 text-xs leading-6 text-petrol/60">{text.contactPhase}</p>
      </form>
    </div>
  );
}

export async function StandardPage({ pageKey, locale }: StandardPageProps) {
  const [page, services, team] = await Promise.all([
    getPageContent(pageKey, locale),
    pageKey === "services" ? getPublishedServices(locale) : Promise.resolve([]),
    pageKey === "about" ? getPublishedTeam(locale) : Promise.resolve([]),
  ]);
  const sections = pageSections(page?.translation.sections);
  const hero = sections.hero;
  const text = labels[locale];

  return (
    <main className="min-h-screen bg-soft text-petrol">
      <PageHero
        description={hero?.subheadline ?? page?.translation.summary}
        eyebrow={page?.translation.title ?? undefined}
        title={hero?.headline ?? page?.translation.title ?? pageKey}
      />

      <section className="py-14 sm:py-18">
        <Container>
          {pageKey === "about" ? (
            <AboutNarrative
              intro={page?.translation.body}
              label={text.aboutStory}
              locale={locale}
              storyBody={sections.story?.body}
              storyTitle={sections.story?.title}
            />
          ) : null}

          {pageKey === "services" ? <ServicesShowcase intro={page?.translation.body} locale={locale} services={services} /> : null}

          {pageKey === "contact" ? <ContactPreview intro={sections.formIntro} locale={locale} /> : null}

          {pageKey !== "about" && pageKey !== "services" && pageKey !== "contact" && page?.translation.body ? (
            <div className="max-w-4xl rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)]">
              <p className="text-base leading-8 text-petrol/70">{page.translation.body}</p>
            </div>
          ) : null}

          {sections.values?.items?.length ? (
            <div className="mt-12">
              <p className="text-sm font-semibold text-orange">{text.values}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {sections.values.items.map((item, index) => (
                  <article
                    className="min-h-40 rounded-lg border border-petrol/10 bg-white p-5 shadow-[0_18px_55px_rgba(15,61,68,0.06)] transition hover:-translate-y-1 hover:border-orange/30"
                    key={item}
                  >
                    <p className="text-2xl font-semibold text-orange">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-8 text-sm font-semibold leading-7 text-petrol">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {team.length > 0 ? (
            <div className="mt-12">
              <p className="text-sm font-semibold text-orange">{text.team}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {team.map((member) => (
                  <article
                    className="rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.06)] transition hover:-translate-y-1 hover:border-orange/30"
                    key={member.id}
                  >
                    {member.imageMedia ? (
                      <div className="mb-5 overflow-hidden rounded-md border border-petrol/10 bg-soft">
                        <img
                          alt={member.imageMedia.altAr || member.imageMedia.altEn || member.translation?.name || member.slug}
                          className="h-56 w-full object-cover"
                          src={member.imageMedia.url}
                        />
                      </div>
                    ) : null}
                    <h2 className="text-2xl font-semibold text-petrol">{member.translation?.name}</h2>
                    <p className="mt-2 text-sm font-semibold text-orange">{member.translation?.position}</p>
                    <p className="mt-4 text-sm leading-7 text-petrol/65">{member.translation?.bio}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {pageKey !== "contact" ? (
            <div className="mt-12 rounded-lg bg-petrol p-8 text-white sm:p-10">
              <h2 className="max-w-2xl text-2xl font-semibold leading-tight">
                {locale === "ar" ? "هل تحتاج إلى تنسيق منظومي؟" : "Need systemic coordination?"}
              </h2>
              <Link
                className="mt-6 inline-flex min-h-11 items-center rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]"
                href={localizePath("/contact", locale)}
              >
                {text.cta}
              </Link>
            </div>
          ) : null}
        </Container>
      </section>
    </main>
  );
}
