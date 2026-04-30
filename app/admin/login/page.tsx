import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-soft px-5 py-12" dir="ltr">
      <Card className="w-full max-w-md">
        <p className="text-sm font-semibold uppercase text-orange">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-petrol">Sign in foundation</h1>
        <p className="mt-4 text-sm leading-7 text-petrol/65">
          Authentication, password validation, and secure sessions are scheduled for Phase 3.
        </p>
        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-petrol">Email</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              disabled
              placeholder="admin@example.com"
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-petrol">Password</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-petrol/15 bg-white px-3 text-petrol outline-none focus:border-orange"
              disabled
              placeholder="Phase 3"
              type="password"
            />
          </label>
          <Button className="w-full" disabled>
            Login available in Phase 3
          </Button>
        </div>
      </Card>
    </main>
  );
}
