import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { companyName, navItems } from "@/data/site";
import { Container } from "@/components/ui/Section";
import { BorderRule } from "@/components/ui/Ornament";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-hairline bg-paper-2">
      <BorderRule />
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-[1.6rem] font-semibold leading-tight">{companyName}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
              Registered name: {companyName}
            </p>
          </div>

          <nav aria-label="Footer" className="w-full md:w-auto">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-1 sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex min-h-[44px] items-center text-[15px] transition-colors hover:text-terracotta",
                        isActive ? "text-terracotta" : "text-ink",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
