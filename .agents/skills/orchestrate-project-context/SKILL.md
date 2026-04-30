---
name: orchestrate-project-context
description: Use for any task related to the Orchestrate Innovation website. It defines the locked stack, brand direction, bilingual rules, CMS scope, deployment target, and non-negotiable project constraints.
---

# Orchestrate Project Context Skill

## When to use

Use this skill before making architecture, UI, database, CMS, auth, i18n, or deployment decisions for the Orchestrate Innovation project.

## Project summary

Build a premium full-stack corporate website with custom CMS for Orchestrate Innovation / تناغم الابتكار.

The client is a strategic/systemic consultancy serving B2B, government entities, institutions, and social-impact sectors.

The website must look premium, official, modern, interactive, polished, and trustworthy.

## Locked stack

Use Next.js App Router, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL local on Contabo VPS, Plesk Panel deployment, Custom Admin Dashboard, Auth and RBAC, Arabic default + English secondary, Dynamic Translation Panel, SMTP for emails, and Local uploads by default.

Do not use Sanity, WordPress, Vercel, Supabase/Neon hosted DB, static-only translations, generic template CMS, or over-animated UI unless explicitly requested.

## Visual identity

Use the Orchestrate palette: `#0F3D44`, `#E87722`, `#6BBFB5`, `#FFFFFF`, `#F7F7F6`.

Preferred fonts: IBM Plex Sans Arabic, Cairo/Noto Sans Arabic fallback, Inter/Manrope for English.

## Language rules

Arabic is default:
- `/` means Arabic home.
- `/en` means English home.

Set Arabic as `dir="rtl" lang="ar"` and English as `dir="ltr" lang="en"`.

## CMS rules

Every client-editable content item must be editable from the admin dashboard and support Arabic/English.

Use translation tables for content entities and a dictionary/translation-key model for UI labels.

## Admin rules

Roles: SUPER_ADMIN and ADMIN.

SUPER_ADMIN manages users and all content. ADMIN manages content only and cannot manage users or roles.

## Process

Before coding: inspect repo, identify current state, propose a plan, implement only requested phase, and report changed files/testing/next phase.
