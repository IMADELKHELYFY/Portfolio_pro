import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>

      <footer className="border-t border-border">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="font-mono text-2xs text-muted-foreground">
            © {new Date().getFullYear()} — portfolio data
          </p>
          <Link
            href="/admin/login"
            className="font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"
          >
            admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
