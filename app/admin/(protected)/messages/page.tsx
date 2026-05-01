import Link from "next/link";

import {
  archiveMessageAction,
  markMessageReadAction,
  markMessageUnreadAction,
} from "@/app/admin/(protected)/messages/actions";
import { AdminPageHeading, CmsNotice } from "@/components/admin/cms-fields";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { MessageStatus } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type MessageFilter = "all" | "unread" | "read" | "archived";

type AdminMessagesPageProps = {
  searchParams: Promise<{
    status?: string;
    updated?: string;
    error?: string;
  }>;
};

const filters: Array<{ label: string; value: MessageFilter; status?: MessageStatus }> = [
  { label: "الكل", value: "all" },
  { label: "غير مقروءة", value: "unread", status: MessageStatus.UNREAD },
  { label: "مقروءة", value: "read", status: MessageStatus.READ },
  { label: "مؤرشفة", value: "archived", status: MessageStatus.ARCHIVED },
];

const statusLabels: Record<MessageStatus, string> = {
  [MessageStatus.UNREAD]: "غير مقروءة",
  [MessageStatus.READ]: "مقروءة",
  [MessageStatus.ARCHIVED]: "مؤرشفة",
};

const statusTone: Record<MessageStatus, "petrol" | "orange" | "turquoise"> = {
  [MessageStatus.UNREAD]: "orange",
  [MessageStatus.READ]: "turquoise",
  [MessageStatus.ARCHIVED]: "petrol",
};

function safeFilter(value?: string): MessageFilter {
  return value === "unread" || value === "read" || value === "archived" ? value : "all";
}

function filterHref(filter: MessageFilter) {
  return filter === "all" ? "/admin/messages" : `/admin/messages?status=${filter}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function MetaItem({ label, value, dir }: { label: string; value?: string | null; dir?: "ltr" | "rtl" }) {
  if (!value) {
    return null;
  }

  return (
    <div className="rounded-md border border-petrol/10 bg-soft px-4 py-3">
      <p className="text-xs font-semibold text-petrol/50">{label}</p>
      <p className="mt-1 wrap-break-word text-sm font-semibold text-petrol" dir={dir}>
        {value}
      </p>
    </div>
  );
}

function MessageActionFields({ id, status }: { id: string; status: MessageFilter }) {
  return (
    <>
      <input name="id" type="hidden" value={id} />
      <input name="status" type="hidden" value={status} />
    </>
  );
}

export default async function AdminMessagesPage({ searchParams }: AdminMessagesPageProps) {
  const { status, updated, error } = await searchParams;
  const selectedFilter = safeFilter(status);
  const selectedStatus = filters.find((filter) => filter.value === selectedFilter)?.status;

  const [messages, allCount, unreadCount, readCount, archivedCount] = await Promise.all([
    prisma.contactMessage.findMany({
      where: selectedStatus ? { status: selectedStatus } : {},
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: MessageStatus.UNREAD } }),
    prisma.contactMessage.count({ where: { status: MessageStatus.READ } }),
    prisma.contactMessage.count({ where: { status: MessageStatus.ARCHIVED } }),
  ]);

  const counts: Record<MessageFilter, number> = {
    all: allCount,
    unread: unreadCount,
    read: readCount,
    archived: archivedCount,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeading
        count={messages.length}
        description="متابعة رسائل نموذج التواصل المحفوظة، وقراءة تفاصيل المرسل، وتحديث حالة الرسالة داخل لوحة الإدارة."
        label="رسائل التواصل"
        title="الرسائل"
      />

      {updated ? <CmsNotice message="تم تحديث حالة الرسالة." /> : null}
      {error ? <CmsNotice message="تعذر تنفيذ الإجراء المطلوب." tone="error" /> : null}

      <Card className="p-4">
        <nav aria-label="تصفية الرسائل" className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter.value === selectedFilter;

            return (
              <Link
                className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition ${
                  isActive
                    ? "border-petrol bg-petrol text-white [&_span]:text-white"
                    : "border-petrol/10 bg-white text-petrol hover:border-orange/35 hover:text-orange"
                }`}
                href={filterHref(filter.value)}
                key={filter.value}
              >
                <span>{filter.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-white/15 text-white" : "bg-soft text-petrol/60"}`}>
                  {counts[filter.value]}
                </span>
              </Link>
            );
          })}
        </nav>
      </Card>

      {messages.length === 0 ? (
        <EmptyState
          description="لا توجد رسائل ضمن هذا التصنيف حالياً. عند إرسال نموذج التواصل من الموقع ستظهر الرسائل هنا."
          title="لا توجد رسائل"
        />
      ) : (
        <section className="space-y-4">
          {messages.map((message) => (
            <Card className="transition hover:border-orange/30" key={message.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone={statusTone[message.status]}>{statusLabels[message.status]}</Badge>
                    <p className="text-sm font-semibold text-petrol/50">{formatDate(message.createdAt)}</p>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-petrol">{message.subject}</h3>
                  <p className="mt-2 text-sm font-semibold text-petrol/70">{message.name}</p>
                </div>

                <form className="flex flex-wrap gap-2">
                  <MessageActionFields id={message.id} status={selectedFilter} />
                  {message.status !== MessageStatus.READ ? (
                    <button
                      className="min-h-10 rounded-md bg-petrol px-4 text-sm font-semibold text-white transition hover:bg-[#123238]"
                      formAction={markMessageReadAction}
                      type="submit"
                    >
                      تعليم كمقروءة
                    </button>
                  ) : null}
                  {message.status !== MessageStatus.UNREAD ? (
                    <button
                      className="min-h-10 rounded-md border border-petrol/15 bg-white px-4 text-sm font-semibold text-petrol transition hover:border-orange/35 hover:text-orange"
                      formAction={markMessageUnreadAction}
                      type="submit"
                    >
                      إعادة كغير مقروءة
                    </button>
                  ) : null}
                  {message.status !== MessageStatus.ARCHIVED ? (
                    <button
                      className="min-h-10 rounded-md border border-orange/25 bg-orange/10 px-4 text-sm font-semibold text-orange transition hover:bg-orange hover:text-white"
                      formAction={archiveMessageAction}
                      type="submit"
                    >
                      أرشفة
                    </button>
                  ) : null}
                </form>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <MetaItem dir="ltr" label="البريد الإلكتروني" value={message.email} />
                <MetaItem label="الجهة" value={message.company} />
                <MetaItem dir="ltr" label="رقم الجوال" value={message.phone} />
              </div>

              <div className="mt-6 rounded-lg border border-petrol/10 bg-white px-5 py-4">
                <p className="whitespace-pre-wrap text-sm leading-8 text-petrol/75">{message.message}</p>
              </div>

              {message.userAgent ? (
                <p className="mt-4 wrap-break-word text-xs leading-6 text-petrol/45" dir="ltr">
                  {message.userAgent}
                </p>
              ) : null}
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
