import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/login/actions";
import { LoginSubmitButton } from "@/components/admin/login-submit-button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth/auth";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/admin/dashboard");
  }

  const { error } = await searchParams;
  const hasLoginError = error === "invalid";

  return (
    <main className="flex min-h-screen items-center justify-center bg-soft px-5 py-12" dir="ltr">
      <Card className="w-full max-w-md">
        <p className="text-sm font-semibold uppercase text-orange">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-petrol">Sign in</h1>
        <p className="mt-4 text-sm leading-7 text-petrol/65">
          Access the Orchestrate content management workspace.
        </p>

        {hasLoginError ? (
          <p className="mt-6 rounded-md border border-orange/25 bg-orange/10 px-4 py-3 text-sm font-medium text-petrol">
            Invalid email or password.
          </p>
        ) : null}

        <form action={loginAction} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-petrol">Email</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              name="email"
              placeholder="admin@orchestrate.local"
              required
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-petrol">Password</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              name="password"
              placeholder="Your password"
              required
              type="password"
            />
          </label>
          <LoginSubmitButton />
        </form>
      </Card>
    </main>
  );
}
