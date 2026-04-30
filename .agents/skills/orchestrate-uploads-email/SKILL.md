---
name: orchestrate-uploads-email
description: Use when implementing local file uploads, media management, image fields, contact form storage, SMTP email sending, spam protection, and message handling.
---

# Orchestrate Uploads and Email Skill

## Upload goal

Support image/media uploads for CMS content while targeting Plesk/VPS deployment.

## Default storage

Default to local VPS storage. Do not default to Cloudinary unless explicitly requested.

## Local upload rules

Validate file type and size. Generate safe file names. Do not trust original file names. Store image path/URL in database. Keep upload paths stable across deployments. Document folder permissions for Plesk. Avoid storing uploaded files inside a folder that is wiped by deploy.

Recommended conceptual path: `/var/www/vhosts/<domain>/uploads/orchestrate/` or another stable Plesk-friendly location.

## Media model

Use a Media model if needed: id, url/path, filename, mimeType, size, altAr, altEn, createdAt.

## Contact form

Fields: name, company, email, phone optional, subject, message.

Required: server-side validation, save message to database, send email via SMTP, translated success/error messages, basic spam protection such as honeypot.

## SMTP variables

SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL.

## Admin messages

Implement list, details, read/unread, date sorting, optional archive/delete later.
