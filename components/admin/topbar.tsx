import { logoutAction } from "@/app/admin/actions";
import type { CurrentAdminUser } from "@/lib/auth/auth";

type TopbarProps = {
  user: CurrentAdminUser;
};

export function Topbar({ user }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-petrol/10 bg-soft/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-orange">Protected admin</p>
          <h1 className="text-xl font-semibold text-petrol">Admin workspace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-petrol/10 bg-white px-4 py-2 text-sm text-petrol/70">
            {user.name} - {user.role.replace("_", " ")}
          </div>
          <form action={logoutAction}>
            <button
              className="inline-flex min-h-10 items-center rounded-md border border-petrol/15 bg-white px-4 text-sm font-semibold text-petrol transition hover:border-orange hover:text-orange"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
