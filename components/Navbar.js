"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/PlanContext";

const links = [
  { href: "/#library", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-wide uppercase">
            FitLog
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive =
              link.href === "/my-plan"
                ? pathname === "/my-plan"
                : pathname === "/";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-surface-2 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground"
          >
            Plan
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-foreground">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground"
          >
            Saved
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1 text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      <nav className="md:hidden flex items-center gap-1 border-t border-border px-4 py-2">
        {links.map((link) => {
          const isActive =
            link.href === "/my-plan" ? pathname === "/my-plan" : pathname === "/";
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                isActive ? "bg-surface-2 text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}