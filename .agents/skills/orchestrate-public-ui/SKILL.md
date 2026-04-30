---
name: orchestrate-public-ui
description: Use when designing or implementing the public website UI, Tailwind components, animations, responsive behavior, RTL/LTR polish, and premium consultancy-focused interaction patterns.
---

# Orchestrate Public UI Skill

## Goal

Create a modern, interactive, premium public website suitable for Orchestrate Innovation's client profile.

## UI personality

The site must feel premium, confident, calm, structured, modern, governmental/B2B suitable, and strategic consultancy oriented.

Avoid childish animation, generic SaaS gradients, ecommerce patterns, noisy agency layouts, heavy 3D, too many colors, and unpolished template cards.

## Visual system

Use deep petrol backgrounds, orange accent for priority CTAs/highlights, turquoise for secondary emphasis, soft gray section backgrounds, white premium cards, vertical bars/wave columns inspired by the logo, subtle gradients, large spacing, and refined typography.

## Tailwind rules

Build reusable UI primitives: Container, SectionHeader, Button, Card, Badge, LanguageSwitcher, EmptyState. Use responsive mobile-first design and keep Arabic RTL and English LTR polished.

## Public page sections

Home: Hero, Philosophy, Sectors, Services preview, Featured case studies, Methodology, Partners, CTA.
About: Story, Philosophy/problem, Values, Leadership/team.
Services: Service cards from database.
Projects: Filter by sector, cards, featured projects, details with challenge/approach/results.
Contact: form, info cards, social links, optional map placeholder.

## Interaction

Use subtle hover lift, reveal, animated mobile menu, active nav states, interactive project filters, and form status transitions. Do not add heavy animation libraries unless necessary.

## Performance

Public pages should mostly be Server Components. Client components only for interactivity. Keep JS bundle small and avoid loading admin UI on public pages.
