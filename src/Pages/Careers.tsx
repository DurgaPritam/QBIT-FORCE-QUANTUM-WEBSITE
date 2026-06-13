import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";
import { fadeUp, springSnappy, stagger, viewportTight } from "../utils/motion";

const perks = [
  { title: "Cutting-edge work", text: "Superconducting qubits, cryogenics & NQM-scale systems" },
  { title: "Amaravati (AQV)", text: "Build India's indigenous quantum hardware hub" },
  { title: "Cross-disciplinary", text: "Physics, RF, electronics, fabrication & software" },
  { title: "Deep-tech growth", text: "World-class team · competitive packages · all levels" },
];

const openRoles = [
  {
    id: "electronics-engineer",
    title: "Electronics Engineer (Quantum Computers)",
    summary:
      "Analog and mixed-signal electronics for superconducting quantum processors, 4K cryogenic systems, and dilution refrigerators.",
    department: "Control Electronics",
    type: "Full Time",
    location: "Amaravati Quantum Valley",
    experience: "1–15 years · Multiple levels",
    highlights: [
      "Low-noise analog & mixed-signal electronics",
      "Precision current sources for superconducting qubits",
      "FPGA interface electronics & RF control systems",
      "Cryogenic measurement & high-frequency PCB design",
    ],
    applyEmail: "electronics@qbitforcequantum.com",
    linkedInUrl:
      "https://www.linkedin.com/posts/qbit-force_hiring-electronicsengineer-analogelectronics-activity-7466816753734615040-sOy0",
  },
  {
    id: "quantum-hardware-team",
    title: "RF, Processor Design & Senior Scientist",
    summary:
      "Immediate openings for engineers and scientists building India's first indigenously designed large-scale quantum computers and processor foundry.",
    department: "Quantum Hardware",
    type: "Full Time",
    location: "Amaravati Quantum Valley",
    experience: "2–15 years · All levels",
    highlights: [
      "RF & Microwave Engineer",
      "Quantum Processor Design Engineer",
      "Senior Quantum Scientist",
      "Superconducting qubits, cQED & cryogenic instrumentation",
    ],
    applyEmail: "scq@qbitforcequantum.com",
    linkedInUrl:
      "https://www.linkedin.com/posts/qbit-force_quantumhiring-quantumcomputing-quantumjobs-activity-7464353933864378368-epw8",
  },
];

function JobCard({ role, index }: { role: (typeof openRoles)[number]; index: number }) {
  return (
    <motion.a
      href={role.linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={springSnappy}
      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 text-left no-underline shadow-sm transition-shadow hover:border-petal/40 hover:shadow-lg sm:p-8"
      aria-label={`View ${role.title} on LinkedIn`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-petal/10 px-2.5 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-wider text-petal">
          {role.department}
        </span>
        <span className="rounded-full bg-navy/5 px-2.5 py-1 font-display text-[0.6875rem] font-semibold text-navy">
          {role.type}
        </span>
        {index === 1 && (
          <span className="rounded-full bg-petal px-2.5 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-wider text-white">
            Immediate
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold leading-snug text-navy transition group-hover:text-petal sm:text-2xl">
        {role.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{role.summary}</p>

      <ul className="mt-5 flex flex-1 flex-col gap-2">
        {role.highlights.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petal" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 text-xs text-text-muted sm:text-sm">
        <span>{role.location}</span>
        <span aria-hidden>·</span>
        <span>{role.experience}</span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-text-muted">
          Apply:{" "}
          <span className="font-semibold text-navy">{role.applyEmail}</span>
        </span>
        <span className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-petal transition group-hover:gap-3">
          View on LinkedIn
          <span aria-hidden>→</span>
        </span>
      </div>
    </motion.a>
  );
}

function Careers() {
  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Careers"
        title="Join the Quantum Revolution"
        intro="We're hiring engineers and scientists to build India's indigenous quantum computers at Amaravati Quantum Valley — click a role below to view the full posting on LinkedIn."
        chips={[
          { label: "Open roles", href: "#roles" },
          { label: "About us", href: "/company" },
          { label: "Contact", href: "/contactus" },
        ]}
      />

      <PageContentSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportTight}
            variants={stagger}
            className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {perks.map((perk) => (
              <motion.div
                key={perk.title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-[#fafbff] px-5 py-6 text-center transition-colors hover:border-navy/20"
              >
                <h3 className="mb-2 font-display text-sm font-bold text-navy">{perk.title}</h3>
                <p className="m-0 text-sm leading-snug text-text-muted">{perk.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            id="roles"
            initial="hidden"
            whileInView="visible"
            viewport={viewportTight}
            variants={stagger}
            className="scroll-mt-24"
          >
            <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-petal">
                Open Roles
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Current Openings
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Two active postings on LinkedIn. Select a role to read the full description and apply
                directly through the post or via email.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {openRoles.map((role, index) => (
                <JobCard key={role.id} role={role} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportTight}
            transition={{ duration: 0.6 }}
            className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border border-l-4 border-l-petal bg-[#fafbff] p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <p className="font-display text-base font-semibold text-navy">Work with us at AQV</p>
              <p className="mt-1 text-sm text-text-muted">
                Amaravati Quantum Valley, Andhra Pradesh · Domestic & international candidates welcome
              </p>
            </div>
            <Link
              to="/contactus"
              className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-2.5 font-display text-sm font-semibold text-white no-underline transition hover:bg-petal"
            >
              General enquiry →
            </Link>
          </motion.div>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Careers;
