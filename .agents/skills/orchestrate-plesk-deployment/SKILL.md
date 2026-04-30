---
name: orchestrate-plesk-deployment
description: Use when preparing or documenting deployment for Contabo VPS with Plesk, local PostgreSQL, Node.js hosting, environment variables, migrations, uploads, SSL, and production checks.
---

# Orchestrate Plesk Deployment Skill

## Goal

Prepare the project for deployment on a Contabo VPS managed through Plesk.

## Assumptions

Plesk manages the domain and SSL using Let’s Encrypt. PostgreSQL is local on the VPS. Node.js is preferably managed by Plesk Node.js extension. Do not assume Vercel. Do not require PM2, Nginx manual config, Apache manual config, or Certbot unless the owner explicitly switches to manual SSH deployment.

## Required deployment docs

Create/update deployment docs covering: Plesk domain setup, Node.js app setup, environment variables, PostgreSQL database creation, Prisma migration command, seed command, upload folder path/permissions, SMTP configuration, SSL via Plesk Let’s Encrypt, production build command, restart app steps, and troubleshooting checklist.

## Suggested package scripts

Use scripts compatible with Plesk:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

## Environment variables

Document DATABASE_URL, AUTH_SECRET/NEXTAUTH_SECRET, site URL, SMTP variables, CONTACT_TO_EMAIL, UPLOAD_DIR, and NEXT_PUBLIC_SITE_URL.

## Production checks

Before deployment is done: install works, prisma generate works, migrate deploy works, build works, start works, Arabic home loads, `/en` loads, login works, contact form works, users page is protected, uploads work, and SSL works from Plesk.
