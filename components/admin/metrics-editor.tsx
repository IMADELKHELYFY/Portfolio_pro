"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type MetricEntry = { label: string; value: string };

type MetricsEditorProps = {
  value: MetricEntry[];
  onChange: (next: MetricEntry[]) => void;
};

/** Métriques chiffrées affichées en tête de la page projet (6 max). */
export function MetricsEditor({
  value,
  onChange,
}: MetricsEditorProps): JSX.Element {
  function update(index: number, patch: Partial<MetricEntry>): void {
    onChange(value.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  }

  return (
    <div className="flex flex-col gap-2">
      {value.map((metric, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            aria-label={`Libellé métrique ${index + 1}`}
            placeholder="Volume / jour"
            value={metric.label}
            onChange={(event) => update(index, { label: event.target.value })}
          />
          <Input
            aria-label={`Valeur métrique ${index + 1}`}
            placeholder="4,2 M lignes"
            value={metric.value}
            onChange={(event) => update(index, { value: event.target.value })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Retirer la métrique"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {value.length < 6 ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => onChange([...value, { label: "", value: "" }])}
        >
          <Plus className="h-3.5 w-3.5" />
          Ajouter une métrique
        </Button>
      ) : null}
    </div>
  );
}
