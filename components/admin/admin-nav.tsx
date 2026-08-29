"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "dashboard" },
  { href: "/admin/projects/new", label: "nouveau" },
  { href: "/admin/categories", label: "catégories" },
  { href: "/admin/comments", label: "commentaires" },
] as const;

export function AdminNav(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-1">
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href === "/admin/dashboard" && pathname.startsWith("/admin/projects/") && !pathname.endsWith("/new"));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-sm px-2.5 py-1.5 font-mono text-2xs uppercase tracking-[0.12em] transition-colors",
              active
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
