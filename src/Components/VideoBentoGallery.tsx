import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { VideoItem } from "../data/videosData";
import {
  computeBentoGridLayout,
  defaultBentoGridSize,
  defaultBentoSpanConfig,
  type BentoSpanConfig,
} from "../utils/bentoGridLayout";
import { easeOut } from "../utils/motion";

/** Port of Framer Video Bento Gallery — dynamic video bento grid with hover preview & lightbox */
type VideoBentoGalleryProps = {
  videos: VideoItem[];
  gridColumns?: number;
  gridRows?: number;
  gap?: number;
  borderRadius?: number;
  enableSpanning?: boolean;
  spanConfig?: BentoSpanConfig[];
  hoverAutoplay?: boolean;
  minHeight?: number;
  className?: string;
};

function PlayIcon() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-petal pl-1 text-lg text-white shadow-lg sm:h-14 sm:w-14 sm:text-xl">
      ▶
    </span>
  );
}

function VideoTile({
  video,
  onOpen,
  hoverAutoplay,
  innerRadius,
}: {
  video: VideoItem;
  onOpen: () => void;
  hoverAutoplay: boolean;
  innerRadius: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canHoverPreview = hoverAutoplay && Boolean(video.src);

  const handleEnter = () => {
    if (!canHoverPreview || !videoRef.current) return;
    videoRef.current.currentTime = 0;
    void videoRef.current.play().catch(() => undefined);
  };

  const handleLeave = () => {
    if (!canHoverPreview || !videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative h-full w-full cursor-pointer overflow-hidden border-none bg-slate-900 p-0"
      style={{ borderRadius: innerRadius }}
      aria-label={`Play ${video.title}`}
    >
      {video.thumbnail && (
        <img
          src={video.thumbnail}
          alt=""
          draggable={false}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            canHoverPreview ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
          }`}
        />
      )}

      {canHoverPreview && video.src && (
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      <div className="absolute inset-0 bg-navy/25 transition-colors duration-300 group-hover:bg-navy/40" />

      <div className="absolute inset-0 flex items-center justify-center opacity-90 transition-opacity group-hover:opacity-100">
        <PlayIcon />
      </div>

      {video.duration && video.duration !== "—" && (
        <span className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-0.5 font-display text-[0.625rem] font-semibold text-white">
          {video.duration}
        </span>
      )}

      {video.youtubeId && (
        <span className="absolute left-3 top-3 rounded-md bg-petal/90 px-2 py-0.5 font-display text-[0.625rem] font-bold uppercase tracking-wider text-white">
          YouTube
        </span>
      )}
    </motion.button>
  );
}

function VideoLightboxPlayer({ video }: { video: VideoItem }) {
  if (video.youtubeId) {
    return (
      <div className="aspect-video w-[min(90vw,960px)] overflow-hidden rounded-2xl bg-black shadow-2xl">
        <iframe
          className="h-full w-full border-0"
          title={video.title}
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (video.src) {
    return (
      <video
        controls
        autoPlay
        playsInline
        poster={video.thumbnail}
        className="max-h-[85vh] w-[min(90vw,960px)] rounded-2xl bg-black shadow-2xl"
      >
        <source src={video.src} type="video/mp4" />
      </video>
    );
  }

  return null;
}

export default function VideoBentoGallery({
  videos,
  gridColumns: gridColumnsProp,
  gridRows: gridRowsProp,
  gap = 10,
  borderRadius = 20,
  enableSpanning = true,
  spanConfig: spanConfigProp,
  hoverAutoplay = true,
  minHeight = 560,
  className = "",
}: VideoBentoGalleryProps) {
  const gridSize = defaultBentoGridSize();
  const gridColumns = gridColumnsProp ?? gridSize.columns;
  const gridRows = gridRowsProp ?? gridSize.rows;
  const spanConfig = spanConfigProp ?? defaultBentoSpanConfig();

  const gridLayout = useMemo(
    () => computeBentoGridLayout(gridColumns, gridRows, videos.length, enableSpanning, spanConfig),
    [gridColumns, gridRows, videos.length, enableSpanning, spanConfig],
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback(
    (index: number) => {
      if (index < 0 || index >= videos.length) return;
      setLightboxIndex(index);
      setLightboxOpen(true);
    },
    [videos.length],
  );

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (videos.length === 0) return;
      setLightboxIndex((prev) => (prev + direction + videos.length) % videos.length);
    },
    [videos.length],
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

  const activeVideo = videos[lightboxIndex];

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
            const video = videos[cell.imageIndex];
            if (!video) return null;

            const innerRadius = Math.max(0, borderRadius - gap);

            return (
              <div
                key={`${video.id}-${index}`}
                className="h-full w-full"
                style={{
                  gridColumn: `${cell.gridColumn} / span ${cell.colSpan}`,
                  gridRow: `${cell.gridRow} / span ${cell.rowSpan}`,
                }}
              >
                <VideoTile
                  video={video}
                  innerRadius={innerRadius}
                  hoverAutoplay={hoverAutoplay}
                  onOpen={() => openLightbox(cell.imageIndex!)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {lightboxOpen &&
        activeVideo &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000]"
              role="dialog"
              aria-modal="true"
              aria-label={activeVideo.title}
            >
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
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

              {videos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(-1);
                    }}
                    className="absolute left-4 top-1/2 z-[2002] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-petal hover:text-white sm:left-6"
                    aria-label="Previous video"
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
                    aria-label="Next video"
                  >
                    ›
                  </button>
                </>
              )}

              <div
                className="pointer-events-none fixed left-1/2 top-1/2 z-[2001] flex max-w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={activeVideo.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="pointer-events-auto"
                >
                  <VideoLightboxPlayer video={activeVideo} />
                </motion.div>
                <p className="pointer-events-none max-w-lg text-center font-display text-sm font-semibold text-white/90">
                  {activeVideo.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
