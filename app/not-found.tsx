import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-soft text-petrol" dir="rtl" lang="ar">
      <section className="relative overflow-hidden bg-petrol text-white">
        <div className="absolute inset-0 orchestration-grid opacity-30" aria-hidden="true" />
        <Container className="relative flex min-h-screen items-center py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-turquoise">404</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">الصفحة غير موجودة</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
              الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية ومتابعة التصفح.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/55" dir="ltr">
              Page not found. Return to the homepage to continue.
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 items-center rounded-md bg-orange px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d76719]"
              href="/"
            >
              العودة للرئيسية
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
