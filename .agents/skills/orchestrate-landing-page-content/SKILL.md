---
name: orchestrate-landing-page-content
description: Use this skill when designing, planning, writing, or implementing the Orchestrate Innovation homepage / landing page sections, section hierarchy, Arabic and English content fields, CMS-editable content, and premium interactive UI direction.
---

# Orchestrate Landing Page Content Skill

## Purpose

Use this skill to design and implement the homepage / landing page of Orchestrate Innovation.

The homepage must be a premium bilingual corporate landing page for a strategic consultancy / government-facing client.

The goal is not to create a generic startup landing page. The page must feel elegant, credible, strategic, calm, institutional, and modern.

## Project Identity

Company:

- English: Orchestrate Innovation
- Arabic: تناغم الابتكار

Core positioning:

- Arabic default message: الوسيط المنظومي الذكي في خدمة المنظومة الوطنية

Business type:

- Strategic consultancy
- Systemic consulting
- Institutional solution design
- B2B and government-facing work

Primary sectors:

- Family and childhood
- Health
- Education
- Social development

Brand colors:

- Deep petrol blue: `#0F3D44`
- Orange accent: `#E87722`
- Turquoise: `#6BBFB5`
- White: `#FFFFFF`
- Soft gray: `#F7F7F6`

Logo visual language:

- Repeating vertical bars
- Musical / orchestration wave
- Systemic rhythm
- Coordination and structured movement

Use the logo pattern as a visual system across the page, not only as a logo.

## Language Rules

Arabic is the default language.

Routes:

- `/` = Arabic homepage
- `/en` = English homepage

Do not hardcode content as static-only values.

The homepage content must be editable from the admin dashboard in Arabic and English.

Use translation-aware data structure.

Recommended Prisma models:

- `Page`
- `PageTranslation`
- `TranslationKey`
- `Partner`
- `PartnerTranslation` if partner names/descriptions are localized
- `Service`
- `ServiceTranslation`
- `Sector`
- `SectorTranslation`
- `Project`
- `ProjectTranslation`

The homepage should be represented by:

- `Page.key = "home"`

Its localized content should be stored in:

- `PageTranslation.locale = "ar"`
- `PageTranslation.locale = "en"`

## Homepage Section Structure

The homepage must include these sections in this order unless there is a strong reason to adjust:

1. Hero Section
2. Philosophy Strip
3. Sectors Section
4. Services Preview
5. Methodology Section
6. Featured Case Studies
7. Partners / Clients Strip
8. Final CTA

## 1. Hero Section

### Purpose

Create a strong first impression. The hero must communicate trust, strategic clarity, and systemic innovation.

### Arabic content direction

Main headline:

- الوسيط المنظومي الذكي في خدمة المنظومة الوطنية

Possible supporting copy:

- نصنع حلولًا استراتيجية تربط بين الجهات، البيانات، الاحتياجات المجتمعية، وأصحاب المصلحة لصناعة أثر مستدام في القطاعات الحيوية.

Primary CTA:

- تواصل لمناقشة مشروعك

Secondary CTA:

- استكشف خدماتنا

### English content direction

Main headline:

- The intelligent systemic intermediary serving national ecosystems

Possible supporting copy:

- We design strategic solutions that connect institutions, stakeholders, data, and social needs to create measurable and sustainable impact across vital sectors.

Primary CTA:

- Discuss Your Project

Secondary CTA:

- Explore Our Services

### UI direction

Use:

- Large premium typography
- Calm spacing
- Hero pattern inspired by the logo bars
- Subtle motion only
- Deep petrol blue and soft gray background options
- Orange only for primary CTA or key accent
- Turquoise for secondary highlights

Avoid:

- Loud SaaS gradients
- Overuse of glassmorphism
- Excessive animation
- Generic stock-business hero images

## 2. Philosophy Strip

### Purpose

Explain the company’s belief system in one memorable section.

### Arabic content direction

Main phrase:

- الابتكار لا يحدث في فراغ

Supporting copy:

- بل ينشأ حين تتناغم الرؤية مع التنفيذ، وتتصل الجهات المعنية ضمن منظومة واضحة تصنع الأثر.

### English content direction

Main phrase:

- Innovation does not happen in isolation

Supporting copy:

- It emerges when vision, execution, institutions, and stakeholders move together within a clear and purposeful system.

### UI direction

This section can use a horizontal band, subtle logo-bar rhythm, or a premium quote layout.

It should feel editorial and strategic.

## 3. Sectors Section

### Purpose

Show the main sectors Orchestrate serves.

### Required sectors

Arabic:

- الأسرة والطفولة
- الصحة
- التعليم
- التنمية الاجتماعية

English:

- Family & Childhood
- Health
- Education
- Social Development

### CMS fields per sector

Each sector must support:

- icon
- order
- isPublished
- Arabic title
- English title
- Arabic short description
- English short description
- optional image/pattern

### UI direction

Use 4 elegant cards.

Each card should feel institutional, not playful.

Recommended layout:

