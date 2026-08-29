import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { auth } from "@/lib/auth";

export const metadata = { title: "Connexion admin" };

export default async function LoginPage(): Promise<JSX.Element> {
  const session = await auth();
  if (session?.user) redirect("/admin/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center bg-dot-grid px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <p className="label-mono">portfolio / admin</p>
          <h1 className="mt-1 font-mono text-xl font-semibold tracking-tight terminal-caret">
            auth
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accès réservé. Compte unique créé par le seed.
          </p>
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
