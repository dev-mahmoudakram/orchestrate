import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { hash } from "bcryptjs";
import { config } from "dotenv";

import { getMysqlAdapterConfig } from "../lib/database/mysql";
import { Locale, Prisma, PrismaClient, UserRole } from "../lib/generated/prisma/client";

config({ path: ".env.local", override: false });
config({ path: ".env", override: false });

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(getMysqlAdapterConfig()),
});

type RichTranslationSeed = {
  title: string;
  summary?: string;
  body?: string;
  sections?: Prisma.InputJsonValue;
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

type PartnerTranslationSeed = {
  name: string;
  description?: string;
};

type TeamTranslationSeed = {
  name: string;
  position?: string;
  bio?: string;
};

const pageSeeds = [
  {
    key: "home",
    slug: "home",
    sortOrder: 10,
    ar: {
      title: "الرئيسية",
      summary: "الوسيط المنظومي الذكي في خدمة المنظومة الوطنية.",
      body: "تناغم الابتكار تصمم حلولاً استراتيجية تربط بين الجهات والبيانات والاحتياجات المجتمعية وأصحاب المصلحة لصناعة أثر مستدام.",
      sections: {
        hero: {
          headline: "الوسيط المنظومي الذكي في خدمة المنظومة الوطنية",
          subheadline:
            "نصنع حلولاً استراتيجية تربط بين الجهات، البيانات، الاحتياجات المجتمعية، وأصحاب المصلحة لصناعة أثر مستدام في القطاعات الحيوية.",
          primaryCtaLabel: "تواصل لمناقشة مشروعك",
          primaryCtaHref: "/contact",
          secondaryCtaLabel: "استكشف خدماتنا",
          secondaryCtaHref: "/services",
        },
        philosophy: {
          title: "الابتكار لا يحدث في فراغ",
          body: "بل ينشأ حين تتناغم الرؤية مع التنفيذ، وتتصل الجهات المعنية ضمن منظومة واضحة تصنع الأثر.",
        },
        methodology: {
          title: "منهجية تربط الرؤية بالتنفيذ",
          body: "نحوّل التحديات المعقدة إلى مسارات عمل واضحة، قابلة للتنفيذ والقياس.",
          steps: [
            { title: "نفهم السياق", description: "نقرأ الواقع المؤسسي والاجتماعي قبل اقتراح الحل." },
            { title: "نشخص المنظومة", description: "نحدد العلاقات والفجوات وفرص التناغم بين الأطراف." },
            { title: "نصمم الحل", description: "نصوغ نموذجاً استراتيجياً قابلاً للتطبيق." },
            { title: "نبني الشراكات", description: "نربط الجهات والأدوار لضمان التنفيذ المشترك." },
            { title: "نقيس الأثر", description: "نضع مؤشرات تساعد على التطوير المستمر." },
          ],
        },
        finalCta: {
          title: "هل تعمل على مبادرة تحتاج إلى تنسيق منظومي؟",
          body: "دعنا نساعدك في تحويل الرؤية إلى إطار عمل واضح، قابل للتنفيذ، ومصمم للأثر.",
          ctaLabel: "ابدأ المحادثة",
          ctaHref: "/contact",
        },
      },
      seoTitle: "تناغم الابتكار | حلول استراتيجية منظومية",
      seoDescription: "تناغم الابتكار شركة استشارية تصمم حلولاً منظومية للجهات والمؤسسات والقطاعات الحيوية.",
    },
    en: {
      title: "Home",
      summary: "The intelligent systemic intermediary serving national ecosystems.",
      body: "Orchestrate Innovation designs strategic solutions that connect institutions, stakeholders, data, and social needs to create measurable and sustainable impact.",
      sections: {
        hero: {
          headline: "The intelligent systemic intermediary serving national ecosystems",
          subheadline:
            "We design strategic solutions that connect institutions, stakeholders, data, and social needs to create measurable and sustainable impact across vital sectors.",
          primaryCtaLabel: "Discuss Your Project",
          primaryCtaHref: "/en/contact",
          secondaryCtaLabel: "Explore Our Services",
          secondaryCtaHref: "/en/services",
        },
        philosophy: {
          title: "Innovation does not happen in isolation",
          body: "It emerges when vision, execution, institutions, and stakeholders move together within a clear and purposeful system.",
        },
        methodology: {
          title: "A methodology that connects vision with execution",
          body: "We translate complex challenges into clear, actionable, and measurable work paths.",
          steps: [
            { title: "Understand the context", description: "We read the institutional and social reality before proposing a solution." },
            { title: "Diagnose the ecosystem", description: "We identify relationships, gaps, and opportunities for alignment." },
            { title: "Design the solution", description: "We shape a practical strategic model." },
            { title: "Build partnerships", description: "We connect entities and roles for shared execution." },
            { title: "Measure impact", description: "We define indicators that support continuous improvement." },
          ],
        },
        finalCta: {
          title: "Working on an initiative that needs systemic coordination?",
          body: "Let us help you turn your vision into a clear, actionable, and impact-driven framework.",
          ctaLabel: "Start the Conversation",
          ctaHref: "/en/contact",
        },
      },
      seoTitle: "Orchestrate Innovation | Systemic Strategic Solutions",
      seoDescription: "Orchestrate Innovation is a strategic consultancy designing systemic solutions for institutions and vital sectors.",
    },
  },
  {
    key: "about",
    slug: "about",
    sortOrder: 20,
    ar: {
      title: "من نحن",
      summary: "ننسّق عناصر المنظومة لصناعة أثر استراتيجي مستدام.",
      body: "تناغم الابتكار شركة استشارية تعمل على تصميم حلول استراتيجية تربط بين الرؤية، أصحاب المصلحة، والاحتياجات الوطنية ضمن إطار منظومي واضح.",
      sections: {
        hero: {
          headline: "ننسّق عناصر المنظومة لصناعة أثر استراتيجي مستدام",
          subheadline:
            "نؤمن أن الحلول المؤثرة تبدأ من فهم العلاقات بين الجهات والاحتياجات والفرص، لا من معالجة الأعراض منفصلة.",
        },
        story: {
          title: "قصة تناغم",
          body: "نساعد المؤسسات والجهات على تحويل الأفكار والمبادرات إلى نماذج عمل واضحة تجمع بين التفكير الاستراتيجي والتنفيذ المنظم.",
        },
        values: {
          title: "مبادئنا",
          items: ["الوضوح قبل التعقيد", "الشراكة قبل التنفيذ المنفرد", "الأثر قبل النشاط", "القياس قبل التوسع"],
        },
      },
      seoTitle: "من نحن | تناغم الابتكار",
      seoDescription: "تعرف على تناغم الابتكار وفلسفتها في تصميم الحلول المنظومية.",
    },
    en: {
      title: "About Us",
      summary: "We orchestrate ecosystem elements to create sustainable strategic impact.",
      body: "Orchestrate Innovation is a strategic consultancy that designs systemic solutions connecting vision, stakeholders, and national priorities within clear and actionable frameworks.",
      sections: {
        hero: {
          headline: "We orchestrate ecosystem elements to create sustainable strategic impact",
          subheadline:
            "We believe meaningful solutions begin with understanding the relationships between institutions, needs, and opportunities.",
        },
        story: {
          title: "Our Story",
          body: "We help institutions turn initiatives into clear operating models that combine strategic thinking with disciplined execution.",
        },
        values: {
          title: "Our Principles",
          items: ["Clarity before complexity", "Partnership before isolated execution", "Impact before activity", "Measurement before scale"],
        },
      },
      seoTitle: "About | Orchestrate Innovation",
      seoDescription: "Learn about Orchestrate Innovation and its systemic approach to strategic solutions.",
    },
  },
  {
    key: "services",
    slug: "services",
    sortOrder: 30,
    ar: {
      title: "خدماتنا",
      summary: "خدمات استراتيجية ومنهجية للجهات والمؤسسات.",
      body: "نقدم خدمات تساعد الجهات على تشخيص المنظومات، تصميم الحلول، بناء الشراكات، وتحويل الرؤية إلى تنفيذ قابل للقياس.",
      sections: {
        hero: {
          headline: "خدمات تصمم الحل من داخل المنظومة",
          subheadline: "من التشخيص إلى التصميم والتنفيذ، نعمل على بناء مسارات تربط الأطراف وتوضح القرار.",
        },
      },
      seoTitle: "الخدمات | تناغم الابتكار",
      seoDescription: "استعرض خدمات تناغم الابتكار في التشخيص المنظومي وتصميم الحلول والاستشارات المؤسسية.",
    },
    en: {
      title: "Services",
      summary: "Strategic and systemic services for institutions.",
      body: "We help institutions diagnose ecosystems, design solutions, build partnerships, and turn vision into measurable execution.",
      sections: {
        hero: {
          headline: "Services designed from inside the ecosystem",
          subheadline: "From diagnosis to design and execution, we build paths that connect stakeholders and clarify decisions.",
        },
      },
      seoTitle: "Services | Orchestrate Innovation",
      seoDescription: "Explore Orchestrate Innovation services in systemic diagnosis, solution design, and institutional consulting.",
    },
  },
  {
    key: "projects",
    slug: "projects",
    sortOrder: 40,
    ar: {
      title: "المشاريع",
      summary: "دراسات حالة ومشاريع مختارة توضّح منهجية تناغم.",
      body: "تعرض هذه الصفحة مشاريع مختارة توضح كيف تتحول الرؤية إلى نماذج عمل وشراكات وأثر قابل للقياس.",
      sections: {
        hero: {
          headline: "مشاريع تقيس الأثر لا النشاط فقط",
          subheadline: "نستعرض نماذج عمل ودراسات حالة في قطاعات الأسرة والطفولة والصحة والتعليم والتنمية الاجتماعية.",
        },
      },
      seoTitle: "المشاريع | تناغم الابتكار",
      seoDescription: "استعرض مشاريع ودراسات حالة تناغم الابتكار.",
    },
    en: {
      title: "Projects",
      summary: "Selected case studies and projects that show the Orchestrate methodology.",
      body: "This page presents selected projects showing how vision turns into operating models, partnerships, and measurable impact.",
      sections: {
        hero: {
          headline: "Projects that measure impact, not activity alone",
          subheadline: "Explore operating models and case studies across family, health, education, and social development.",
        },
      },
      seoTitle: "Projects | Orchestrate Innovation",
      seoDescription: "Explore Orchestrate Innovation projects and case studies.",
    },
  },
  {
    key: "contact",
    slug: "contact",
    sortOrder: 50,
    ar: {
      title: "تواصل معنا",
      summary: "قنوات التواصل مع فريق تناغم الابتكار.",
      body: "نستقبل استفسارات الجهات والمؤسسات حول المبادرات والمشاريع التي تحتاج إلى تصميم أو تنسيق منظومي.",
      sections: {
        hero: {
          headline: "لنبدأ محادثة حول مبادرتك",
          subheadline: "شاركنا السياق والتحدي، وسنساعدك في تحديد مسار العمل الأنسب.",
        },
        formIntro: "املأ النموذج وسيقوم فريقنا بالرد عليك في أقرب وقت.",
      },
      seoTitle: "تواصل معنا | تناغم الابتكار",
      seoDescription: "تواصل مع فريق تناغم الابتكار لمناقشة مبادرة أو مشروع يحتاج إلى تنسيق منظومي.",
    },
    en: {
      title: "Contact Us",
      summary: "Contact channels for the Orchestrate Innovation team.",
      body: "We welcome inquiries from institutions working on initiatives that require systemic design or coordination.",
      sections: {
        hero: {
          headline: "Start a conversation about your initiative",
          subheadline: "Share the context and challenge, and we will help define the right path forward.",
        },
        formIntro: "Complete the form and our team will respond as soon as possible.",
      },
      seoTitle: "Contact | Orchestrate Innovation",
      seoDescription: "Contact Orchestrate Innovation to discuss an initiative or project that needs systemic coordination.",
    },
  },
];

const translationSeeds = [
  { key: "nav.home", group: "nav", ar: "الرئيسية", en: "Home" },
  { key: "nav.about", group: "nav", ar: "من نحن", en: "About" },
  { key: "nav.services", group: "nav", ar: "الخدمات", en: "Services" },
  { key: "nav.projects", group: "nav", ar: "المشاريع", en: "Projects" },
  { key: "nav.contact", group: "nav", ar: "تواصل معنا", en: "Contact" },
  { key: "nav.cta", group: "nav", ar: "ابدأ المحادثة", en: "Start a Conversation" },
  { key: "nav.language_ar", group: "nav", ar: "العربية", en: "Arabic" },
  { key: "nav.language_en", group: "nav", ar: "English", en: "English" },
  { key: "button.contact", group: "button", ar: "ابدأ الحوار", en: "Start a Conversation" },
  { key: "button.learnMore", group: "button", ar: "اعرف المزيد", en: "Learn More" },
  { key: "button.viewProjects", group: "button", ar: "استعرض المشاريع", en: "View Projects" },
  { key: "button.viewCaseStudy", group: "button", ar: "عرض دراسة الحالة", en: "View Case Study" },
  { key: "footer.quick_links", group: "footer", ar: "روابط سريعة", en: "Quick Links" },
  { key: "footer.contact", group: "footer", ar: "التواصل", en: "Contact" },
  { key: "footer.social", group: "footer", ar: "القنوات", en: "Social" },
  {
    key: "footer.company_description",
    group: "footer",
    ar: "شركة استشارية تصمم حلولاً منظومية تربط بين الجهات والاحتياجات والأثر.",
    en: "A strategic consultancy designing systemic solutions that connect institutions, needs, and impact.",
  },
  { key: "footer.rights", group: "footer", ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  { key: "form.name", group: "form", ar: "الاسم", en: "Name" },
  { key: "form.organization", group: "form", ar: "الجهة", en: "Organization" },
  { key: "form.company", group: "form", ar: "الجهة", en: "Company" },
  { key: "form.email", group: "form", ar: "البريد الإلكتروني", en: "Email" },
  { key: "form.phone", group: "form", ar: "رقم الهاتف", en: "Phone" },
  { key: "form.subject", group: "form", ar: "الموضوع", en: "Subject" },
  { key: "form.message", group: "form", ar: "الرسالة", en: "Message" },
  { key: "form.submit", group: "form", ar: "إرسال الرسالة", en: "Send Message" },
  { key: "form.success", group: "form", ar: "تم إرسال رسالتك بنجاح.", en: "Your message was sent successfully." },
  { key: "form.error", group: "form", ar: "تعذر إرسال الرسالة. حاول مرة أخرى.", en: "Your message could not be sent. Please try again." },
  { key: "form.required", group: "form", ar: "هذا الحقل مطلوب.", en: "This field is required." },
  { key: "message.success", group: "message", ar: "تم إرسال رسالتك بنجاح.", en: "Your message was sent successfully." },
  { key: "message.error", group: "message", ar: "تعذر إرسال الرسالة. حاول مرة أخرى.", en: "Your message could not be sent. Please try again." },
  { key: "state.loading", group: "state", ar: "جار التحميل", en: "Loading" },
  { key: "state.empty", group: "state", ar: "لا توجد بيانات حتى الآن.", en: "No records yet." },
  { key: "search.placeholder", group: "search", ar: "ابحث", en: "Search" },
  { key: "page.notFound.title", group: "page", ar: "الصفحة غير موجودة", en: "Page Not Found" },
  { key: "page.notFound.cta", group: "page", ar: "العودة للرئيسية", en: "Back to Home" },
];

const sectorSeeds = [
  {
    slug: "family-childhood",
    icon: "users",
    sortOrder: 10,
    ar: { title: "الأسرة والطفولة", summary: "حلول ومبادرات تدعم استقرار الأسرة ونمو الطفل ضمن منظومة متكاملة." },
    en: { title: "Family & Childhood", summary: "Solutions and initiatives supporting families and childhood within integrated ecosystems." },
  },
  {
    slug: "health",
    icon: "activity",
    sortOrder: 20,
    ar: { title: "الصحة", summary: "تصميم مسارات وشراكات ترفع كفاءة المبادرات الصحية وتوضح أثرها." },
    en: { title: "Health", summary: "Designing pathways and partnerships that improve health initiatives and clarify their impact." },
  },
  {
    slug: "education",
    icon: "graduation-cap",
    sortOrder: 30,
    ar: { title: "التعليم", summary: "منهجيات تربط التعلم والمهارات والمؤسسات بمخرجات قابلة للقياس." },
    en: { title: "Education", summary: "Methods connecting learning, skills, and institutions with measurable outcomes." },
  },
  {
    slug: "social-development",
    icon: "network",
    sortOrder: 40,
    ar: { title: "التنمية الاجتماعية", summary: "نماذج عمل تعزز الشراكات وتحوّل المبادرات المجتمعية إلى أثر مستدام." },
    en: { title: "Social Development", summary: "Operating models that strengthen partnerships and turn social initiatives into sustainable impact." },
  },
];

const serviceSeeds = [
  {
    slug: "systemic-diagnosis",
    icon: "scan-search",
    sortOrder: 10,
    ar: {
      title: "التشخيص المنظومي",
      summary: "نقرأ المنظومة كما هي: الأطراف، العلاقات، الفجوات، والفرص.",
      body: "نحلل السياق المؤسسي والمجتمعي لتحديد جذور التحدي ونقاط التدخل الأكثر تأثيراً.",
      seoTitle: "التشخيص المنظومي | تناغم الابتكار",
      seoDescription: "خدمة التشخيص المنظومي لفهم العلاقات والفجوات وفرص الأثر.",
    },
    en: {
      title: "Systemic Diagnosis",
      summary: "We read the ecosystem as it is: stakeholders, relationships, gaps, and opportunities.",
      body: "We analyze institutional and social contexts to identify root challenges and the highest-impact intervention points.",
      seoTitle: "Systemic Diagnosis | Orchestrate Innovation",
      seoDescription: "Systemic diagnosis for understanding relationships, gaps, and impact opportunities.",
    },
  },
  {
    slug: "strategic-solution-design",
    icon: "layers",
    sortOrder: 20,
    ar: {
      title: "تصميم الحلول الاستراتيجية",
      summary: "نحوّل التشخيص إلى نماذج عمل ومسارات تنفيذ واضحة.",
      body: "نصمم حلولاً قابلة للتطبيق تربط بين الأهداف، الموارد، الأطراف، ومؤشرات الأثر.",
      seoTitle: "تصميم الحلول الاستراتيجية | تناغم الابتكار",
      seoDescription: "تصميم حلول استراتيجية قابلة للتنفيذ والقياس.",
    },
    en: {
      title: "Strategic Solution Design",
      summary: "We translate diagnosis into operating models and clear execution paths.",
      body: "We design practical solutions that connect objectives, resources, stakeholders, and impact indicators.",
      seoTitle: "Strategic Solution Design | Orchestrate Innovation",
      seoDescription: "Strategic solution design for actionable and measurable execution.",
    },
  },
  {
    slug: "institutional-consulting",
    icon: "landmark",
    sortOrder: 30,
    ar: {
      title: "الاستشارات المؤسسية",
      summary: "نساعد الجهات على بناء أطر قرار وتشغيل أكثر وضوحاً وتناغماً.",
      body: "ندعم المؤسسات في تطوير الحوكمة، الأدوار، نماذج التشغيل، ومؤشرات الأداء المرتبطة بالأثر.",
      seoTitle: "الاستشارات المؤسسية | تناغم الابتكار",
      seoDescription: "استشارات مؤسسية لتطوير الحوكمة ونماذج التشغيل.",
    },
    en: {
      title: "Institutional Consulting",
      summary: "We help institutions build clearer and better-aligned decision and operating frameworks.",
      body: "We support institutions in developing governance, roles, operating models, and performance indicators tied to impact.",
      seoTitle: "Institutional Consulting | Orchestrate Innovation",
      seoDescription: "Institutional consulting for governance and operating model development.",
    },
  },
  {
    slug: "partnership-building-enablement",
    icon: "handshake",
    sortOrder: 40,
    ar: {
      title: "بناء الشراكات والتمكين",
      summary: "ننسق الأدوار بين الجهات لتحويل المبادرات إلى عمل مشترك مستدام.",
      body: "نصمم نماذج شراكة وتمكين تساعد الأطراف على العمل ضمن إطار واضح للمسؤوليات والأثر.",
      seoTitle: "بناء الشراكات والتمكين | تناغم الابتكار",
      seoDescription: "بناء شراكات ونماذج تمكين لتنفيذ المبادرات المشتركة.",
    },
    en: {
      title: "Partnership Building & Enablement",
      summary: "We coordinate roles across entities to turn initiatives into sustainable shared work.",
      body: "We design partnership and enablement models that help stakeholders work within clear responsibility and impact frameworks.",
      seoTitle: "Partnership Building & Enablement | Orchestrate Innovation",
      seoDescription: "Partnership and enablement models for shared initiative execution.",
    },
  },
];

const projectSeeds = [
  {
    slug: "family-services-ecosystem",
    sectorSlug: "family-childhood",
    sortOrder: 10,
    isFeatured: true,
    ar: {
      title: "منظومة خدمات الأسرة والطفولة",
      summary: "تصميم إطار تشغيلي يربط الجهات والخدمات حول رحلة المستفيد.",
      challenge: "تعدد الجهات وتداخل الأدوار أدى إلى تجربة مجزأة للمستفيد.",
      approach: "بناء خريطة منظومية ومسارات تنسيق واضحة بين الجهات.",
      results: "إطار عمل موحد يوضح الأدوار ونقاط القياس ومجالات التحسين.",
      body: "نموذج دراسة حالة قابل للتعديل من لوحة التحكم.",
    },
    en: {
      title: "Family Services Ecosystem",
      summary: "Designing an operating framework connecting entities and services around the beneficiary journey.",
      challenge: "Multiple entities and overlapping roles created a fragmented beneficiary experience.",
      approach: "Building an ecosystem map and clear coordination pathways across entities.",
      results: "A unified framework clarifying roles, metrics, and improvement areas.",
      body: "Starter case study editable from the dashboard.",
    },
  },
  {
    slug: "health-initiative-roadmap",
    sectorSlug: "health",
    sortOrder: 20,
    isFeatured: true,
    ar: {
      title: "خارطة طريق لمبادرة صحية",
      summary: "تحويل رؤية صحية إلى مراحل تنفيذ ومؤشرات أثر قابلة للمتابعة.",
      challenge: "وجود رؤية طموحة دون نموذج تشغيل واضح للتنفيذ والقياس.",
      approach: "تصميم خارطة طريق ومصفوفة أولويات وشركاء تنفيذ.",
      results: "مسار تنفيذ مرحلي ومؤشرات أثر تساعد على اتخاذ القرار.",
      body: "نموذج دراسة حالة قابل للتعديل من لوحة التحكم.",
    },
    en: {
      title: "Health Initiative Roadmap",
      summary: "Turning a health vision into execution stages and trackable impact indicators.",
      challenge: "An ambitious vision lacked a clear operating model for execution and measurement.",
      approach: "Designing a roadmap, priority matrix, and implementation partner map.",
      results: "A phased execution path and impact indicators supporting decision-making.",
      body: "Starter case study editable from the dashboard.",
    },
  },
];

const partnerSeeds = [
  {
    slug: "national-institution",
    websiteUrl: "https://example.com",
    sortOrder: 10,
    ar: { name: "جهة وطنية", description: "شريك مؤسسي في مبادرات ذات أثر منظومي." },
    en: { name: "National Institution", description: "An institutional partner in systemic impact initiatives." },
  },
  {
    slug: "development-partner",
    websiteUrl: "https://example.com",
    sortOrder: 20,
    ar: { name: "شريك تنموي", description: "شريك في تصميم وتنفيذ برامج التنمية الاجتماعية." },
    en: { name: "Development Partner", description: "A partner in designing and executing social development programs." },
  },
];

const teamSeeds = [
  {
    slug: "strategy-lead",
    email: "lead@example.com",
    sortOrder: 10,
    ar: { name: "قائد الاستراتيجية", position: "استشاري أول", bio: "يقود تصميم الحلول المنظومية وتحويل الرؤية إلى نماذج قابلة للتنفيذ." },
    en: { name: "Strategy Lead", position: "Senior Consultant", bio: "Leads systemic solution design and translates vision into actionable models." },
  },
];

async function upsertPageTranslation(pageId: string, locale: Locale, data: RichTranslationSeed) {
  await prisma.pageTranslation.upsert({
    where: { pageId_locale: { pageId, locale } },
    create: {
      pageId,
      locale,
      ...data,
      sections: data.sections ?? Prisma.JsonNull,
    },
    update: {
      ...data,
      sections: data.sections ?? Prisma.JsonNull,
    },
  });
}

async function upsertServiceTranslation(serviceId: string, locale: Locale, data: RichTranslationSeed) {
  await prisma.serviceTranslation.upsert({
    where: { serviceId_locale: { serviceId, locale } },
    create: { serviceId, locale, ...data },
    update: data,
  });
}

async function upsertSectorTranslation(sectorId: string, locale: Locale, data: SectorTranslationSeed) {
  await prisma.sectorTranslation.upsert({
    where: { sectorId_locale: { sectorId, locale } },
    create: { sectorId, locale, ...data },
    update: data,
  });
}

async function upsertProjectTranslation(projectId: string, locale: Locale, data: ProjectTranslationSeed) {
  await prisma.projectTranslation.upsert({
    where: { projectId_locale: { projectId, locale } },
    create: { projectId, locale, ...data },
    update: data,
  });
}

async function upsertPartnerTranslation(partnerId: string, locale: Locale, data: PartnerTranslationSeed) {
  await prisma.partnerTranslation.upsert({
    where: { partnerId_locale: { partnerId, locale } },
    create: { partnerId, locale, ...data },
    update: data,
  });
}

async function upsertTeamTranslation(teamMemberId: string, locale: Locale, data: TeamTranslationSeed) {
  await prisma.teamMemberTranslation.upsert({
    where: { teamMemberId_locale: { teamMemberId, locale } },
    create: { teamMemberId, locale, ...data },
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
    create: { name, email, passwordHash, role: UserRole.SUPER_ADMIN, isActive: true },
    update: { name, passwordHash, role: UserRole.SUPER_ADMIN, isActive: true },
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
        deletedAt: null,
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
        icon: sectorSeed.icon,
        sortOrder: sectorSeed.sortOrder,
        isPublished: true,
      },
      update: {
        icon: sectorSeed.icon,
        sortOrder: sectorSeed.sortOrder,
        isPublished: true,
        deletedAt: null,
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
        icon: serviceSeed.icon,
        sortOrder: serviceSeed.sortOrder,
        isPublished: true,
      },
      update: {
        icon: serviceSeed.icon,
        sortOrder: serviceSeed.sortOrder,
        isPublished: true,
        deletedAt: null,
      },
    });

    await upsertServiceTranslation(service.id, Locale.ar, serviceSeed.ar);
    await upsertServiceTranslation(service.id, Locale.en, serviceSeed.en);
  }
}

