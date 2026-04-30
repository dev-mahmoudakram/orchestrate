import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
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

function pageSections(value: unknown): PageSections {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as PageSections;
}

export async function StandardPage({ pageKey, locale }: StandardPageProps) {
  const [page, services, team] = await Promise.all([
    getPageContent(pageKey, locale),
    pageKey === "services" ? getPublishedServices(locale) : Promise.resolve([]),
    pageKey === "about" ? getPublishedTeam(locale) : Promise.resolve([]),
  ]);
  const sections = pageSections(page?.translation.sections);
  const hero = sections.hero;

  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description={hero?.subheadline ?? page?.translation.summary ?? undefined}
          eyebrow={page?.translation.title ?? undefined}
          title={hero?.headline ?? page?.translation.title ?? pageKey}
        />

        {page?.translation.body ? (
          <Card className="mt-10">
            <p className="max-w-4xl text-base leading-8 text-petrol/70">{page.translation.body}</p>
          </Card>
        ) : null}

        {sections.story ? (
          <Card className="mt-6">
            <h2 className="text-2xl font-semibold text-petrol">{sections.story.title}</h2>
            <p className="mt-4 text-base leading-8 text-petrol/70">{sections.story.body}</p>
          </Card>
        ) : null}

        {sections.values?.items?.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sections.values.items.map((item) => (
              <Card className="min-h-32" key={item}>
                <p className="text-sm font-semibold text-petrol">{item}</p>
              </Card>
            ))}
          </div>
        ) : null}

        {services.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id}>
                <p className="text-xs font-semibold uppercase text-orange">{service.icon ?? service.slug}</p>
                <h2 className="mt-4 text-xl font-semibold text-petrol">{service.translation?.title}</h2>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{service.translation?.summary}</p>
              </Card>
            ))}
          </div>
        ) : null}

        {team.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {team.map((member) => (
              <Card key={member.id}>
                <h2 className="text-xl font-semibold text-petrol">{member.translation?.name}</h2>
                <p className="mt-2 text-sm font-semibold text-orange">{member.translation?.position}</p>
                <p className="mt-3 text-sm leading-7 text-petrol/65">{member.translation?.bio}</p>
              </Card>
            ))}
          </div>
        ) : null}

        {sections.formIntro ? (
          <Card className="mt-10">
            <p className="text-base leading-8 text-petrol/70">{sections.formIntro}</p>
          </Card>
        ) : null}
      </Container>
    </main>
  );
}
