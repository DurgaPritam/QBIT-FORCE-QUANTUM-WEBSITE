import { type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  springSnappy,
  staggerFast,
  wordReveal,
} from "../utils/motion";

export type FramerHeroChip = {
  label: string;
  href: string;
};

export type FramerPageHeroProps = {
  pillLabel: string;
  title: string;
  intro: string;
  chips?: FramerHeroChip[];
};

/** Shared hero layout — keep mobile padding compact across all inner pages */
export const heroSectionClass =
  "relative z-10 flex min-h-[min(68dvh,480px)] flex-col items-center justify-center overflow-hidden px-4 sm:min-h-[min(88dvh,680px)] sm:px-8 lg:min-h-[100dvh] lg:px-10";

export const heroContentClass =
  "relative mx-auto w-full max-w-4xl py-[calc(var(--nav-height)+0.5rem)] pb-4 text-center sm:py-[calc(var(--nav-height)+1.25rem)] sm:pb-0 lg:py-[calc(var(--nav-height)+2rem)]";

export const heroPillClass =
  "inline-flex max-w-full items-center gap-2 rounded-full border border-border/70 bg-white/70 px-3 py-1.5 font-display text-[0.625rem] font-bold uppercase tracking-[0.18em] text-petal shadow-sm backdrop-blur-md sm:px-4 sm:text-[0.6875rem] sm:tracking-[0.22em]";

export const heroTitleClass =
  "mt-3 font-display text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-navy sm:mt-6";

export const heroIntroClass =
  "mx-auto mt-3 max-w-2xl px-1 text-sm leading-relaxed text-text-muted sm:mt-8 sm:px-0 sm:text-base lg:text-lg";

export const heroChipsClass =
  "mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3";

export const heroChipLinkClass =
  "rounded-full border border-navy/10 bg-white px-4 py-2 font-display text-[0.6875rem] font-semibold text-navy no-underline shadow-sm transition hover:border-petal/30 hover:text-petal sm:px-5 sm:text-xs";

function SplitHeadline({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      className={`flex flex-wrap justify-center gap-x-[0.28em] ${className}`}
      initial="hidden"
      animate="visible"
      variants={staggerFast}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} custom={i} variants={wordReveal} className="inline-block origin-bottom">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function FramerPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-clip bg-[#fafbff] antialiased py-0 sm:py-3">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,1,127,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,1,127,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {children}
    </div>
  );
}

export function PageContentSection({
  id,
  children,
  className = "",
  innerClassName = "",
  maxWidth = "max-w-7xl",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  maxWidth?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-[calc(var(--nav-height)+0.75rem)] bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16 ${className}`}
    >
      <div className={`mx-auto w-full min-w-0 ${maxWidth} ${innerClassName}`}>{children}</div>
    </section>
  );
}

export default function FramerPageHero({ pillLabel, title, intro, chips = [] }: FramerPageHeroProps) {
  return (
    <section className={heroSectionClass}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-light/20 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-32 h-80 w-80 rounded-full bg-petal/15 blur-[100px]"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={heroContentClass}>
        <span className={heroPillClass}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-petal" />
          {pillLabel}
        </span>

        <SplitHeadline text={title} className={heroTitleClass} />

        <p className={heroIntroClass}>{intro}</p>

        {chips.length > 0 && (
          <div className={heroChipsClass}>
            {chips.map((chip) => (
              <motion.a
                key={chip.label}
                href={chip.href}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={springSnappy}
                className={heroChipLinkClass}
              >
                {chip.label}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
