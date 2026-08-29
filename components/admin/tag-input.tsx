"use client";

import { X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type TagInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  id?: string;
};

/** Saisie de tags : Entrée ou virgule pour valider, Retour arrière pour retirer. */
export function TagInput({
  value,
  onChange,
  placeholder = "Python, dbt, PostgreSQL…",
  id,
}: TagInputProps): JSX.Element {
  const [draft, setDraft] = useState("");

  function commit(raw: string): void {
    const tag = raw.trim().replace(/,+$/, "");
    if (!tag || value.includes(tag) || value.length >= 20) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit(draft);
      return;
    }
    if (event.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        id={id}
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => commit(draft)}
      />
      {value.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <Badge key={tag} className="gap-1 pr-1">
              {tag}
              <button
                type="button"
                aria-label={`Retirer ${tag}`}
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="rounded-sm p-0.5 text-muted-foreground transition hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
