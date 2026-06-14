import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { indiaMapUrl, companyStoryImages } from "../content/mediaHub";
import { coreTeamMembers, teamMembers } from "../data/teamData";
import TiltCardGrid from "../Components/TiltCardGrid";
import {
  heroChipLinkClass,
  heroChipsClass,
  heroContentClass,
  heroIntroClass,
  heroPillClass,
  heroSectionClass,
  heroTitleClass,
} from "../Components/FramerPageHero";
import {
  easeOut,
  fadeUp,
  scaleIn,
  slideInLeft,
  springSnappy,
  stagger,
  staggerFast,
  viewportOnce,
  wordReveal,
} from "../utils/motion";

const pagePadX = "px-6 sm:px-10 lg:px-14";

const aboutHeroSectionClass = heroSectionClass
  .replace("px-4", "px-6")
  .replace("sm:px-8", "sm:px-10")
  .replace("lg:px-10", "lg:px-14");

const leaderBios: Record<number, string> = {
  1: "Steering global commercialization strategy, multi-stakeholder ecosystem partnerships, and corporate vision for India's indigenous white-box quantum computers.",
  2: "Orchestrating cross-functional engineering deliverables, National Quantum Mission alignment milestones, and deep-tech scaling frameworks.",
  3: "Leading advanced research in cryogenic wiring infrastructure, superconducting qubit optimization, and microfabrication hardware design.",
};

const missionCards = [
  {
    title: "Our Mission",
    text: "Build scalable, indigenous quantum hardware platforms that accelerate India's National Quantum Mission and empower local innovation.",
    link: "/products",
    linkLabel: "Our solutions",
  },
  {
    title: "Our Vision",
    text: "Establish Amaravati as a global quantum manufacturing hub — transparent, open-access, and built for startups, researchers, and industry.",
    link: "#leaders",
    linkLabel: "Meet the team",
  },
  {
    title: "Our Values",
    text: "Transparency, manufacturing excellence, ecosystem collaboration, and open access guide every decision we make at Qbit Force.",
    link: "/contactus",
    linkLabel: "Partner with us",
  },
];

const facilityImageUrl = companyStoryImages[0]?.imageUrl ?? indiaMapUrl;

const whoWeAreParagraphs = [
  "Qbit Force Quantum Private Limited, registered in Amaravati, AP is the state's own Quantum hardware facility that builds upon the visionary road map of the Amaravati Quantum Valley (AQV) and the Chief Minister, Sri N. Chandra Babu Naidu on developing a local manufacturing hub for nurturing the Quantum system both at the national and international levels.",
  "At the foundation stone ceremony on February 7, 2026, under the vision 'Built in Amaravati, for the World,' the Honorable Chief Minister and the Honorable Minister of Science & Technology, Dr. Jitendra Singh Rana, announced an MoU with Qbit Force Quantum Pvt. Ltd. to establish two quantum computers in Amaravati.",
  "QF will catalyze a high-tech ecosystem, where local manufacturers skilled in metalwork, cryogenics, electronics and microfabrication can participate in a market projected to reach billions globally. As cheaper, improved parts emerge, they will feed back into the ecosystem, strengthening our capabilities while driving high skilled job creation, investment, and technological leadership in our state.",
];

const impactStats = [
  { value: "2", label: "Quantum computers", sub: "Planned in Amaravati" },
  { value: "Feb 2026", label: "Foundation stone", sub: "Official ceremony" },
  { value: "AQV", label: "Quantum Valley", sub: "Amaravati hub" },
  { value: "White-Box", label: "Platform model", sub: "Open & transparent" },
];

