# PHASE PROMPTS — Orchestrate Innovation

Use these prompts one at a time.

---

## Phase 0 — Repository Audit and Implementation Plan

Analyze the repository for the Orchestrate Innovation project.

Read `AGENTS.md` and all available skill files.

Do not code yet unless a small safe setup fix is required.

Return:
1. Current architecture summary
2. Existing packages and gaps
3. Risks
4. Proposed folder structure
5. Database model plan
6. Admin dashboard module plan
7. Public website page plan
8. Phase-by-phase implementation roadmap
9. Exact Phase 1 scope

Remember: Next.js App Router, TypeScript, Tailwind, Prisma, PostgreSQL, Arabic default, English secondary, Dynamic Translation Panel, Plesk/VPS target.

---

## Phase 1 — Project Foundation

Implement the foundation only.

Scope:
- verify Next.js App Router structure
- configure Tailwind theme with Orchestrate colors
- create base layout with Arabic default direction
- create locale utilities
- create route groups: public and admin
- create basic reusable UI primitives
- add global design tokens
- add placeholder public pages
- add placeholder admin layout/login page

Do not implement full CRUD yet. Do not implement the full database yet except setup files if needed.

After finishing, report files changed and how to run.

---

## Phase 2 — Prisma Database Schema and Seed

Implement Prisma and PostgreSQL structure.

Scope:
- Prisma schema
- Locale enum
- User and roles
- pages + translations
- services + translations
- projects + translations
- sectors + translations
- partners + translations if needed
- team members + translations
- site settings
- translation keys
- contact messages
- media/uploads model if needed
- seed script with one SUPER_ADMIN, base translation keys, initial page records, sample services/sectors/projects placeholders

Do not build the full UI CRUD yet. Add safe documentation for environment variables.

---

## Phase 3 — Auth and RBAC

Implement admin authentication and authorization.

Scope:
- secure admin login
- hashed passwords
- session handling
- route protection
- SUPER_ADMIN and ADMIN permissions
- middleware or layout guards
- admin nav filtered by role
- users page accessible only to SUPER_ADMIN
- prevent inactive users from logging in

Do not implement all CRUD screens in this phase.

---

## Phase 4 — Translation Panel

Implement the dynamic translation system.

Scope:
- translation key CRUD/list/edit
- groups/filter/search
- server function to load translations by locale
- fallback behavior: English missing -> Arabic -> key
- helper function `t(key, locale)`
- connect public navigation/buttons/footer labels to database translations
- admin interface for editing UI labels

Do not hardcode public UI labels except initial seeds and keys.

---

## Phase 5 — Admin CMS Core CRUD

Implement admin CMS CRUD modules.

Scope:
- pages manager with Arabic/English tabs
- services CRUD
- sectors CRUD
- projects CRUD
- partners CRUD
- team members CRUD
- publish/unpublish
- sort order
- SEO fields
- image field placeholders or upload integration hooks

Every content form must support Arabic and English.

---

## Phase 6 — Public Website UI

Implement the public website with premium modern interactive UI.

Scope:
- Home page sections: Hero, Philosophy, Sectors, Services preview, Featured projects, Methodology, Partners, CTA
- About page
- Services page
- Projects page + filters
- Project details page
- Contact page
- Arabic RTL and English LTR
- premium Tailwind design
- subtle animations and interactions
- responsive mobile-first layout

Keep public pages mostly server-rendered.

---

## Phase 7 — Uploads and Media

Implement local uploads suitable for Plesk/VPS.

Scope:
- upload route/server action
- validation of file type and size
- store files in a safe upload directory
- save media URL/path in database
- expose images correctly through app/static route or configured public serving
- reusable image picker in admin forms
- document server folder permissions for Plesk

Cloudinary is not the default. Use it only if explicitly requested.

---

## Phase 8 — Contact Form and Messages

Implement contact workflow.

Scope:
- public contact form
- server-side validation
- spam protection placeholder or simple honeypot
- save message to database
- send email via SMTP
- admin messages list
- read/unread status
- message details page/modal
- success/error translations via Translation Panel

---

## Phase 9 — SEO, Sitemap, Robots, Hreflang

Implement SEO for bilingual content.

Scope:
- dynamic metadata by locale
- SEO fields from CMS
- Open Graph images
- sitemap
- robots
- canonical URLs
- alternate language links / hreflang
- 404 page with translated content

---

## Phase 10 — Plesk Deployment Preparation

Prepare deployment for Plesk/Contabo VPS.

Scope:
- production build check
- environment variables documentation
- Prisma migrate deploy instructions
- seed instructions
- Plesk Node.js notes
- PostgreSQL local notes
- upload folder notes
- SMTP notes
- SSL handled by Plesk Let’s Encrypt
- do not require PM2/Certbot unless switching to manual SSH deployment

Return a deployment checklist.
