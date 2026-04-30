# Orchestrate Innovation — AI Agent Pack

This pack is designed for Claude Code, Codex, Cursor, or any coding agent that can read project instructions.

## Included

- `AGENTS.md` — root project guidance for any coding agent.
- `MASTER_PROMPT.md` — strong Arabic prompt to start the implementation session.
- `PHASE_PROMPTS.md` — ready-to-copy prompts for phase-by-phase execution.
- `skills/*/SKILL.md` — specialized skills for different parts of the project.

## Recommended usage

1. Copy `AGENTS.md` into the root of the repository.
2. Copy the `skills/` directory into the agent skills location supported by your tool, or keep it inside the repo and explicitly mention the skill path in your prompt.
3. Start with `MASTER_PROMPT.md`.
4. Do not ask the agent to implement the whole system at once.
5. Use `PHASE_PROMPTS.md` one phase at a time.

## Locked project stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL local on Contabo VPS managed through Plesk
- Custom Admin Dashboard
- Arabic default + English secondary
- Dynamic Translation Panel
- SUPER_ADMIN / ADMIN role system
- Local uploads by default, Cloudinary only if explicitly requested
- SMTP for emails
- Plesk Node.js hosting + Plesk Let’s Encrypt SSL

## Core rule

This is not a static website and not a Sanity/WordPress CMS.
It is a custom full-stack bilingual corporate website with a custom CMS.

## Phase 2 database setup

Prisma is configured for MySQL through `prisma.config.ts`. Use `.env.local` for local development values and copy `.env.production.example` to `.env.production` on the VPS. Prisma commands load `.env.local` first, then `.env`.

Useful commands:

```bash
npm run db:validate
npm run db:generate
npm run db:migrate
npm run db:seed
```

The seed creates one `SUPER_ADMIN`, baseline page records, shared UI translation keys, starter sectors, starter services, one featured project, and core public site settings. Override the local seed admin credentials with `SEED_SUPER_ADMIN_EMAIL` and `SEED_SUPER_ADMIN_PASSWORD` before seeding any shared environment.
