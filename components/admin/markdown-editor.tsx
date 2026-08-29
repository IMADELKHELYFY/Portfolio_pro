"use client";

import { Bold, Code, Eye, Heading2, Italic, Link2, List, Pencil } from "lucide-react";
import { useRef, useState } from "react";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type MarkdownEditorProps = {
  id?: string;
  value: string;
  onChange: (next: string) => void;
};

type Tool = {
  icon: typeof Bold;
  label: string;
  before: string;
  after: string;
  placeholder: string;
};

const tools: Tool[] = [
  { icon: Heading2, label: "Titre", before: "## ", after: "", placeholder: "Titre" },
  { icon: Bold, label: "Gras", before: "**", after: "**", placeholder: "gras" },
  { icon: Italic, label: "Italique", before: "_", after: "_", placeholder: "italique" },
  { icon: List, label: "Liste", before: "- ", after: "", placeholder: "élément" },
  { icon: Code, label: "Code", before: "`", after: "`", placeholder: "code" },
  { icon: Link2, label: "Lien", before: "[", after: "](https://)", placeholder: "texte" },
];

/** Éditeur markdown minimal : barre d'insertion + aperçu rendu. */
export function MarkdownEditor({
  id,
  value,
  onChange,
}: MarkdownEditorProps): JSX.Element {
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function applyTool(tool: Tool): void {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || tool.placeholder;
    const next =
      value.slice(0, start) + tool.before + selected + tool.after + value.slice(end);

    onChange(next);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + tool.before.length;
      textarea.setSelectionRange(cursor, cursor + selected.length);
    });
  }

  return (
    <div className="rounded-sm border border-input">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface px-1.5 py-1.5">
        {tools.map((tool) => (
          <Button
            key={tool.label}
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            aria-label={tool.label}
            title={tool.label}
            disabled={preview}
            onClick={() => applyTool(tool)}
          >
            <tool.icon className="h-3.5 w-3.5" />
          </Button>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn("ml-auto h-7", preview && "text-primary")}
          onClick={() => setPreview((current) => !current)}
        >
          {preview ? <Pencil className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {preview ? "Éditer" : "Aperçu"}
        </Button>
      </div>

      {preview ? (
        <div className="prose-data min-h-[260px] px-4 py-3 text-sm">
          {value.trim() ? (
            <Markdown content={value} />
          ) : (
            <p className="font-mono text-2xs text-muted-foreground">
              rien à prévisualiser
            </p>
          )}
        </div>
      ) : (
        <Textarea
          id={id}
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={"## Contexte\n\nDécris le problème, la méthode, le résultat."}
          className="min-h-[260px] rounded-none border-0 focus-visible:ring-0"
        />
      )}
    </div>
  );
}
