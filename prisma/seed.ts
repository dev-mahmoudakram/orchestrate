import { hash } from "bcryptjs";
import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { getMysqlAdapterConfig } from "../lib/database/mysql";
import { Locale, PrismaClient, UserRole } from "../lib/generated/prisma/client";

config({ path: ".env.local", override: false });
config({ path: ".env", override: false });

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(getMysqlAdapterConfig()),
});

const pageSeeds = [
  {
    key: "home",
    slug: "home",
    sortOrder: 10,
    ar: {
      title: "الرئيسية",
      summary: "الصفحة الرئيسية لتجربة تناغم الابتكار.",
      body: "محتوى تمهيدي يتم استبداله من لوحة إدارة المحتوى.",
      seoTitle: "تناغم الابتكار",
      seoDescription: "موقع تناغم الابتكار المؤسسي.",
    },
    en: {
      title: "Home",
      summary: "The home page for Orchestrate Innovation.",
      body: "Starter content to be replaced from the CMS.",
      seoTitle: "Orchestrate Innovation",
      seoDescription: "The corporate website for Orchestrate Innovation.",
    },
  },
  {
    key: "about",
    slug: "about",
    sortOrder: 20,
    ar: {
      title: "من نحن",
      summary: "قصة الشركة وفلسفتها وقيمها.",
      body: "محتوى تمهيدي لصفحة التعريف.",
      seoTitle: "من نحن | تناغم الابتكار",
      seoDescription: "تعرف على تناغم الابتكار.",
    },
    en: {
      title: "About",
      summary: "Company story, philosophy, and values.",
      body: "Starter content for the about page.",
      seoTitle: "About | Orchestrate Innovation",
      seoDescription: "Learn about Orchestrate Innovation.",
    },
  },
  {
    key: "services",
    slug: "services",
    sortOrder: 30,
    ar: {
      title: "الخدمات",
      summary: "خدمات استراتيجية ومنهجية للجهات والمؤسسات.",
      body: "محتوى تمهيدي لصفحة الخدمات.",
      seoTitle: "الخدمات | تناغم الابتكار",
      seoDescription: "استعرض خدمات تناغم الابتكار.",
    },
    en: {
      title: "Services",
      summary: "Strategic and systemic services for institutions.",
      body: "Starter content for the services page.",
      seoTitle: "Services | Orchestrate Innovation",
      seoDescription: "Explore Orchestrate Innovation services.",
    },
  },
  {
    key: "projects",
    slug: "projects",
    sortOrder: 40,
    ar: {
      title: "المشاريع",
      summary: "دراسات حالة ومشاريع مختارة.",
      body: "محتوى تمهيدي لصفحة المشاريع.",
      seoTitle: "المشاريع | تناغم الابتكار",
      seoDescription: "استعرض مشاريع تناغم الابتكار.",
    },
    en: {
      title: "Projects",
      summary: "Selected case studies and projects.",
      body: "Starter content for the projects page.",
      seoTitle: "Projects | Orchestrate Innovation",
      seoDescription: "Explore Orchestrate Innovation projects.",
    },
  },
  {
    key: "contact",
    slug: "contact",
    sortOrder: 50,
    ar: {
      title: "تواصل معنا",
      summary: "قنوات التواصل مع تناغم الابتكار.",
      body: "محتوى تمهيدي لصفحة التواصل.",
      seoTitle: "تواصل معنا | تناغم الابتكار",
      seoDescription: "تواصل مع فريق تناغم الابتكار.",
    },
    en: {
      title: "Contact",
      summary: "Contact channels for Orchestrate Innovation.",
      body: "Starter content for the contact page.",
      seoTitle: "Contact | Orchestrate Innovation",
      seoDescription: "Contact the Orchestrate Innovation team.",
    },
  },
];

