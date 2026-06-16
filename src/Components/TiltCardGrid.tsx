import { useCallback, useRef, type MouseEvent } from "react";
import LazyImage from "./LazyImage";

/** Port of Framer Marketplace "Tilt Card Grid" — 3D tilt with inertia hover */
const MAX_TILT_X = 14;
const MAX_TILT_Y = 18;
const LERP_FACTOR = 0.18;
const SETTLE_EPSILON = 0.05;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export type TiltCardItem = {
  image: string;
  imageAlt: string;
  title: string;
  description?: string;
  subtitle?: string;
  /** Tailwind aspect class for the photo area, e.g. aspect-[4/5] or aspect-square */
  imageAspect?: string;
  descriptionLines?: number;
};

type TiltCard3DProps = TiltCardItem;

function TiltCard3D({
  image,
  imageAlt,
  title,
  description,
  subtitle,
  imageAspect = "aspect-[4/5]",
  descriptionLines,
}: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const applyTransform = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { x, y } = tiltRef.current;
    el.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg)`;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;

    const tick = () => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;

      tiltRef.current = {
        x: lerp(tiltRef.current.x, tx, LERP_FACTOR),
        y: lerp(tiltRef.current.y, ty, LERP_FACTOR),
      };
      applyTransform();

      const settled =
        Math.abs(tiltRef.current.x - tx) < SETTLE_EPSILON &&
        Math.abs(tiltRef.current.y - ty) < SETTLE_EPSILON;

      if (!settled || hoveringRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [applyTransform]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const py = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      targetRef.current = { x: py * MAX_TILT_X, y: px * MAX_TILT_Y };
      startLoop();
    },
    [startLoop],
  );

  const handleMouseEnter = useCallback(() => {
    hoveringRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveringRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    startLoop();
  }, [startLoop]);

  return (
    <div
      ref={ref}
      role="article"
      aria-label={title}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex h-full w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,1,127,0.1)] transition-shadow duration-200 hover:shadow-[0_16px_48px_rgba(0,1,127,0.16)]"
    >
      <div className={`relative w-full shrink-0 overflow-hidden bg-slate-100 ${imageAspect}`}>
        <LazyImage
          src={image}
          alt={imageAlt}
          draggable={false}
          optimizeWidth={640}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-start gap-1.5 border-t border-border/40 bg-white p-4 sm:p-5">
        {subtitle && (
          <span className="font-display text-[0.625rem] font-bold uppercase tracking-widest text-petal sm:text-[0.6875rem]">
            {subtitle}
          </span>
        )}
        <h3 className="font-display text-sm font-semibold leading-snug tracking-tight text-navy sm:text-base">
          {title}
        </h3>
        {description && (
          <p
            className="text-xs leading-relaxed text-text-muted sm:text-sm"
            style={
              descriptionLines
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: descriptionLines,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : undefined
            }
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

type TiltCardGridProps = {
  items: TiltCardItem[];
  className?: string;
  gap?: number;
};

export default function TiltCardGrid({
  items,
  className = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  gap = 24,
}: TiltCardGridProps) {
  return (
    <div className={`grid w-full items-stretch ${className}`} style={{ gap }}>
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="min-w-0">
          <TiltCard3D {...item} />
        </div>
      ))}
    </div>
  );
}
