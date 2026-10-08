import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
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
