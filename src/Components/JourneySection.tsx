import { motion, useReducedMotion } from "framer-motion";
import { journeyHeadline, journeySteps, type JourneyStep } from "../content/journeySection";
import { easeOut, springSnappy, viewportOnce } from "../utils/motion";

function JourneyCard({ step }: { step: JourneyStep }) {
  return (
    <article
      className="rounded-2xl border bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.05)] sm:p-5"
      style={{ borderColor: `${step.accent}33` }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex shrink-0 rounded-full px-2.5 py-0.5 font-display text-[0.6875rem] font-bold tracking-wide"
          style={{ color: step.accent, backgroundColor: `${step.accent}14` }}
        >
          {step.step}
        </span>
        <p className="min-w-0 text-right font-display text-[0.6875rem] font-semibold uppercase tracking-wide text-text-muted sm:text-xs">
          {step.date}
        </p>
      </div>
      <h3
        className="mt-3 font-display text-[0.9375rem] font-bold leading-snug tracking-tight sm:text-lg"
        style={{ color: step.accent }}
      >
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.subtitle}</p>
    </article>
  );
}

function TimelineDot({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.span
      initial={reduceMotion ? false : { scale: 0 }}
      whileInView={reduceMotion ? undefined : { scale: 1 }}
      viewport={viewportOnce}
      transition={springSnappy}
      className="relative z-10 block h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-white shadow-md sm:h-4 sm:w-4"
      style={{ backgroundColor: accent }}
      aria-hidden
    />
  );
}

function TimelineRow({
  step,
  index,
  reduceMotion,
}: {
  step: JourneyStep;
  index: number;
  reduceMotion: boolean | null;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.li
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }
      }
      className="relative pb-8 last:pb-0 sm:pb-10 lg:pb-12"
    >
      {/* Mobile / tablet — left spine */}
      <div className="flex gap-4 md:hidden">
        <div className="relative flex w-4 shrink-0 justify-center self-stretch pt-5">
          <TimelineDot accent={step.accent} reduceMotion={reduceMotion} />
        </div>
        <div className="min-w-0 flex-1">
          <JourneyCard step={step} />
        </div>
      </div>

      {/* Desktop — alternating left / right */}
      <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] md:items-start md:gap-x-5 lg:gap-x-8">
        <div className="flex justify-end">
          {isLeft && (
            <div className="w-full max-w-[22rem] lg:max-w-md">
              <JourneyCard step={step} />
            </div>
          )}
        </div>

        <div className="relative flex justify-center self-stretch pt-6">
          <TimelineDot accent={step.accent} reduceMotion={reduceMotion} />
        </div>

        <div className="flex justify-start">
          {!isLeft && (
            <div className="w-full max-w-[22rem] lg:max-w-md">
              <JourneyCard step={step} />
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}

function JourneySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#faf9f7] to-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-petal/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl lg:max-w-5xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: easeOut }}
          className="text-center"
        >
          <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
            Our path
          </span>
          <h2 className="mt-2 font-display text-[clamp(1.35rem,3.2vw,2.125rem)] font-bold leading-tight tracking-tight text-text">
            {journeyHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            From formation in Amaravati to delivering quantum systems for India.
          </p>
        </motion.div>

        <motion.ol
          variants={
            reduceMotion
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
          className="relative mt-10 list-none pl-0 sm:mt-14"
        >
          <div
            className="pointer-events-none absolute bottom-0 top-0 left-2 w-0.5 bg-gradient-to-b from-navy/40 via-petal/50 to-[#0d9488]/40 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          {journeySteps.map((step, index) => (
            <TimelineRow key={step.id} step={step} index={index} reduceMotion={reduceMotion} />
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export default JourneySection;
