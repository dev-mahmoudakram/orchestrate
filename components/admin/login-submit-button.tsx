"use client";

import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-orange px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d76719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "جار تسجيل الدخول..." : "تسجيل الدخول"}
    </button>
  );
}
