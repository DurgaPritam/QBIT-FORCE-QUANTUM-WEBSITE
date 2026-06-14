import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  easeOut,
  fadeUp,
  scaleIn,
  springSnappy,
  staggerFast,
  viewportOnce,
  wordReveal,
} from "../utils/motion";
import {
  heroChipLinkClass,
  heroChipsClass,
  heroContentClass,
  heroIntroClass,
  heroPillClass,
  heroSectionClass,
  heroTitleClass,
} from "../Components/FramerPageHero";

const products = [
  {
    id: "01",
    title: "Dilution Refrigerators",
    description:
      "Manufactured at scale for Amaravati Quantum Valley — cryogenic platforms enabling superconducting qubit operations at millikelvin temperatures.",
    tag: "Cryogenics",
    spec: "< 10 mK Base Temp",
  },
  {
    id: "02",
    title: "Superconducting Qubit Systems",
    description:
      "Indigenous superconducting-qubit quantum computing platforms with modular hardware and standardized electronics integration.",
    tag: "Quantum Core",
    spec: "Coaxial / Planar Flex Architecture",
  },
  {
    id: "03",
    title: "Cryogenic Interconnects",
    description:
      "Precision wiring and interconnect solutions designed for low-temperature quantum hardware environments.",
    tag: "Interconnects",
    spec: "High-Density NbTi Assemblies",
  },
  {
    id: "04",
    title: "Control Electronics",
    description:
      "RF and control electronics integration for open-access, white-box quantum computing platforms.",
    tag: "Electronics",
    spec: "Ultra-Low Phase Noise Performance",
  },
];

const platformFeatures = [
  "Open-access white-box hardware",
  "Modular, repeatable manufacturing",
  "Made in Amaravati, India",
  "Research & industry ready",
];

const heroChips = [
  { label: "Quantum Stack", href: "#stack" },
  { label: "Platforms", href: "#platforms" },
  { label: "Contact", href: "/contactus" },
];

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

const stackViewport = { once: true, margin: "-60px" as const };

const stackPanelReveal = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const productCardReveal = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const stackFeatureReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

function SectionCurve() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={stackViewport}
      transition={{ duration: 0.6, ease: easeOut }}
      className="h-1 w-12 origin-left rounded-full bg-gradient-to-r from-petal to-navy"
      aria-hidden
    />
  );
}

