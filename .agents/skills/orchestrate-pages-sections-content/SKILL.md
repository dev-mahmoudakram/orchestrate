---
name: orchestrate-pages-sections-content
description: Use this skill when planning, writing, structuring, or implementing all Orchestrate Innovation website pages, page sections, bilingual content structure, CMS fields, page-level SEO, and admin-editable content architecture.
---

# Orchestrate Pages, Sections, and Content Skill

## Purpose

Use this skill to define and implement the complete website page structure for Orchestrate Innovation.

This includes:

- public pages
- page sections
- bilingual Arabic/English content
- CMS-editable page data
- SEO fields
- content hierarchy
- admin dashboard content requirements

The website is a bilingual corporate website with a custom CMS.

It is not a static website.

It is not WordPress.

It is not Sanity.

## Core Website Routes

Arabic is the default language.

Arabic routes:

- `/`
- `/about`
- `/services`
- `/projects`
- `/projects/[slug]`
- `/contact`

English routes:

- `/en`
- `/en/about`
- `/en/services`
- `/en/projects`
- `/en/projects/[slug]`
- `/en/contact`

Required special pages:

- `/404` or custom `not-found.tsx`
- admin login
- admin dashboard

Admin routes:

- `/admin/login`
- `/admin/dashboard`
- `/admin/pages`
- `/admin/services`
- `/admin/projects`
- `/admin/sectors`
- `/admin/partners`
- `/admin/team`
- `/admin/messages`
- `/admin/translations`
- `/admin/settings`
- `/admin/users`

The `/admin/users` page is for `SUPER_ADMIN` only.

## Language and Direction Rules

Arabic:

- default language
- route does not require `/ar`
- `lang="ar"`
- `dir="rtl"`

English:

- secondary language
- route starts with `/en`
- `lang="en"`
- `dir="ltr"`

All public pages must render according to the active locale.

Use Arabic content as the primary reference.

English content should be professionally written, not literal weak translation.

## Global Layout Sections

Every public page should share:

1. Header
2. Mobile navigation
3. Footer
4. Final CTA where appropriate
5. SEO metadata
6. Structured navigation labels from dynamic translations

## Header Content

Header must include:

- Logo
- Navigation links
- Language switcher
- Primary CTA
- Mobile menu

Navigation labels must come from `TranslationKey`, not hardcoded static text only.

Required translation keys:

- `nav.home`
- `nav.about`
- `nav.services`
- `nav.projects`
- `nav.contact`
- `nav.cta`
- `nav.language_ar`
- `nav.language_en`

## Footer Content

Footer must include:

- logo
- short company description
- quick links
- contact info
- social links
- copyright text

Footer labels should be editable through translations or settings.

Recommended editable sources:

- `SiteSetting`
- `TranslationKey`

Required translation keys:

- `footer.quick_links`
- `footer.contact`
- `footer.rights`
- `footer.social`
- `footer.company_description`

## Page 1: Home Page

Use the separate skill:

- `$orchestrate-landing-page-content`

The homepage key should be:

- `Page.key = "home"`

Sections:

1. Hero
2. Philosophy Strip
3. Sectors
4. Services Preview
5. Methodology
6. Featured Projects
7. Partners
8. Final CTA

## Page 2: About Page

### Purpose

Tell the company story, explain its philosophy, and build trust.

### Suggested sections

1. Page Hero
2. Company Story
3. Philosophy / Problem We Solve
4. Values and Principles
5. Leadership Team
6. Institutional CTA

### Arabic content direction

Page title:

- من نحن

Possible hero headline:

- ننسّق عناصر المنظومة لصناعة أثر استراتيجي مستدام

Possible intro:

- تناغم الابتكار شركة استشارية تعمل على تصميم حلول استراتيجية تربط بين الرؤية، أصحاب المصلحة، والاحتياجات الوطنية ضمن إطار منظومي واضح.

### English content direction

Page title:

- About Us

Possible hero headline:

- We orchestrate ecosystem elements to create sustainable strategic impact

Possible intro:

