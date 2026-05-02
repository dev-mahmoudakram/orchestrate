export const Locale = {
  ar: "ar",
  en: "en",
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];

export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const MessageStatus = {
  UNREAD: "UNREAD",
  READ: "READ",
  ARCHIVED: "ARCHIVED",
} as const;

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];
