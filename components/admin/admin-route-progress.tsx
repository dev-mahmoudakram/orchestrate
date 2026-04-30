"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const minimumVisibleMs = 700;

export function AdminRouteProgress() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useMemo(() => searchParams.toString(), [searchParams]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const startedAtRef = useRef(0);

  function startLoading() {
    startedAtRef.current = Date.now();
    setIsLoading(true);
  }

  function finishLoading() {
    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(minimumVisibleMs - elapsed, 0);

    window.setTimeout(() => {
      setIsLoading(false);
    }, remaining);
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a");

      if (!link?.href || link.target || link.hasAttribute("download")) {
        return;
      }

      const targetUrl = new URL(link.href);
      const currentUrl = new URL(window.location.href);
      const isSameOrigin = targetUrl.origin === currentUrl.origin;
      const isAdminRoute = targetUrl.pathname.startsWith("/admin");
      const isSameDestination =
        targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search;

      if (isSameOrigin && isAdminRoute && !isSameDestination) {
        event.preventDefault();
        startLoading();
        startTransition(() => {
          router.push(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
        });
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    finishLoading();
  }, [pathname, search]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isLoading]);

  if (!isLoading && !isPending) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-2 overflow-hidden bg-orange/15">
      <div className="admin-route-progress-bar h-full bg-orange shadow-[0_0_16px_rgba(232,119,34,0.55)]" />
    </div>
  );
}
