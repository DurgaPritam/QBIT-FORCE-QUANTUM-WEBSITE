import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  computeBentoGridLayout,
  defaultBentoGridSize,
  defaultBentoSpanConfig,
  type BentoSpanConfig,
} from "../utils/bentoGridLayout";
import { easeOut } from "../utils/motion";

/** Port of Framer Marketplace BentoGallery — bento grid with lightbox */
export type BentoGalleryImage = {
  src: string;
  alt: string;
};

type BentoGalleryProps = {
  images: BentoGalleryImage[];
  gridColumns?: number;
  gridRows?: number;
  gap?: number;
  borderRadius?: number;
  enableSpanning?: boolean;
  spanConfig?: BentoSpanConfig[];
  enableLightbox?: boolean;
  grayscaleOnHover?: boolean;
  className?: string;
  minHeight?: number;
};

export default function BentoGallery({
  images,
  gridColumns: gridColumnsProp,
  gridRows: gridRowsProp,
  gap = 8,
  borderRadius = 16,
  enableSpanning = true,
  spanConfig: spanConfigProp,
  enableLightbox = true,
  grayscaleOnHover = false,
  className = "",
  minHeight = 520,
}: BentoGalleryProps) {
  const gridSize = defaultBentoGridSize();
  const gridColumns = gridColumnsProp ?? gridSize.columns;
  const gridRows = gridRowsProp ?? gridSize.rows;
  const spanConfig = spanConfigProp ?? defaultBentoSpanConfig();

  const gridLayout = useMemo(
    () => computeBentoGridLayout(gridColumns, gridRows, images.length, enableSpanning, spanConfig),
    [gridColumns, gridRows, images.length, enableSpanning, spanConfig],
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback(
    (imageIndex: number) => {
      if (!enableLightbox || imageIndex < 0 || imageIndex >= images.length) return;
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    },
    [enableLightbox, images.length],
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (images.length === 0) return;
      setLightboxIndex((prev) => (prev + direction + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigate(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigate(-1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, closeLightbox, navigate]);

  const activeImage = images[lightboxIndex];

  return (
    <>
      <div
        className={`w-full overflow-hidden rounded-3xl bg-white ${className}`}
        style={{ minHeight, borderRadius }}
      >
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`,
            gap: `${gap}px`,
            padding: `${gap}px`,
            minHeight,
          }}
        >
          {gridLayout.map((cell, index) => {
            if (cell.imageIndex === null) return null;

            const image = images[cell.imageIndex];
            if (!image) return null;

            const innerRadius = Math.max(0, borderRadius - gap);

            return (
              <motion.button
                key={`${cell.imageIndex}-${index}`}
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(cell.imageIndex!)}
                className="group relative h-full w-full cursor-pointer overflow-hidden border-none bg-slate-100 p-0"
                style={{
                  gridColumn: `${cell.gridColumn} / span ${cell.colSpan}`,
                  gridRow: `${cell.gridRow} / span ${cell.rowSpan}`,
                  borderRadius: innerRadius,
                }}
                aria-label={`View ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-300 ${
                    grayscaleOnHover ? "grayscale-0 group-hover:grayscale" : "group-hover:scale-[1.03]"
                  }`}
                />
                <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {enableLightbox &&
        lightboxOpen &&
        activeImage &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000]"
              role="dialog"
              aria-modal="true"
              aria-label={activeImage.alt}
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-hidden
                onClick={closeLightbox}
              />

              <button
                type="button"
                className="absolute right-4 top-4 z-[2002] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-navy shadow-md transition hover:bg-petal hover:text-white sm:right-6 sm:top-6"
                onClick={closeLightbox}
                aria-label="Close"
              >
                ×
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(-1);
                    }}
                    className="absolute left-4 top-1/2 z-[2002] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-petal hover:text-white sm:left-6"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(1);
                    }}
                    className="absolute right-4 top-1/2 z-[2002] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-petal hover:text-white sm:right-6"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="pointer-events-none fixed left-1/2 top-1/2 z-[2001] max-h-[85vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2">
                <motion.img
                  key={activeImage.src}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="pointer-events-auto block max-h-[85vh] w-auto max-w-[90vw] rounded-2xl border border-navy/25 object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
