import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { brandBy, brandName, navItems } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function SiteHeader({ overHero = false }: { overHero?: boolean }) {
  const scrolled = useScrolled(48);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent = overHero && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        transparent ? "border-transparent bg-transparent" : "border-hairline bg-paper",
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between gap-6 px-[clamp(18px,5vw,28px)]">
        <Link
          to="/"
          className={cn(
            "flex min-h-[44px] flex-col justify-center gap-[3px] transition-colors sm:gap-[4px]",
            transparent
              ? "text-cream [text-shadow:0_1px_3px_rgba(18,14,10,0.65)]"
              : "text-ink hover:text-terracotta",
          )}
        >
          <span className="font-mark text-[1.05rem] uppercase leading-none tracking-[0.3em] sm:text-[1.18rem]">
            {brandName}
          </span>
          <span
            className={cn(
              "font-body text-[10px] font-semibold uppercase leading-none tracking-[0.15em]",
              transparent ? "text-cream/90" : "text-ink/80",
            )}
          >
            - by {brandBy}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative flex h-11 items-center px-4 font-body text-[14px] font-medium transition-colors",
                      "after:absolute after:inset-x-4 after:bottom-[9px] after:h-[2px] after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-200",
                      transparent ? "text-cream/85 hover:text-cream" : "text-ink hover:text-terracotta",
                      isActive &&
                        (transparent
                          ? "text-cream after:scale-x-100 after:bg-cream"
                          : "text-terracotta after:scale-x-100"),
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={cn(
            "flex h-11 w-11 items-center justify-center md:hidden",
            transparent ? "text-cream" : "text-ink",
          )}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-hairline bg-paper text-ink md:hidden">
          <ul className="mx-auto w-full max-w-[1400px] px-[clamp(18px,5vw,28px)] py-1">
            {navItems.map((item) => (
              <li key={item.to} className="border-b border-hairline last:border-b-0">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-[54px] items-center font-display text-xl",
                      isActive ? "text-terracotta" : "text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
