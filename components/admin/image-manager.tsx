"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";

export type ImageEntry = { url: string; alt: string | null };

type ImageManagerProps = {
  value: ImageEntry[];
  onChange: (next: ImageEntry[]) => void;
};

function SortableImage({
  image,
  index,
  onAlt,
  onRemove,
}: {
  image: ImageEntry;
  index: number;
  onAlt: (alt: string) => void;
  onRemove: () => void;
}): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.url });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-sm border border-border bg-surface p-2 ${
        isDragging ? "z-10 opacity-80" : ""
      }`}
    >
      <button
        type="button"
        className="cursor-grab touch-none rounded-sm p-1 text-muted-foreground hover:text-foreground active:cursor-grabbing"
        aria-label="Réordonner"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-border bg-background">
        <Image
          src={image.url}
          alt={image.alt ?? ""}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <span className="w-6 shrink-0 font-mono text-2xs text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Input
        aria-label="Texte alternatif"
        placeholder="Texte alternatif (accessibilité)"
        value={image.alt ?? ""}
        onChange={(event) => onAlt(event.target.value)}
        className="h-8"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Retirer l'image"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  );
}

/** Téléversement multiple + réordonnancement par glisser-déposer. */
export function ImageManager({ value, onChange }: ImageManagerProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("projectImage", {
    onClientUploadComplete: (uploaded) => {
      const added = uploaded
        .map((file) => ({ url: file.serverData.url, alt: null }))
        .filter((file) => !value.some((existing) => existing.url === file.url));
      onChange([...value, ...added]);
      toast({
        title: "Images ajoutées",
        description: `${added.length} image(s) téléversée(s).`,
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = value.findIndex((image) => image.url === active.id);
    const to = value.findIndex((image) => image.url === over.id);
    if (from === -1 || to === -1) return;
    onChange(arrayMove(value, from, to));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
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
            <ImagePlus className="h-3.5 w-3.5" />
          )}
          {isUploading ? "Téléversement…" : "Ajouter des images"}
        </Button>
        <span className="font-mono text-2xs text-muted-foreground">
          4 Mo max · 10 par envoi · la 1re image sert de couverture
        </span>
      </div>

      {value.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border px-3 py-6 text-center font-mono text-2xs text-muted-foreground">
          aucune image
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((image) => image.url)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-2">
              {value.map((image, index) => (
                <SortableImage
                  key={image.url}
                  image={image}
                  index={index}
                  onAlt={(alt) =>
                    onChange(
                      value.map((item, i) =>
                        i === index ? { ...item, alt: alt || null } : item,
                      ),
                    )
                  }
                  onRemove={() => onChange(value.filter((_, i) => i !== index))}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
