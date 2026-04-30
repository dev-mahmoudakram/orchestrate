"use client";

import { type ReactNode, useId, useState } from "react";

type LocaleTabsProps = {
  ar: ReactNode;
  en: ReactNode;
};

export function LocaleTabs({ ar, en }: LocaleTabsProps) {
  const id = useId();
  const [activeLocale, setActiveLocale] = useState<"ar" | "en">("ar");

  return (
    <div className="rounded-lg border border-petrol/10 bg-soft-gray/50 p-3">
      <div aria-label="Content language" className="inline-flex rounded-md border border-petrol/10 bg-white p-1" role="tablist">
        <button
          aria-controls={`${id}-ar-panel`}
          aria-selected={activeLocale === "ar"}
          className={`min-h-9 rounded px-4 text-sm font-semibold transition ${
            activeLocale === "ar" ? "bg-petrol text-white" : "text-petrol/65 hover:text-petrol"
          }`}
          id={`${id}-ar-tab`}
          onClick={() => setActiveLocale("ar")}
          role="tab"
          type="button"
        >
          Arabic
        </button>
        <button
          aria-controls={`${id}-en-panel`}
          aria-selected={activeLocale === "en"}
          className={`min-h-9 rounded px-4 text-sm font-semibold transition ${
            activeLocale === "en" ? "bg-petrol text-white" : "text-petrol/65 hover:text-petrol"
          }`}
          id={`${id}-en-tab`}
          onClick={() => setActiveLocale("en")}
          role="tab"
          type="button"
        >
          English
        </button>
      </div>

      <div
        aria-labelledby={`${id}-ar-tab`}
        className="mt-4"
        hidden={activeLocale !== "ar"}
        id={`${id}-ar-panel`}
        role="tabpanel"
      >
        {ar}
      </div>
      <div
        aria-labelledby={`${id}-en-tab`}
        className="mt-4"
        dir="ltr"
        hidden={activeLocale !== "en"}
        id={`${id}-en-panel`}
        role="tabpanel"
      >
        {en}
      </div>
    </div>
  );
}
