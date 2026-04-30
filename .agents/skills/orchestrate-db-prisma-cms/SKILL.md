---
name: orchestrate-db-prisma-cms
description: Use when designing or implementing Prisma, PostgreSQL, migrations, seed data, CMS models, and content translation tables for Orchestrate.
---

# Orchestrate Database and CMS Skill

## Goal

Create a robust PostgreSQL + Prisma schema for a bilingual custom CMS.

## Database principles

PostgreSQL is local on the Contabo VPS. Prisma must only run server-side. Never import Prisma in client components. Use migrations and seed data. Use translation tables for multilingual content. Keep slugs stable and unique. Arabic content is default and required.

## Core models

Recommended models: User, Page, PageTranslation, Service, ServiceTranslation, Sector, SectorTranslation, Project, ProjectTranslation, Partner, PartnerTranslation or localized optional fields, TeamMember, TeamMemberTranslation, SiteSetting, TranslationKey, ContactMessage, Media, optional ActivityLog.

## Enums

Use `Locale { ar en }` and `UserRole { SUPER_ADMIN ADMIN }`.

## Translation pattern

Use entities plus translation tables, for example `Service` + `ServiceTranslation` with `@@unique([serviceId, locale])`.

## UI translation dictionary

Use a model like `TranslationKey` with `key`, `group`, `ar`, `en`, timestamps.

Seed keys for nav, buttons, form labels, contact success/error, footer rights, loading, empty, and search.

## Page keys

Seed pages: home, about, services, projects, contact.

## Safety

Never delete content permanently without considering publish flags. Validate unique slugs. Add indexes where list/filter pages need them. Keep project details SEO-friendly.
