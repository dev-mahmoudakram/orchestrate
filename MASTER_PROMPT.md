# MASTER PROMPT — Orchestrate Innovation Implementation

You are now acting as a **Senior Full-Stack Engineer + UI/UX Engineer** for the Orchestrate Innovation website project.

Read the entire project repository first, including `AGENTS.md` and any available skills. Then work using a **phased execution approach**.

## Very Important

This project is **not** a static website, **not** Sanity, and **not** WordPress.

This project is:

**A Next.js full-stack bilingual corporate website + custom admin CMS**

## Final Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL hosted locally on the VPS
- Plesk deployment
- Custom Admin Dashboard
- Authentication + Role-based access control
- `SUPER_ADMIN` / `ADMIN`
- Arabic as the default language + English as a secondary language
- Dynamic Translation Panel
- Local uploads by default
- SMTP for contact emails

## Core Requirements

1. The website must support Arabic and English.
2. Arabic is the default language:
   - `/` for Arabic
   - `/en` for English
3. Do not make translation static only.
4. The admin dashboard must include a **Translation Panel** for all shared UI text, including:
   - navigation labels
   - buttons
   - form labels
   - success/error messages
   - footer labels
   - repeated UI labels
5. Every client-editable content item must support Arabic and English.
6. Use Prisma translation tables, such as:
   - `Service` + `ServiceTranslation`
   - `Project` + `ProjectTranslation`
   - `Sector` + `SectorTranslation`
   - `Page` + `PageTranslation`
7. The Admin Dashboard must include:
   - login
   - dashboard
   - pages
   - services
   - projects
   - sectors
   - partners
   - team
   - messages
   - translations
   - settings
   - users
8. The `users` management page must be accessible only by `SUPER_ADMIN`.
9. A regular `ADMIN` can manage content only and must not be able to manage users.
10. The UI must be **modern, interactive, premium, and suitable for a strategic consultancy / government-facing client**.
11. Use the brand colors:
   - Deep petrol blue: `#0F3D44`
   - Orange accent: `#E87722`
   - Turquoise: `#6BBFB5`
   - White: `#FFFFFF`
   - Soft gray: `#F7F7F6`
12. Do not make everything a Client Component.
13. Prisma must be used server-side only.
14. Do not use Vercel, Sanity, WordPress, Supabase, Neon, or any hosted database platform unless explicitly requested.
15. Design with production deployment on a Contabo VPS managed through Plesk in mind.

## What You Need To Do Now

Start by analyzing the current repository. Then provide a detailed implementation plan divided into phases.

Do **not** start writing code immediately unless the current structure is already very clear.

After presenting the plan, implement **Phase 1 only**.

## Required Response Format

Your response must follow this structure:

1. Current repo analysis
2. Missing requirements
3. Proposed architecture
4. Phase-by-phase plan
5. Phase 1 scope
6. Files you will create/update
7. Implementation for Phase 1
8. How to run/test
9. Notes and next phase

## Important Working Rule

Work phase by phase.

Do not move to the next phase until the current phase is completed, summarized, and ready for review.