"use client";

import { useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input";
import type { Iti } from "intl-tel-input";

import type { Locale } from "@/types/locale";

type ContactFormLabels = {
  name: string;
  organization: string;
  email: string;
  phoneInput: string;
  subject: string;
  message: string;
  submit: string;
  cta: string;
  contactForm: string;
  hiddenWebsite: string;
  required: string;
  sent: string;
  error: string;
};

type ContactFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  contactState?: "sent" | "error";
  labels: ContactFormLabels;
  locale: Locale;
};

export function ContactForm({ action, contactState, labels, locale }: ContactFormProps) {
  const visiblePhoneRef = useRef<HTMLInputElement>(null);
  const hiddenPhoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const phoneInput = visiblePhoneRef.current;
    const hiddenPhoneInput = hiddenPhoneRef.current;

    if (!phoneInput || !hiddenPhoneInput) {
      return;
    }

    const instance: Iti = intlTelInput(phoneInput, {
      initialCountry: "sa",
      nationalMode: false,
      separateDialCode: true,
      strictMode: true,
    });

    const syncPhoneValue = () => {
      const rawValue = phoneInput.value.trim();
      const digits = rawValue.replace(/[^\d]/g, "");
      const dialCode = instance.getSelectedCountryData()?.dialCode;

      hiddenPhoneInput.value = digits && dialCode ? `+${dialCode}${digits}` : rawValue;
    };

    phoneInput.addEventListener("input", syncPhoneValue);
    phoneInput.addEventListener("countrychange", syncPhoneValue);

    return () => {
      phoneInput.removeEventListener("input", syncPhoneValue);
      phoneInput.removeEventListener("countrychange", syncPhoneValue);
      instance.destroy();
    };
  }, []);

  const isError = contactState === "error";

  return (
    <form action={action} className="rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_18px_55px_rgba(15,61,68,0.07)] sm:p-8">
      <input name="locale" type="hidden" value={locale} />
      <input name="phone" ref={hiddenPhoneRef} type="hidden" />
      <label className="hidden">
        {labels.hiddenWebsite}
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-orange">{labels.contactForm}</p>
          <h2 className="mt-3 text-2xl font-semibold text-petrol">{labels.cta}</h2>
        </div>
      </div>

      {contactState ? (
        <p
          className={`mt-6 rounded-md border px-4 py-3 text-sm font-medium leading-7 ${
            isError ? "border-orange/30 bg-orange/10 text-petrol" : "border-turquoise/40 bg-turquoise/15 text-petrol"
          }`}
        >
          {isError ? labels.error : labels.sent}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-petrol">
          {labels.name}
          <input
            className="min-h-11 rounded-md border border-petrol/15 bg-soft px-3 text-petrol outline-none transition focus:border-orange"
            maxLength={120}
            name="name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-petrol">
          {labels.organization}
          <input
            className="min-h-11 rounded-md border border-petrol/15 bg-soft px-3 text-petrol outline-none transition focus:border-orange"
            maxLength={160}
            name="company"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-petrol">
          {labels.email}
          <input
            className="min-h-11 rounded-md border border-petrol/15 bg-soft px-3 text-petrol outline-none transition focus:border-orange"
            dir="ltr"
            maxLength={160}
            name="email"
            required
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-petrol">
          {labels.phoneInput}
          <input
            className="min-h-11 w-full rounded-md border border-petrol/15 bg-soft px-3 text-petrol outline-none transition focus:border-orange"
            dir="ltr"
            maxLength={40}
            ref={visiblePhoneRef}
            type="tel"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-petrol sm:col-span-2">
          {labels.subject}
          <input
            className="min-h-11 rounded-md border border-petrol/15 bg-soft px-3 text-petrol outline-none transition focus:border-orange"
            maxLength={180}
            name="subject"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-petrol sm:col-span-2">
          {labels.message}
          <textarea
            className="min-h-36 rounded-md border border-petrol/15 bg-soft px-3 py-3 text-petrol outline-none transition focus:border-orange"
            maxLength={2000}
            name="message"
            required
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className="min-h-11 rounded-md bg-orange px-5 text-sm font-semibold text-white transition hover:bg-[#d76719]" type="submit">
          {labels.submit}
        </button>
        <p className="text-xs leading-6 text-petrol/55">{labels.required}</p>
      </div>
    </form>
  );
}