const translationSeeds = [
  { key: "nav.home", group: "nav", ar: "الرئيسية", en: "Home" },
  { key: "nav.about", group: "nav", ar: "من نحن", en: "About" },
  { key: "nav.services", group: "nav", ar: "الخدمات", en: "Services" },
  { key: "nav.projects", group: "nav", ar: "المشاريع", en: "Projects" },
  { key: "nav.contact", group: "nav", ar: "تواصل معنا", en: "Contact" },
  { key: "button.contact", group: "button", ar: "ابدأ الحوار", en: "Start a conversation" },
  { key: "button.learnMore", group: "button", ar: "اعرف المزيد", en: "Learn more" },
  { key: "button.viewProjects", group: "button", ar: "استعرض المشاريع", en: "View projects" },
  { key: "form.name", group: "form", ar: "الاسم", en: "Name" },
  { key: "form.company", group: "form", ar: "الجهة", en: "Company" },
  { key: "form.email", group: "form", ar: "البريد الإلكتروني", en: "Email" },
  { key: "form.phone", group: "form", ar: "رقم الهاتف", en: "Phone" },
  { key: "form.subject", group: "form", ar: "الموضوع", en: "Subject" },
  { key: "form.message", group: "form", ar: "الرسالة", en: "Message" },
  { key: "message.success", group: "message", ar: "تم إرسال رسالتك بنجاح.", en: "Your message was sent successfully." },
  { key: "message.error", group: "message", ar: "تعذر إرسال الرسالة. حاول مرة أخرى.", en: "Your message could not be sent. Please try again." },
  { key: "footer.rights", group: "footer", ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  { key: "state.loading", group: "state", ar: "جار التحميل", en: "Loading" },
  { key: "state.empty", group: "state", ar: "لا توجد بيانات حتى الآن.", en: "No records yet." },
  { key: "search.placeholder", group: "search", ar: "ابحث", en: "Search" },
];

const sectorSeeds = [
  {
    slug: "government",
    sortOrder: 10,
    ar: { title: "الجهات الحكومية", summary: "برامج ومنهجيات للقطاع الحكومي والمؤسسي." },
    en: { title: "Government", summary: "Programs and methods for public institutions." },
  },
  {
    slug: "social-impact",
    sortOrder: 20,
    ar: { title: "الأثر الاجتماعي", summary: "تصميم مبادرات ذات أثر مستدام." },
    en: { title: "Social impact", summary: "Designing initiatives with durable impact." },
  },
];

const serviceSeeds = [
  {
    slug: "strategy-orchestration",
    sortOrder: 10,
    ar: {
      title: "تناغم الاستراتيجية",
      summary: "مواءمة الرؤية، الحوكمة، والبرامج التنفيذية.",
      body: "خدمة تمهيدية قابلة للتحرير من لوحة التحكم.",
    },
    en: {
      title: "Strategy orchestration",
      summary: "Aligning vision, governance, and execution programs.",
      body: "Starter service content editable from the dashboard.",
    },
  },
  {
    slug: "systems-design",
    sortOrder: 20,
    ar: {
      title: "تصميم النظم",
      summary: "تحليل البنية المؤسسية وبناء نماذج تشغيل مترابطة.",
      body: "خدمة تمهيدية قابلة للتحرير من لوحة التحكم.",
    },
    en: {
      title: "Systems design",
      summary: "Analyzing institutional structures and operating models.",
      body: "Starter service content editable from the dashboard.",
    },
  },
];

type RichTranslationSeed = {
  title: string;
  summary?: string;
  body?: string;
  seoTitle?: string;
  seoDescription?: string;
};

type SectorTranslationSeed = {
  title: string;
  summary?: string;
};

type ProjectTranslationSeed = RichTranslationSeed & {
  challenge?: string;
  approach?: string;
  results?: string;
};

async function upsertPageTranslation(pageId: string, locale: Locale, data: RichTranslationSeed) {
  await prisma.pageTranslation.upsert({
    where: {
      pageId_locale: {
        pageId,
        locale,
      },
    },
    create: {
      pageId,
      locale,
      ...data,
    },
    update: data,
  });
}

async function upsertServiceTranslation(
  serviceId: string,
  locale: Locale,
  data: RichTranslationSeed,
) {
  await prisma.serviceTranslation.upsert({
    where: {
      serviceId_locale: {
        serviceId,
        locale,
      },
    },
    create: {
      serviceId,
      locale,
      ...data,
    },
    update: data,
  });
}

async function upsertSectorTranslation(
  sectorId: string,
  locale: Locale,
  data: SectorTranslationSeed,
) {
  await prisma.sectorTranslation.upsert({
    where: {
      sectorId_locale: {
        sectorId,
        locale,
      },
    },
    create: {
      sectorId,
      locale,
      ...data,
    },
    update: data,
  });
}

async function upsertProjectTranslation(
  projectId: string,
  locale: Locale,
  data: ProjectTranslationSeed,
) {
  await prisma.projectTranslation.upsert({
    where: {
      projectId_locale: {
        projectId,
        locale,
      },
    },
    create: {
      projectId,
      locale,
      ...data,
    },
    update: data,
  });
}

async function seedUsers() {
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? "Orchestrate Super Admin";
  const email = process.env.SEED_SUPER_ADMIN_EMAIL ?? "admin@orchestrate.local";
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await hash(password, 12);

  if (!process.env.SEED_SUPER_ADMIN_PASSWORD) {
    console.warn(
      "Using the local development seed password. Set SEED_SUPER_ADMIN_PASSWORD before seeding shared environments.",
    );
  }

  await prisma.user.upsert({
    where: { email },
    create: {
      name,
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
    update: {
      name,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });
}

async function seedPages() {
  for (const pageSeed of pageSeeds) {
    const page = await prisma.page.upsert({
      where: { key: pageSeed.key },
      create: {
        key: pageSeed.key,
        slug: pageSeed.slug,
        sortOrder: pageSeed.sortOrder,
        isPublished: true,
      },
      update: {
        slug: pageSeed.slug,
        sortOrder: pageSeed.sortOrder,
        isPublished: true,
      },
    });

    await upsertPageTranslation(page.id, Locale.ar, pageSeed.ar);
    await upsertPageTranslation(page.id, Locale.en, pageSeed.en);
  }
}

async function seedTranslationKeys() {
  for (const item of translationSeeds) {
    await prisma.translationKey.upsert({
      where: { key: item.key },
      create: item,
      update: item,
    });
  }
}

async function seedSectors() {
  const sectors = new Map<string, string>();

  for (const sectorSeed of sectorSeeds) {
    const sector = await prisma.sector.upsert({
      where: { slug: sectorSeed.slug },
      create: {
        slug: sectorSeed.slug,
        sortOrder: sectorSeed.sortOrder,
        isPublished: true,
      },
      update: {
        sortOrder: sectorSeed.sortOrder,
        isPublished: true,
      },
    });

    sectors.set(sectorSeed.slug, sector.id);
    await upsertSectorTranslation(sector.id, Locale.ar, sectorSeed.ar);
    await upsertSectorTranslation(sector.id, Locale.en, sectorSeed.en);
  }

  return sectors;
}

async function seedServices() {
  for (const serviceSeed of serviceSeeds) {
    const service = await prisma.service.upsert({
      where: { slug: serviceSeed.slug },
      create: {
        slug: serviceSeed.slug,
        sortOrder: serviceSeed.sortOrder,
        isPublished: true,
      },
      update: {
        sortOrder: serviceSeed.sortOrder,
        isPublished: true,
      },
    });

    await upsertServiceTranslation(service.id, Locale.ar, serviceSeed.ar);
    await upsertServiceTranslation(service.id, Locale.en, serviceSeed.en);
  }
}

async function seedProjects(sectors: Map<string, string>) {
  const project = await prisma.project.upsert({
    where: { slug: "institutional-transformation-roadmap" },
    create: {
      slug: "institutional-transformation-roadmap",
      sectorId: sectors.get("government"),
      sortOrder: 10,
      isFeatured: true,
      isPublished: true,
    },
    update: {
      sectorId: sectors.get("government"),
      sortOrder: 10,
      isFeatured: true,
      isPublished: true,
    },
  });

  await upsertProjectTranslation(project.id, Locale.ar, {
    title: "خارطة تحول مؤسسي",
    summary: "مشروع تمهيدي يوضح بنية دراسات الحالة.",
    challenge: "مواءمة المبادرات المتعددة داخل منظومة واحدة.",
    approach: "تصميم خارطة طريق ومصفوفة أولويات تنفيذية.",
    results: "نموذج قابل للتطوير والقياس.",
    body: "محتوى مشروع تمهيدي قابل للتحرير من لوحة التحكم.",
  });

  await upsertProjectTranslation(project.id, Locale.en, {
    title: "Institutional transformation roadmap",
    summary: "Starter project showing the case study structure.",
    challenge: "Aligning multiple initiatives inside one operating system.",
    approach: "Designing a roadmap and execution priority matrix.",
    results: "A scalable and measurable operating model.",
    body: "Starter project content editable from the dashboard.",
  });
}

async function seedSettings() {
  const settings = [
    { key: "site.name.ar", group: "identity", label: "Arabic site name", value: "تناغم الابتكار", isPublic: true },
    { key: "site.name.en", group: "identity", label: "English site name", value: "Orchestrate Innovation", isPublic: true },
    { key: "contact.email", group: "contact", label: "Public contact email", value: "hello@example.com", isPublic: true },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      create: setting,
      update: setting,
    });
  }
}

async function main() {
  await seedUsers();
  await seedPages();
  await seedTranslationKeys();
  const sectors = await seedSectors();
  await seedServices();
  await seedProjects(sectors);
  await seedSettings();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
