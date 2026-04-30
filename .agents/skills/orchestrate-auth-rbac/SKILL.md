---
name: orchestrate-auth-rbac
description: Use when implementing admin login, sessions, route protection, users management, permissions, SUPER_ADMIN/ADMIN roles, and admin security.
---

# Orchestrate Auth and RBAC Skill

## Goal

Implement secure admin authentication and role-based access control.

## Roles

SUPER_ADMIN can access all admin modules, create/edit/deactivate users, change roles, manage settings, manage all content, and view contact messages.

ADMIN can manage content and messages but cannot access users management, create/edit/delete users, change roles, or grant SUPER_ADMIN access.

## Auth requirements

Use secure password hashing. Protect admin routes. Inactive users cannot log in. Login errors must not reveal whether email exists. Never store plain text passwords. Never expose session secrets to client bundles. Admin layout must validate session before rendering protected content.

## Suggested helpers

Create helpers such as `requireAdmin()`, `requireSuperAdmin()`, `getCurrentUser()`, `canManageUsers(user)`, and `canManageContent(user)`.

## UI rules

Admin nav should hide unauthorized modules. Users page must be visible only for SUPER_ADMIN. Forms should have loading, success, and error states.

## Seed

Initial seed must create one SUPER_ADMIN. Use environment variables for initial admin credentials or clearly documented seed defaults for local development only.
