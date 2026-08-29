import { Database } from "lucide-react";

/** Bandeau du MODE APERÇU : visible tant que PostgreSQL n'est pas connecté. */
export function OfflineBanner(): JSX.Element {
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10">
      <div className="container flex items-center gap-2.5 py-2">
        <Database className="h-3.5 w-3.5 shrink-0 text-amber-500" />
        <p className="font-mono text-2xs text-amber-600 dark:text-amber-400">
          mode aperçu — base non connectée, données de démonstration.
          Renseigne DATABASE_URL puis lance pnpm db:push &amp;&amp; pnpm db:seed.
        </p>
      </div>
    </div>
  );
}
