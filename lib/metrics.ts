import type { Prisma } from "@prisma/client";

export type Metric = { label: string; value: string };

/** Normalise le champ Json `metrics` en liste ordonnée { label, value }. */
export function parseMetrics(value: Prisma.JsonValue | null): Metric[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }

  return Object.entries(value)
    .filter(([, raw]) => raw !== null && raw !== undefined)
    .map(([label, raw]) => ({ label, value: String(raw) }))
    .slice(0, 6);
}
