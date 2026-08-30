/**
 * SQLite n'a ni liste scalaire ni type Json : `techStack` et `metrics` sont
 * stockés en JSON sérialisé. Ces helpers font la conversion dans les deux sens
 * et restent valides si l'on repasse le provider en PostgreSQL.
 */

/** "[\"Python\",\"dbt\"]" -> ["Python", "dbt"] */
export function parseStringArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function stringifyStringArray(values: string[]): string {
  return JSON.stringify(values);
}

/** "{\"Volume\":\"4,2 M\"}" -> { Volume: "4,2 M" } */
export function parseStringRecord(raw: string | null): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const record: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value !== null && value !== undefined) record[key] = String(value);
    }
    return record;
  } catch {
    return {};
  }
}

export function stringifyStringRecord(record: Record<string, string>): string {
  return JSON.stringify(record);
}
