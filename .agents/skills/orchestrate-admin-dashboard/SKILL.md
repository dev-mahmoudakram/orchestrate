---
name: orchestrate-admin-dashboard
description: Use when building the custom admin dashboard UI, CRUD pages, forms, tables, content management UX, and admin interaction patterns.
---

# Orchestrate Admin Dashboard Skill

## Goal

Build a clean, modern, Arabic-friendly admin dashboard for managing the custom CMS.

## Dashboard tone

Professional, fast, clear, not overdesigned, comfortable for non-technical users, RTL-first but English-capable.

## Modules

Dashboard overview, Pages, Services, Projects, Sectors, Partners, Team, Messages, Translations, Settings, Users for SUPER_ADMIN only.

## CRUD UX requirements

Each module should support list, create, edit, delete or soft delete, publish/unpublish, sort order, search/filter where useful, Arabic/English tabs, image selection/upload, SEO fields, validation errors, and loading/success/error states.

## Forms

Use structured forms:
1. General: slug, order, publish status, image/media, relations.
2. Arabic: title, description, body, SEO fields.
3. English: title, description, body, SEO fields.

## Users

Only SUPER_ADMIN can access users. User fields: name, email, role, isActive, lastLoginAt, createdAt. Prefer deactivate over unsafe deletion.

## Messages

Contact messages should support list, read/unread, details, date, sender info, subject/message, optional archive/delete later.

## UI primitives

Create AdminShell, Sidebar, Topbar, DataTable, FormSection, LocaleTabs, StatusBadge, ConfirmDialog, ImageInput, SubmitButton, EmptyState.

## Rule

Do not build admin screens as disconnected prototypes. Connect them to the final Prisma/server-action architecture.
