import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  className?: string;
  accent?: boolean;
};

/** Carte chiffrée compacte, façon tuile de dashboard. */
export function StatCard({
  label,
  value,
  hint,
  className,
  accent = false,
}: StatCardProps): JSX.Element {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card/60 px-3.5 py-3",
        accent && "border-primary/30",
        className,
      )}
    >
      <p className="label-mono">{label}</p>
      <p
        className={cn(
          "mt-1.5 font-mono text-lg font-semibold leading-none tracking-tight",
          accent && "text-primary",
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1.5 font-mono text-2xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
