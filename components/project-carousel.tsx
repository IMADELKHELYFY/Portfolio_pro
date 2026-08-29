"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CarouselImage = { url: string; alt: string | null };

/** Carousel d'images du projet : flèches, compteur et vignettes. */
export function ProjectCarousel({
  images,
}: {
  images: CarouselImage[];
}): JSX.Element | null {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const current = images[index];
  const go = (step: number): void =>
    setIndex((value) => (value + step + images.length) % images.length);

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-border bg-surface">
        <Image
          key={current.url}
          src={current.url}
          alt={current.alt ?? ""}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 780px"
          className="object-contain"
        />

        {images.length > 1 ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Image précédente"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 border border-border bg-background/80 backdrop-blur"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Image suivante"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 border border-border bg-background/80 backdrop-blur"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <span className="absolute bottom-2 right-2 rounded-sm border border-border bg-background/80 px-1.5 py-0.5 font-mono text-2xs backdrop-blur">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Voir l'image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-12 w-16 overflow-hidden rounded-sm border transition-colors",
                i === index
                  ? "border-primary"
                  : "border-border opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      {current.alt ? (
        <figcaption className="font-mono text-2xs text-muted-foreground">
          {current.alt}
        </figcaption>
      ) : null}
    </figure>
  );
}
