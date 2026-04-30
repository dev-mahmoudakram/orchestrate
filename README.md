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
- PostgreSQL local on Contabo VPS managed through Plesk
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