const marqueeItems = [
  "Quantum Hardware",
  "Cryogenics",
  "Superconducting Qubits",
  "White-Box Platform",
  "Microfabrication",
  "National Quantum Mission",
  "Built in Amaravati",
  "Open Access",
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

function MarqueeStrip() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
      <motion.div
        className="flex w-max items-center gap-10 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-petal" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function AboutUs() {
  const [activeMission, setActiveMission] = useState(0);

  return (
    <div className="relative overflow-x-clip bg-[#fafbff] antialiased py-3">
      {/* subtle grid — Framer marketplace aesthetic */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,1,127,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,1,127,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ——— HERO ——— */}
      <section className={aboutHeroSectionClass}>
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
            Qbit Force Quantum
          </span>

          <SplitHeadline text="About Us" className={heroTitleClass} />

          <p className={heroIntroClass}>
            By creating a white-box quantum computer platform, we unlock transparency → understanding →
            innovation → new markets — enabling startups and manufacturers to design cryogenic wiring,
            superconducting qubits, and precision metal enclosures.
          </p>

          <div className={heroChipsClass}>
            {[
              { label: "Leaders", href: "#leaders" },
              { label: "Core Team", href: "#team" },
              { label: "Mission", href: "#mission" },
            ].map((chip) => (
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
        </div>
      </section>

      <MarqueeStrip />

      {/* ——— WHO WE ARE ——— */}
      <section className={`relative z-10 bg-white py-14 sm:py-20 lg:py-28 ${pagePadX}`}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mb-12 max-w-3xl sm:mb-16"
          >
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-petal">
              Who We Are
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Built in Amaravati,
              <span className="block text-petal">for the World</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">
              India&apos;s indigenous white-box quantum hardware company — anchored in the Amaravati Quantum
              Valley and aligned with the National Quantum Mission.
            </p>
          </motion.div>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: image */}
            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
            >
              <div className="relative pb-10 sm:pb-12">
                <div className="overflow-hidden rounded-3xl border border-border shadow-[0_24px_60px_rgba(0,1,127,0.1)]">
                  <motion.img
                    src={indiaMapUrl}
                    alt="India map — Qbit Force Amaravati, Andhra Pradesh"
                    className="aspect-[4/5] w-full object-cover sm:aspect-[3/4]"
                    loading="lazy"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                </div>
                <div
                  className="absolute -bottom-2 -right-4 w-[55%] overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-right-8"
                >
                  <img
                    src={facilityImageUrl}
                    alt="Amaravati Quantum Valley facility"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-navy/90 px-4 py-2 font-display text-[0.6875rem] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  Amaravati, AP
                </div>
              </div>
            </motion.div>

            {/* Right: content beside image */}
            <motion.div
              className="lg:col-span-7 lg:self-center"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={stagger}
            >
              <div className="space-y-6 sm:space-y-7">
                {whoWeAreParagraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={fadeUp}
                    className={`text-base leading-relaxed text-text-muted sm:text-lg ${
                      index === 0 ? "text-navy/90" : ""
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Impact stats — below image + content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4"
          >
            {impactStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -4, transition: springSnappy }}
                className="rounded-2xl border border-border bg-slate-50/80 p-6 sm:p-8"
              >
                <p className="font-display text-2xl font-black tracking-tight text-navy sm:text-3xl">{stat.value}</p>
                <p className="mt-2 font-display text-sm font-bold text-navy">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— MISSION / VISION / VALUES ——— */}
      <section
        id="mission"
        className="relative z-10 scroll-mt-24 overflow-hidden rounded-t-[2rem] bg-slate-950 shadow-[0_-20px_60px_rgba(0,0,0,0.15)] sm:rounded-t-[2.5rem]"
      >
        <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-white/10" aria-hidden />
        <div className={`py-20 text-white sm:py-28 ${pagePadX}`}>
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-16 sm:mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <span className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                Strategic Intent
              </span>
              <h2 className="font-display text-4xl font-light tracking-tight sm:text-5xl">
                Mission, Vision &amp; Core Values
              </h2>
            </motion.div>

            <div className="flex flex-col border-t border-white/10">
              {missionCards.map((card, index) => {
                const isOpen = activeMission === index;
                return (
                  <motion.div
                    key={card.title}
                    role="button"
                    tabIndex={0}
                    layout
                    className="cursor-pointer border-b border-white/10 py-8 outline-none transition-colors focus-visible:bg-white/[0.03]"
                    onClick={() => setActiveMission(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveMission(index);
                      }
                    }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex w-full max-w-xl items-baseline gap-8 sm:gap-16">
                        <span className="font-display text-sm font-semibold tracking-wider text-slate-500">
                          0{index + 1}
                        </span>
                        <h3
                          className={`font-display text-xl font-medium tracking-tight transition-colors sm:text-2xl ${
                            isOpen ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {card.title}
                        </h3>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 pt-1 text-slate-500"
                        aria-hidden
                      >
                        ▾
                      </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: easeOut }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 pl-12 sm:pl-24 md:max-w-2xl">
                            <p className="mb-6 text-base font-light leading-relaxed text-slate-400">
                              {card.text}
                            </p>
                            {card.link.startsWith("#") ? (
                              <a
                                href={card.link}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white no-underline transition hover:border-white hover:bg-white hover:text-slate-950"
                              >
                                {card.linkLabel} →
                              </a>
                            ) : (
                              <Link
                                to={card.link}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white no-underline transition hover:border-white hover:bg-white hover:text-slate-950"
                              >
                                {card.linkLabel} →
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ——— LEADERS ——— */}
      <section
        id="leaders"
        className={`relative z-10 scroll-mt-24 bg-slate-50 py-10 sm:py-14 lg:py-16 ${pagePadX}`}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mx-auto mb-8 max-w-lg text-center sm:mb-10"
          >
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-petal">
              Leadership
            </span>
            <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-navy sm:text-3xl">
              Leaders
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
              The executive team guiding India&apos;s indigenous quantum hardware journey at Amaravati Quantum Valley.
            </p>
          </motion.div>

          <div className="mx-auto max-w-[17rem] sm:max-w-none">
            <TiltCardGrid
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              gap={16}
              items={coreTeamMembers.map((member) => ({
                image: member.image,
                imageAlt: member.name,
                title: member.name,
                subtitle: member.role,
                description: leaderBios[member.id],
                imageAspect: "aspect-[3/4]",
                descriptionLines: 3,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ——— CORE TEAM ——— */}
      <section id="team" className={`relative z-10 scroll-mt-24 bg-white py-14 sm:py-20 lg:py-28 ${pagePadX}`}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
          >
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-petal">
              Our People
            </span>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-navy sm:text-4xl">
              Core Team
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Engineers, researchers, and specialists building India&apos;s quantum future at Amaravati Quantum
              Valley.
            </p>
          </motion.div>

          <TiltCardGrid
            className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            gap={20}
            items={teamMembers.map((member) => ({
              image: member.image,
              imageAlt: member.name,
              title: member.name,
              description: member.role || "Core Team",
              imageAspect: "aspect-square",
            }))}
          />
        </div>
      </section>

      {/* ——— CTA ——— */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={scaleIn}
        className={`relative z-10 mb-16 overflow-hidden rounded-[2rem] bg-navy mx-6 sm:mx-10 lg:mx-auto lg:max-w-7xl ${pagePadX}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-petal/20 blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="relative flex flex-col items-start justify-between gap-8 py-14 sm:flex-row sm:items-center sm:py-16">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Join the quantum hardware revolution
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              We are expanding teams in RF engineering, cryogenics, and quantum foundry operations at AQV.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
            <Link
              to="/careers"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-navy no-underline shadow-lg transition hover:bg-petal hover:text-white"
            >
              View open positions →
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutUs;
