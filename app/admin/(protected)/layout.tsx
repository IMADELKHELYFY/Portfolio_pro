import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): Promise<JSX.Element> {
  // Le middleware protège déjà /admin/* ; second garde-fou côté rendu.
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link href="/admin/dashboard" className="font-mono text-sm font-semibold tracking-tight">
              <span className="text-primary">$</span> admin
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="hidden font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground sm:block"
            >
              voir le site
            </Link>
            <ThemeToggle />
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  );
}