async function seedProjects(sectors: Map<string, string>) {
  for (const projectSeed of projectSeeds) {
    const project = await prisma.project.upsert({
      where: { slug: projectSeed.slug },
      create: {
        slug: projectSeed.slug,
        sectorId: sectors.get(projectSeed.sectorSlug),
        sortOrder: projectSeed.sortOrder,
        isFeatured: projectSeed.isFeatured,
        isPublished: true,
      },
      update: {
        sectorId: sectors.get(projectSeed.sectorSlug),
        sortOrder: projectSeed.sortOrder,
        isFeatured: projectSeed.isFeatured,
        isPublished: true,
        deletedAt: null,
      },
    });

    await upsertProjectTranslation(project.id, Locale.ar, projectSeed.ar);
    await upsertProjectTranslation(project.id, Locale.en, projectSeed.en);
  }
}

async function seedPartners() {
  for (const partnerSeed of partnerSeeds) {
    const partner = await prisma.partner.upsert({
      where: { slug: partnerSeed.slug },
      create: {
        slug: partnerSeed.slug,
        websiteUrl: partnerSeed.websiteUrl,
        sortOrder: partnerSeed.sortOrder,
        isPublished: true,
      },
      update: {
        websiteUrl: partnerSeed.websiteUrl,
        sortOrder: partnerSeed.sortOrder,
        isPublished: true,
        deletedAt: null,
      },
    });

    await upsertPartnerTranslation(partner.id, Locale.ar, partnerSeed.ar);
    await upsertPartnerTranslation(partner.id, Locale.en, partnerSeed.en);
  }
}