- Orchestrate Innovation is a strategic consultancy that designs systemic solutions connecting vision, stakeholders, and national priorities within clear and actionable frameworks.

### CMS fields

For `Page.key = "about"`:

Localized fields:

- title
- slug
- heroHeadline
- heroSubheadline
- storyTitle
- storyBody
- philosophyTitle
- philosophyBody
- valuesTitle
- valuesBody or values array
- finalCtaTitle
- finalCtaBody
- finalCtaLabel
- SEO title
- SEO description
- OG image

Team members should be managed from `TeamMember` and `TeamMemberTranslation`.

## Page 3: Services Page

### Purpose

Explain the services in detail.

### Suggested sections

1. Page Hero
2. Services Grid
3. Service Detail Blocks
4. Methodology Connection
5. CTA

### Arabic page title

- خدماتنا

### English page title

- Services

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

### CMS fields

Each service:

Non-localized:

- id
- slug
- icon
- image
- order
- isPublished

Localized through `ServiceTranslation`:

- title
- shortDescription
- fullDescription
- seoTitle
- seoDescription

### UI direction

Use premium cards and structured service blocks.

The design must feel professional and consultative.

Avoid generic icon-card layouts that look like a cheap template.

## Page 4: Projects / Case Studies Page

### Purpose

Display case studies and credibility.

### Routes

Arabic:

- `/projects`
- `/projects/[slug]`

English:

- `/en/projects`
- `/en/projects/[slug]`

### Listing page sections

1. Page Hero
2. Sector Filters
3. Projects Grid
4. CTA

### Detail page sections

1. Project Hero
2. Project Overview
3. Challenge
4. Systemic Approach
5. Results / Impact
6. Gallery
7. Related Projects
8. CTA

### Arabic labels

- المشاريع
- دراسة حالة
- التحدي
- النهج المنظومي
- النتائج المحققة
- القطاع
- عرض دراسة الحالة

### English labels

- Projects
- Case Study
- Challenge
- Systemic Approach
- Results Achieved
- Sector
- View Case Study

### CMS fields

Project non-localized:

- slug
- sectorId
- coverImage
- gallery
- order
- isFeatured
- isPublished

Project localized through `ProjectTranslation`:

- title
- summary
- challenge
- approach
- results
- seoTitle
- seoDescription
- ogImage

Use one stable English slug for both Arabic and English unless the project explicitly requires localized slugs.

Recommended:

- `/projects/national-family-strategy`
- `/en/projects/national-family-strategy`

## Page 5: Contact Page

### Purpose

Allow potential clients and partners to communicate.

### Suggested sections

1. Page Hero
2. Contact Form
3. Contact Information
4. Social Links
5. Optional Map
6. Final CTA or reassurance message

### Arabic page title

- تواصل معنا

### English page title

- Contact Us

### Form fields

- name
- organization / company
- email
- phone optional
- subject
- message

### Required translation keys

- `form.name`
- `form.organization`
- `form.email`
- `form.phone`
- `form.subject`
- `form.message`
- `form.submit`
- `form.success`
- `form.error`
- `form.required`

### Contact flow

Contact form should:

1. validate input
2. save message in `ContactMessage`
3. send email using SMTP
4. show localized success/error message

### CMS fields

From `SiteSetting`:

- email
- phone
- address
- map URL
- LinkedIn
- X / Twitter
- footer contact details

From `PageTranslation` for contact page:

- title
- heroHeadline
- heroSubheadline
- formIntro
- seoTitle
- seoDescription

## 404 Page

### Purpose

Provide a branded error page.

### Arabic content

Title:

- الصفحة غير موجودة

CTA:

- العودة للرئيسية

### English content

Title:

- Page Not Found

CTA:

- Back to Home

Use dynamic translation keys for common labels.

## Admin Page Content Management

The admin dashboard must allow editing:

### Pages

For each page:

- Arabic content tab
- English content tab
- SEO fields per language
- OG image
- publish status if needed

Recommended page keys:

- `home`
- `about`
- `services`
- `projects`
- `contact`

