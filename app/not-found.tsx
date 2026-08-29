import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-dot-grid px-5">
      <div className="text-center">
        <p className="label-mono">erreur</p>
        <h1 className="mt-2 font-mono text-5xl font-semibold tracking-tight">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Button asChild size="sm" className="mt-6">
          <Link href="/">Retour aux projets</Link>
        </Button>
      </div>
    </main>
  );
}
