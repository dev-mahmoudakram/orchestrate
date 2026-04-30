---
name: orchestrate-i18n-translation-panel
description: Use when implementing bilingual routes, RTL/LTR layout, database-driven UI labels, translation panel, locale helpers, hreflang foundations, or multilingual CMS forms.
---

# Orchestrate I18n and Translation Panel Skill

## Goal

Build a dynamic bilingual system with Arabic as default and English as secondary.

## Routing

Arabic default: `/`, `/about`, `/services`, `/projects`, `/projects/[slug]`, `/contact`.
English: `/en`, `/en/about`, `/en/services`, `/en/projects`, `/en/projects/[slug]`, `/en/contact`.

## Direction

Arabic uses `lang="ar" dir="rtl"`. English uses `lang="en" dir="ltr"`.

## Content translation

All CMS content must support Arabic and English through translation tables.

## UI translation

Do not hardcode public repeated labels. Create Translation Panel for nav, buttons, forms, messages, footer, and repeated labels.

## Admin Translation Panel

Must support listing keys, filtering by group, search, editing Arabic/English values, showing missing English values, and creating keys if needed.

## Helper

Implement a helper similar to `t(key, locale)` with fallback: locale value -> Arabic -> key.

## CMS form UX

For bilingual content forms, use tabs: العربية and English.

## Slugs

Prefer one stable English slug for both locales at first.
