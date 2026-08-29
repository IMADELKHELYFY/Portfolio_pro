import { hashString } from "@/lib/utils";

type SparklineProps = {
  /** Graine : même clé -> même dessin, rendu stable entre serveur et client. */
  seed: string;
  /** Le style du bandeau varie selon la catégorie du projet. */
  shape?: "line" | "bars" | "area";
  className?: string;
};

const WIDTH = 320;
const HEIGHT = 56;
const POINTS = 24;

function seriesFrom(seed: string): number[] {
  let state = hashString(seed) || 1;
  const values: number[] = [];
  let level = 0.45;

  for (let i = 0; i < POINTS; i += 1) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const noise = (state / 2147483648 - 0.5) * 0.34;
    level = Math.min(0.94, Math.max(0.08, level + noise + 0.012));
    values.push(level);
  }
  return values;
}

/** Mini-graphique décoratif en SVG pur — pas de librairie de charts. */
export function Sparkline({
  seed,
  shape = "line",
  className,
}: SparklineProps): JSX.Element {
  const values = seriesFrom(seed);
  const step = WIDTH / (POINTS - 1);
  const y = (v: number): number => HEIGHT - v * (HEIGHT - 8) - 4;

  const path = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      {shape === "bars" ? (
        values.map((v, i) => {
          const barWidth = step * 0.55;
          const height = v * (HEIGHT - 8);
          return (
            <rect
              key={i}
              x={i * step - barWidth / 2 + barWidth / 2}
              y={HEIGHT - height - 2}
              width={barWidth}
              height={height}
              className="fill-primary/45"
            />
          );
        })
      ) : (
        <>
          {shape === "area" ? (
            <path
              d={`${path} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`}
              className="fill-primary/12"
            />
          ) : null}
          <path
            d={path}
            fill="none"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="stroke-primary/70"
          />
        </>
      )}
    </svg>
  );
}

/** Associe une forme de sparkline stable à chaque catégorie. */
export function shapeForCategory(slug: string): "line" | "bars" | "area" {
  const shapes = ["line", "bars", "area"] as const;
  return shapes[hashString(slug) % shapes.length];
}
