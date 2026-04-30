---
name: orchestrate-phase-planner
description: Use when planning or executing the Orchestrate project phase-by-phase. It forces a scoped plan, prevents implementing everything at once, and defines phase boundaries.
---

# Orchestrate Phase Planner Skill

## Goal

Work on this project in controlled phases. Never implement the whole project in one pass unless explicitly requested.

## Required response before implementation

For every major task, produce current state, phase goal, in-scope items, out-of-scope items, files to create/update, risks, implementation checklist, and how to test.

## Phase map

- Phase 0 — Audit and Architecture
- Phase 1 — Foundation
- Phase 2 — Prisma Database and Seed
- Phase 3 — Auth and RBAC
- Phase 4 — Translation Panel
- Phase 5 — Admin CMS CRUD
- Phase 6 — Public Website UI
- Phase 7 — Uploads and Media
- Phase 8 — Contact and Emails
- Phase 9 — SEO
- Phase 10 — Plesk Deployment Prep

## Rules

Finish one phase before moving to another. Do not mix unrelated modules. Do not build temporary shortcuts that conflict with the final architecture. Always leave the repo runnable and report testing instructions.