- 2x2 grid on desktop
- single column on mobile
- subtle hover movement
- icon or abstract line mark
- turquoise/orange micro accents

## 4. Services Preview

### Purpose

Preview the main services and link to the services page.

### Required services

Arabic:

- التشخيص المنظومي
- تصميم الحلول الاستراتيجية
- الاستشارات المؤسسية
- بناء الشراكات والتمكين

English:

- Systemic Diagnosis
- Strategic Solution Design
- Institutional Consulting
- Partnership Building & Enablement

### CMS fields per service

Each service must support:

- slug
- icon
- order
- isPublished
- Arabic title
- English title
- Arabic short description
- English short description
- Arabic full description
- English full description
- Arabic SEO title
- English SEO title
- Arabic SEO description
- English SEO description

### UI direction

Use refined interactive cards.

Possible interaction:

- hover reveals secondary text
- small animated line
- icon shift
- card background changes softly

Avoid heavy animation.

The service cards must be accessible and readable.

## 5. Methodology Section

### Purpose

Show credibility and process.

### Suggested Arabic title

- منهجية تربط الرؤية بالتنفيذ

### Suggested English title

- A methodology that connects vision with execution

### Suggested steps

Arabic:

1. نفهم السياق
2. نشخص المنظومة
3. نصمم الحل
4. نبني الشراكات
5. نقيس الأثر

English:

1. Understand the context
2. Diagnose the ecosystem
3. Design the solution
4. Build partnerships
5. Measure impact

### UI direction

Use a premium process timeline.

For Arabic, direction should feel RTL.

For English, direction should feel LTR.

The design may use the vertical bar motif from the logo as step markers.

## 6. Featured Case Studies

### Purpose

Show selected projects and build trust.

### CMS rules

Featured projects should come from the `Project` table where:

- `isFeatured = true`
- `isPublished = true`

Each card must display localized content:

- project title
- sector
- summary
- optional result/impact highlight
- cover image
- link to project details

### Arabic CTA

- عرض دراسة الحالة

### English CTA

- View Case Study

### UI direction

Use high-end cards.

Cards should feel like consulting case studies, not portfolio thumbnails only.

Recommended card fields:

- sector badge
- project title
- one-line challenge
- short impact summary
- CTA

## 7. Partners / Clients Strip

### Purpose

Build credibility.

### CMS fields

Each partner/client should support:

- logo
- name
- optional URL
- order
- isVisible
- optional featured flag

### UI direction

Use a quiet logo strip.

Do not make logos visually loud.

Prefer grayscale or low-contrast treatment unless brand rules require color.

## 8. Final CTA

### Purpose

End with a clear business action.

### Arabic content direction

Title:

- هل تعمل على مبادرة تحتاج إلى تنسيق منظومي؟

Supporting copy:

- دعنا نساعدك في تحويل الرؤية إلى إطار عمل واضح، قابل للتنفيذ، ومصمم للأثر.

CTA:

- ابدأ المحادثة

### English content direction

Title:

- Working on an initiative that needs systemic coordination?

Supporting copy:

- Let us help you turn your vision into a clear, actionable, and impact-driven framework.

CTA:

- Start the Conversation

### UI direction

Strong but calm.

Use deep petrol background with white text and orange CTA.

## Homepage CMS Content Shape

Recommended `PageTranslation.sections` JSON shape for the homepage:

```json
{
  "hero": {
    "headline": "",
    "subheadline": "",
    "primaryCtaLabel": "",
    "primaryCtaHref": "",
    "secondaryCtaLabel": "",
    "secondaryCtaHref": ""
  },
  "philosophy": {
    "title": "",
    "body": ""
  },
  "methodology": {
    "title": "",
    "body": "",
    "steps": [
      {
        "title": "",
        "description": ""
      }
    ]
  },
  "finalCta": {
    "title": "",
    "body": "",
    "ctaLabel": "",
    "ctaHref": ""
  }
}
```

Do not store service, sector, project, and partner lists only inside the homepage JSON if they need independent CRUD management.

Use relations or queries from their own tables.

## UI Quality Requirements

The homepage must be:

- premium
- modern
- interactive
- mobile-first
- fast
- accessible
- SEO-friendly
- Arabic-first
- visually aligned with the logo
- suitable for strategic consulting and government-facing audiences

Use Tailwind CSS.

Prefer Server Components.

Use Client Components only for:

- mobile navigation
- controlled forms
- small interactive UI
- animation wrappers where necessary

Do not make the entire homepage a Client Component.

## Animation Rules

Allowed:

- subtle reveal on scroll
- card hover interactions
- soft pattern movement
- minimal Framer Motion usage if installed
- CSS-based interactions when possible

Avoid:

- heavy animation
- long page-blocking animations
- excessive parallax
- distracting transitions
- anything that harms Core Web Vitals

## Output Expectations

When using this skill, the agent should produce:

1. Homepage section plan
2. Arabic and English content fields
3. CMS mapping
4. Component structure
5. Tailwind UI direction
6. Files to create/update
7. Implementation for the current phase only

Do not implement unrelated admin modules unless the current phase explicitly asks for them.