async function seedTeam() {
  for (const teamSeed of teamSeeds) {
    const teamMember = await prisma.teamMember.upsert({
      where: { slug: teamSeed.slug },
      create: {
        slug: teamSeed.slug,
        email: teamSeed.email,
        sortOrder: teamSeed.sortOrder,
        isPublished: true,
      },
      update: {
        email: teamSeed.email,
        sortOrder: teamSeed.sortOrder,
        isPublished: true,
        deletedAt: null,
      },
    });

    await upsertTeamTranslation(teamMember.id, Locale.ar, teamSeed.ar);
    await upsertTeamTranslation(teamMember.id, Locale.en, teamSeed.en);
  }
}

async function seedSettings() {
  const settings = [
    { key: "site.name.ar", group: "identity", label: "Arabic site name", value: "تناغم الابتكار", isPublic: true },
    { key: "site.name.en", group: "identity", label: "English site name", value: "Orchestrate Innovation", isPublic: true },
    { key: "contact.email", group: "contact", label: "Public contact email", value: "hello@orchestrate.local", isPublic: true },
    { key: "contact.phone", group: "contact", label: "Public phone", value: "+966 00 000 0000", isPublic: true },
    { key: "contact.address.ar", group: "contact", label: "Arabic address", value: "الرياض، المملكة العربية السعودية", isPublic: true },
    { key: "contact.address.en", group: "contact", label: "English address", value: "Riyadh, Saudi Arabia", isPublic: true },
    { key: "social.linkedin", group: "social", label: "LinkedIn URL", value: "https://www.linkedin.com", isPublic: true },
    { key: "social.x", group: "social", label: "X URL", value: "https://x.com", isPublic: true },
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
  await seedPartners();
  await seedTeam();
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
