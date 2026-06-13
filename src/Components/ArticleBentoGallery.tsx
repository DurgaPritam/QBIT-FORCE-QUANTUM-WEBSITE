import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Article } from "../data/articlesData";
import { easeOut, fadeUp, springSnappy, stagger, viewportTight } from "../utils/motion";

const categoryLabels: Record<Article["category"], string> = {
  publication: "Publication",
  press: "Press",
  insight: "Insight",
};

type ArticleBentoGalleryProps = {
  articles: Article[];
  className?: string;
};

function ArticleLightboxContent({ article }: { article: Article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex max-h-[90vh] w-[min(92vw,760px)] flex-col overflow-hidden rounded-2xl border border-navy/25 bg-white shadow-2xl">
      {article.imageUrl && (
        <div className="flex shrink-0 items-center justify-center bg-[#f7f5f2] p-4 sm:p-6">
          <img
            src={article.imageUrl}
            alt=""
            className="max-h-[min(52vh,520px)] w-auto max-w-full object-contain"
          />
        </div>
      )}
      <div className="overflow-y-auto p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-petal/10 px-2.5 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-wider text-petal">
            {categoryLabels[article.category]}
          </span>
          <span className="text-sm text-text-muted">{article.readTime} read</span>
          <time dateTime={article.date} className="text-sm text-text-muted">
            {formattedDate}
          </time>
        </div>
        <h2 className="font-display text-xl font-bold leading-snug text-navy sm:text-2xl">{article.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">{article.excerpt}</p>
        {article.link && (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-display text-sm font-semibold text-white no-underline transition hover:bg-petal"
          >
            Read article →
          </a>
        )}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  featured = false,
  onOpen,
}: {
  article: Article;
  featured?: boolean;
  onOpen: () => void;
}) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={springSnappy}
      onClick={onOpen}
      className={`group w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-shadow hover:border-navy/15 hover:shadow-md ${
        featured ? "lg:grid lg:grid-cols-2 lg:items-stretch" : "flex flex-col"
      }`}
      aria-label={`Read ${article.title}`}
    >
      {article.imageUrl && (
        <div
          className={`flex items-center justify-center bg-[#f7f5f2] p-4 sm:p-5 ${
            featured ? "min-h-[280px] lg:min-h-[360px]" : "min-h-[200px]"
          }`}
        >
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            draggable={false}
            className={`w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02] ${
              featured ? "max-h-[320px] lg:max-h-[400px]" : "max-h-[220px]"
            }`}
          />
        </div>
      )}

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "lg:justify-center" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-petal/10 px-2.5 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-wider text-petal">
            {categoryLabels[article.category]}
          </span>
          <span className="text-xs text-text-muted">{article.readTime}</span>
        </div>
        <h3
          className={`font-display font-bold leading-snug text-navy ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        <p className={`mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted ${featured ? "sm:text-base" : ""}`}>
          {article.excerpt}
        </p>
        <span className="mt-4 text-xs text-text-muted">{formattedDate}</span>
      </div>
    </motion.button>
  );
}

function LightboxShell({
  open,
  onClose,
  onPrev,
  onNext,
  showNav,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  showNav: boolean;
  label: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onPrev();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, onNext, onPrev]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000]"
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden onClick={onClose} />

        <button
          type="button"
          className="absolute right-4 top-4 z-[2002] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-navy shadow-md transition hover:bg-petal hover:text-white sm:right-6 sm:top-6"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {showNav && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 z-[2002] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-petal hover:text-white sm:left-6"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 z-[2002] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-petal hover:text-white sm:right-6"
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}

        <div className="pointer-events-none fixed left-1/2 top-1/2 z-[2001] max-w-[95vw] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default function ArticleBentoGallery({ articles, className = "" }: ArticleBentoGalleryProps) {
  const displayArticles = useMemo(
    () => articles.filter((a) => Boolean(a.imageUrl)),
    [articles],
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback(
    (index: number) => {
      if (index < 0 || index >= displayArticles.length) return;
      setLightboxIndex(index);
      setLightboxOpen(true);
    },
    [displayArticles.length],
  );

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (displayArticles.length === 0) return;
      setLightboxIndex((prev) => (prev + direction + displayArticles.length) % displayArticles.length);
    },
    [displayArticles.length],
  );

  const [featured, ...rest] = displayArticles;
  const activeArticle = displayArticles[lightboxIndex];

  if (displayArticles.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-white px-6 py-16 text-center">
        <p className="text-text-muted">No articles to display.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportTight}
        variants={stagger}
        className={`flex flex-col gap-6 sm:gap-8 ${className}`}
      >
        {featured && (
          <ArticleCard article={featured} featured onOpen={() => openLightbox(0)} />
        )}

        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {rest.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={() => openLightbox(i + 1)}
              />
            ))}
          </div>
        )}
      </motion.div>

      <LightboxShell
        open={lightboxOpen && Boolean(activeArticle)}
        onClose={closeLightbox}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        showNav={displayArticles.length > 1}
        label={activeArticle?.title ?? "Article"}
      >
        {activeArticle && <ArticleLightboxContent key={activeArticle.id} article={activeArticle} />}
      </LightboxShell>
    </>
  );
}
