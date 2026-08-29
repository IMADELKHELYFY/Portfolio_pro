"use client";

import { FileUp, Loader2, Paperclip, X } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";

export type FileEntry = { url: string; filename: string; fileType: string };

type FileManagerProps = {
  value: FileEntry[];
  onChange: (next: FileEntry[]) => void;
};

const ACCEPT = ".pdf,.xlsx,.pptx,.zip";

/** Fichiers téléchargeables attachés au projet (pdf / xlsx / pptx / zip). */
export function FileManager({ value, onChange }: FileManagerProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("projectFile", {
    onClientUploadComplete: (uploaded) => {
      const added = uploaded
        .map((file) => ({
          url: file.serverData.url,
          filename: file.serverData.name,
          fileType: file.serverData.type,
        }))
        .filter((file) => !value.some((existing) => existing.url === file.url));
      onChange([...value, ...added]);
      toast({
        title: "Fichiers ajoutés",
        description: `${added.length} fichier(s) téléversé(s).`,
        variant: "success",
      });
    },
    onUploadError: (error) => {
      toast({
        title: "Échec du téléversement",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          hidden
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            if (files.length > 0) void startUpload(files);
            event.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FileUp className="h-3.5 w-3.5" />
          )}
          {isUploading ? "Téléversement…" : "Ajouter des fichiers"}
        </Button>
        <span className="font-mono text-2xs text-muted-foreground">
          pdf · xlsx · pptx · zip — 16 Mo max
        </span>
      </div>

      {value.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border px-3 py-6 text-center font-mono text-2xs text-muted-foreground">
          aucun fichier
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {value.map((file, index) => (
            <li
              key={file.url}
              className="flex items-center gap-3 rounded-sm border border-border bg-surface px-3 py-2"
            >
              <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate font-mono text-xs">
                {file.filename}
              </span>
              <span className="shrink-0 font-mono text-2xs text-muted-foreground">
                {file.fileType.split("/").pop()}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Retirer ${file.filename}`}
                onClick={() => onChange(value.filter((_, i) => i !== index))}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
