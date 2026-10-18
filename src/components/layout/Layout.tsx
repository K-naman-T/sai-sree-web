import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/**
 * Scrolls to the top on a route change, or to the anchor when the route carries
 * one (e.g. /services#civil). Without the anchor branch, every hash link on the
 * site would land at the top of the page: a control that goes nowhere.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const overHero = pathname === "/";

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-5 focus:py-3 focus:font-body focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <SiteHeader overHero={overHero} />
      <main id="main" className={cn("flex-1", !overHero && "pt-[68px]")}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