### Content Modules

The admin must manage:

- services
- projects
- sectors
- partners
- team members
- messages
- translations
- settings
- users

## Translation Panel

Do not rely only on static JSON translation files.

The admin dashboard must include a Translation Panel for repeated UI labels.

Recommended model:

```prisma
model TranslationKey {
  id        String   @id @default(cuid())
  key       String   @unique
  group     String?
  ar        String
  en        String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Examples:

```txt
nav.home
nav.about
nav.services
nav.projects
nav.contact
button.read_more
button.view_details
button.contact_us
form.name
form.email
form.message
form.submit
message.success
message.error
footer.rights
```

## Prisma Translation Pattern

Use translation tables instead of duplicating fields inside the same model.

Good:

```txt
Service
ServiceTranslation
```

Avoid:

```txt
titleAr
titleEn
descriptionAr
descriptionEn
```

unless there is a very strong reason.

Recommended models:

- `Page`
- `PageTranslation`
- `Service`
- `ServiceTranslation`
- `Project`
- `ProjectTranslation`
- `Sector`
- `SectorTranslation`
- `Partner`
- `PartnerTranslation` if needed
- `TeamMember`
- `TeamMemberTranslation`
- `SiteSetting`
- `TranslationKey`
- `ContactMessage`
- `User`
- `Media`

## SEO Requirements Per Page

Each page and dynamic project/service should support:

- localized meta title
- localized meta description
- OG image
- canonical URL
- alternate hreflang links

Arabic is canonical for default route.

English route must point to `/en`.

Example:

- Arabic: `/about`
- English: `/en/about`

## UI/UX Requirements

The website UI must be:

- modern
- premium
- interactive
- clean
- spacious
- mobile-first
- Arabic-first
- suitable for strategic consultancy
- suitable for B2B and government clients

Use Tailwind CSS.

Use the brand colors consistently.

Do not overuse orange.

Use orange mainly for:

- CTAs
- important highlights
- active states
- small accents

Use petrol blue for:

- headers
- premium dark sections
- text emphasis
- footer
- strong institutional presence

Use turquoise for:

- secondary accents
- soft highlights
- supporting visuals

## Component Planning

Recommended public components:

```txt
components/public/Header.tsx
components/public/Footer.tsx
components/public/LanguageSwitcher.tsx
components/public/MobileMenu.tsx
components/public/PageHero.tsx
components/public/SectionHeading.tsx
components/public/CTASection.tsx
components/public/ServiceCard.tsx
components/public/SectorCard.tsx
components/public/ProjectCard.tsx
components/public/PartnerStrip.tsx
```

Recommended page components:

```txt
components/public/home/HeroSection.tsx
components/public/home/PhilosophySection.tsx
components/public/home/SectorsSection.tsx
components/public/home/ServicesPreview.tsx
components/public/home/MethodologySection.tsx
components/public/home/FeaturedProjects.tsx

components/public/about/AboutStory.tsx
components/public/about/ValuesSection.tsx
components/public/about/TeamSection.tsx

components/public/services/ServicesGrid.tsx
components/public/services/ServiceDetailBlock.tsx

components/public/projects/ProjectsGrid.tsx
components/public/projects/ProjectFilters.tsx
components/public/projects/ProjectDetailContent.tsx

components/public/contact/ContactForm.tsx
components/public/contact/ContactInfo.tsx
```

## Implementation Rules

- Do not make everything a Client Component.
- Prisma must only be used server-side.
- Use Server Components for data fetching where possible.
- Use Client Components only for forms, filters, menus, and interactive UI.
- Keep the UI fast and accessible.
- Do not add unnecessary heavy dependencies.
- Do not implement all pages in one step unless explicitly requested.
- Work phase by phase.

## Output Expectations

When using this skill, the agent should return:

1. Page structure
2. Section structure
3. CMS fields
4. Arabic and English content requirements
5. Prisma mapping
6. Component plan
7. Files to create/update
8. Implementation for the current phase only
9. How to test

Do not move to the next phase without approval.
