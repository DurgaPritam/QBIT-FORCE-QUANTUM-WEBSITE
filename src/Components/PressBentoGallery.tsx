import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaImage } from "../content/mediaHub";
import { easeOut, fadeUp, springSnappy, stagger, viewportTight } from "../utils/motion";

type PressBentoGalleryProps = {
  items: MediaImage[];
  className?: string;
};

function PressLightboxContent({ item }: { item: MediaImage }) {
  return (
    <div className="flex max-h-[90vh] w-[min(92vw,680px)] flex-col overflow-hidden rounded-2xl border border-navy/25 bg-white shadow-2xl">
      <div className="flex shrink-0 items-center justify-center bg-[#f7f5f2] p-4 sm:p-8">
        <img
          src={item.imageUrl}
          alt=""
          className="max-h-[min(58vh,560px)] w-auto max-w-full object-contain"
        />
      </div>
      <div className="overflow-y-auto p-6 sm:p-8">
        <span className="font-display text-[0.625rem] font-bold uppercase tracking-wider text-petal">
          Press & Media
        </span>
        <h2 className="mt-2 font-display text-xl font-bold leading-snug text-navy sm:text-2xl">{item.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">{item.caption}</p>
      </div>
    </div>
  );
}

function PressCard({ item, onOpen }: { item: MediaImage; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={springSnappy}
      onClick={onOpen}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-shadow hover:border-navy/15 hover:shadow-lg"
      aria-label={`View ${item.title}`}
    >
      <div className="flex min-h-[260px] items-center justify-center bg-[#f7f5f2] p-4 sm:min-h-[320px] sm:p-5">
        <img
          src={item.imageUrl}
          alt=""
          loading="lazy"
          draggable={false}
          className="max-h-[420px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="font-display text-[0.625rem] font-bold uppercase tracking-wider text-petal">
          Press
        </span>
        <h3 className="mt-2 font-display text-base font-bold leading-snug text-navy sm:text-lg">{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">{item.caption}</p>
      </div>
    </motion.button>
  );
}

export default function PressBentoGallery({ items, className = "" }: PressBentoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      setLightboxIndex(index);
      setLightboxOpen(true);
    },
    [items.length],
  );

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (items.length === 0) return;
      setLightboxIndex((prev) => (prev + direction + items.length) % items.length);
    },
    [items.length],
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

  const activeItem = items[lightboxIndex];

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportTight}
        variants={stagger}
        className={`grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${className}`}
      >
        {items.map((item, index) => (
          <PressCard key={item.id} item={item} onOpen={() => openLightbox(index)} />
        ))}
      </motion.div>

      {lightboxOpen &&
        activeItem &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000]"
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title}
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

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(-1);
                    }}
                    className="absolute left-4 top-1/2 z-[2002] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-petal hover:text-white sm:left-6"
                    aria-label="Previous item"
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
                    aria-label="Next item"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="pointer-events-none fixed left-1/2 top-1/2 z-[2001] max-w-[95vw] -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PressLightboxContent item={activeItem} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
