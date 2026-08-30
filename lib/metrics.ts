import { parseStringRecord } from "@/lib/serialize";

export type Metric = { label: string; value: string };

/** Normalise le champ `metrics` (JSON sérialisé) en liste { label, value }. */
export function parseMetrics(raw: string | null): Metric[] {
  return Object.entries(parseStringRecord(raw))
    .map(([label, value]) => ({ label, value }))
    .slice(0, 6);
}