function Products() {
  return (
    <div className="relative overflow-x-clip bg-[#fafbff] text-text-muted antialiased selection:bg-petal/10 selection:text-petal">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,1,127,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,1,127,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* --- HERO --- */}
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
            System Catalog
          </span>

          <SplitHeadline text="Quantum Hardware Platforms" className={heroTitleClass} />

          <p className={heroIntroClass}>
            Open-access, high-fidelity modular platforms engineered to accelerate local research, foundational
            physics scaling, and industrial deep-tech manufacturing lines.
          </p>

          <div className={heroChipsClass}>
            {heroChips.map((chip) =>
              chip.href.startsWith("#") ? (
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
              ) : (
                <motion.div key={chip.label} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
                  <Link to={chip.href} className={`inline-block ${heroChipLinkClass}`}>
                    {chip.label}
                  </Link>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* --- ASYMMETRIC DUAL VIEWPORT LAYER --- */}
      <section id="stack" className="relative z-10 scroll-mt-24 bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
            
            {/* STICKY LEFT VIEWPORT: Operational Capabilities */}
            <motion.div
              className="lg:col-span-4 lg:sticky lg:top-[calc(var(--nav-height)+3rem)] lg:self-start"
              initial="hidden"
              whileInView="visible"
              viewport={stackViewport}
              variants={stackPanelReveal}
            >
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 sm:p-10">
                <SectionCurve />
                <h2 className="mb-4 mt-6 font-display text-2xl font-black tracking-tight text-navy">
                  End-to-End Quantum Stack
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-text-muted">
                  From deep-cryogenic modular infrastructure assemblies to low-noise high-frequency control electronics—every single layer is exposed for direct verification, optimization, and sovereign deployment.
                </p>

                {/* Structural Minimalist Checkboxes */}
                <motion.div
                  className="space-y-4 border-t border-slate-200/60 pt-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={stackViewport}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                  }}
                >
                  {platformFeatures.map((item) => (
                    <motion.div key={item} variants={stackFeatureReveal} className="flex items-center gap-3">
                      <motion.span
                        className="h-2 w-2 shrink-0 rounded-full bg-petal"
                        variants={{
                          hidden: { scale: 0 },
                          visible: { scale: 1, transition: springSnappy },
                        }}
                      />
                      <span className="font-display text-xs font-bold uppercase tracking-wider text-navy">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* SCROLLING RIGHT VIEWPORT: four platform cards scroll past sticky stack */}
            <div id="platforms" className="scroll-mt-24 space-y-12 lg:col-span-8">
              {products.map((product) => (
                <motion.article
                  key={product.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={stackViewport}
                  variants={productCardReveal}
                  whileHover={{ y: -4 }}
                  transition={springSnappy}
                  className="group relative grid gap-6 rounded-3xl border border-slate-100 p-8 transition-all duration-300 hover:border-navy/10 hover:shadow-md sm:grid-cols-12 sm:p-12"
                >
                  {/* Metadata Row */}
                  <div className="sm:col-span-3 flex sm:flex-col justify-between border-b border-slate-100 pb-4 sm:border-b-0 sm:pb-0 sm:border-r sm:border-slate-100 sm:pr-6">
                    <div>
                      <span className="font-display text-sm font-light text-slate-300 block mb-1">
                        PIPELINE REF
                      </span>
                      <span className="font-display text-xl font-bold text-navy tracking-tight">
                        [{product.id}]
                      </span>
                    </div>
                    <div className="sm:mt-auto text-right sm:text-left">
                      <span className="inline-block rounded-md bg-navy/5 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-navy">
                        {product.tag}
                      </span>
                    </div>
                  </div>

                  {/* Core Information Block */}
                  <div className="sm:col-span-9 sm:pl-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-navy mb-3 transition-colors group-hover:text-petal sm:text-2xl">
                        {product.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-muted m-0">
                        {product.description}
                      </p>
                    </div>

                    {/* Industrial Hardware Specification Label */}
                    <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono bg-slate-50 text-slate-500 border border-slate-200/60 rounded px-2 py-0.5">
                          SPEC
                        </span>
                        <span className="text-xs font-medium text-navy/70">
                          {product.spec}
                        </span>
                      </div>
                      
                      {/* Subtle Arrow Trigger Graphic */}
                      <motion.span
                        className="text-slate-300 group-hover:text-petal"
                        aria-hidden
                        whileHover={{ x: 4 }}
                        transition={springSnappy}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- ECOSYSTEM CLOSING INTERACTIVE CALLOUT --- */}
      <section className="relative z-10 border-t border-slate-100 bg-slate-50/50 px-4 py-12 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={scaleIn}
            className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-14"
          >
            <span className="mb-3 block font-display text-xs font-bold uppercase tracking-[0.25em] text-petal">
              PROCUREMENT &amp; COLLABORATION
            </span>
            <h2 className="mb-4 font-display text-2xl font-black tracking-tight text-navy sm:text-4xl">
              Interested in our platforms?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-text-muted">
              Connect directly with our engineering and integration technicians in Amaravati to configure system architectures, schedule production slots, or request baseline site evaluations.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerFast}
            >
              <motion.div variants={fadeUp} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
                <Link
                  to="/contactus"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-petal px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-navy hover:shadow-md"
                >
                  <span>Contact Systems Team</span>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
                <Link
                  to="/company"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-navy transition-all duration-200 hover:border-navy hover:bg-slate-50"
                >
                  About Qbit Force
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default Products;