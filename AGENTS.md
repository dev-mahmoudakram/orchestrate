# AGENTS.md — Orchestrate Innovation Website

## Project identity

Build a premium corporate website and custom CMS for **Orchestrate Innovation / تناغم الابتكار**.

The brand is a strategic/systemic consultancy serving B2B, government entities, large institutions, and social-impact sectors. The visual tone must be premium, calm, official, modern, interactive, and trustworthy.

Do not make the UI look like:
- a generic SaaS startup,
- an ecommerce website,
- a noisy creative agency,
- a childish animated landing page,
- a basic template dashboard.

The design must fit a high-end consulting firm and should use the visual idea of orchestration, harmony, vertical waves/columns, and structured systems.

## Required stack

Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- PostgreSQL local on the Contabo VPS, normally managed through Plesk
- Custom Admin Dashboard
- Auth for Admin Login
- Role-based access control: SUPER_ADMIN / ADMIN
- Arabic default language
- English secondary language
- Dynamic translation panel for UI labels and repeated text
- Local uploads by default
- SMTP email sending
- Deployment target: Plesk Panel on Contabo VPS

Do not use unless explicitly requested:
- Sanity
- WordPress
- Webflow
- Framer
- Supabase/Neon/Prisma Postgres hosted DB
- Vercel deployment
- Static export only
- A hardcoded translation-only setup

## Branding

Use this palette:
- Petrol / Deep teal: `#0F3D44`
- Orange accent: `#E87722`
- Turquoise secondary: `#6BBFB5`
- White: `#FFFFFF`
- Soft gray: `#F7F7F6`

Typography direction:
- Arabic: IBM Plex Sans Arabic preferred
- Arabic fallback: Cairo or Noto Sans Arabic
- English: Inter or Manrope

UI direction:
- Arabic must be RTL.
- English must be LTR.
- Arabic is the default public route.
- Use premium spacing, large breathing room, clean grids, subtle motion, refined cards, excellent mobile UX.

## Routing

Arabic default:
- `/`
- `/about`
- `/services`
- `/projects`
- `/projects/[slug]`
- `/contact`

English secondary:
- `/en`
- `/en/about`
- `/en/services`
- `/en/projects`
- `/en/projects/[slug]`
- `/en/contact`

Admin:
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

Only SUPER_ADMIN can access `/admin/users`.

## Internationalization and CMS rules

All client-editable content must be stored in the database and support Arabic and English.

Do not hardcode client-editable labels such as nav labels, button text, form labels, success/error messages, footer labels, section labels, or repeated UI labels.

Use a translation/dictionary table for general UI labels:
- `nav.home`
- `nav.about`
- `button.contact`
- `form.name`
- `message.success`
- `footer.rights`

For content entities, use translation tables, not duplicated fields when possible:
- `Service` + `ServiceTranslation`
- `Project` + `ProjectTranslation`
- `Sector` + `SectorTranslation`
- `Page` + `PageTranslation`

Arabic content is required. English content can be optional in early seed data, but UI should support both.

## Public website pages

Implement:
1. Home: Hero, Philosophy strip, Sectors, Services preview, Featured case studies, Methodology, Partners strip, Final CTA.
2. About: Story, Philosophy/problem, Values, Leadership/team.
3. Services: Service cards and CMS content.
4. Projects: Cards, sector filtering, featured marker, project details with challenge, approach, results.
5. Contact: Contact form, contact information, social links, optional map fields.

## Admin dashboard modules

Build:
- Login
- Dashboard overview
- Pages content manager
- Services CRUD
- Projects CRUD
- Sectors CRUD
- Partners CRUD
- Team CRUD
- Contact messages list/read state
- Dynamic translations panel
- Site settings
- Users management for SUPER_ADMIN only

Each CRUD screen should support create, edit, delete or soft delete, publish/unpublish, sort order, Arabic/English tabs, image upload when relevant, and SEO fields when relevant.

## Auth and permissions

Use a secure password hash such as bcrypt/argon2.

SUPER_ADMIN:
- full access
- can create/edit/deactivate users
- can manage settings and all content

ADMIN:
- can manage content and messages
- cannot manage users
- cannot change roles

Protect all admin routes. Never expose Prisma or secret server code to client components.

## Data and Prisma rules

- Prisma access must happen only on the server.
- Never import Prisma client inside a `"use client"` component.
- Use server actions or route handlers for mutations.
- Validate server inputs.
- Keep slugs stable and unique.
- Prefer a single English slug for both languages unless explicitly changed.

## UI implementation rules

Use Tailwind CSS.

Default to Server Components. Use Client Components only for menus, forms, filters, modals, upload widgets, toasts, dashboard interactivity, and animation triggers.

Use modern interaction patterns: subtle hover states, animated nav/menu, refined card transitions, tasteful reveal animations, accessible focus states, and clear loading/empty/error states.

Do not overanimate. Performance and elegance matter more than visual noise.

## Performance and SEO

- Use dynamic metadata per locale.
- Generate sitemap and robots.
- Add alternate language links / hreflang.
- Optimize images.
- Avoid shipping heavy JS to public pages.
- Keep public pages mostly server-rendered.
- Do not turn the whole app into client components.

## Deployment target

Target Plesk on Contabo VPS.

Assume Plesk handles domain and SSL/Let’s Encrypt, Plesk may run the Node.js application, and PostgreSQL is local on the VPS.

Do not require PM2/Certbot unless the project owner explicitly decides to switch to SSH/manual deployment.

## Working process for agents

Before coding any major area:
1. Inspect the current repository.
2. Report what exists.
3. Propose a phase plan.
4. Implement only the requested phase.
5. Keep changes scoped.
6. After implementation, report files changed, what was implemented, how to test, risks/notes, and next recommended phase.

Do not implement all phases in one run unless explicitly asked.
