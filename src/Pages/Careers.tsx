import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";
import LazyImage from "../Components/LazyImage";
import { CONTACT_EMAIL } from "../config/site";
import { fadeUp, springSnappy, stagger, viewportTight } from "../utils/motion";

const perks = [
  { title: "Cutting-edge work", text: "Superconducting qubits, cryogenics & NQM-scale systems" },
  { title: "Amaravati (AQV)", text: "Build India's indigenous quantum hardware hub" },
  { title: "Cross-disciplinary", text: "Physics, RF, electronics, fabrication & software" },
  { title: "Deep-tech growth", text: "World-class team · competitive packages · all levels" },
];

const openRoles = [
  {
    id: "quantum-device-engineer",
    title: "Quantum Device Engineer",
    summary:
      "Design and simulate quantum microwave hardware — processors, resonators, and critical components — using KLayout and EM tools to turn ideas into manufacturable quantum devices.",
    department: "Quantum Hardware Design",
    type: "Full Time",
    location: "Remote / Amaravati (AP)",
    experience: "Immediate joining · KLayout required",
    immediate: true,
    highlights: [
      "KLayout for 2D/3D layout, DRC, LVS & GDSII",
      "EM simulation (HFSS, Sonnet, COMSOL)",
      "Superconducting quantum hardware & microwave engineering",
      "Collaborate with fabrication and measurement teams",
      "Design documentation and version control",
    ],
    applyEmail: CONTACT_EMAIL,
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1783745584/1783182288702_xmfzg2.jpg",
    linkedInUrl:
      "https://www.linkedin.com/posts/qbit-force_hiring-quantumcomputing-quantumhardware-activity-7479208610372243456-0V5S",
  },
  {
    id: "quantum-control-software-engineer",
    title: "Full-Stack Quantum Control Software Engineer",
    summary:
      "Develop quantum control platforms, experiment orchestration systems, calibration frameworks, and developer APIs that bridge quantum algorithms with real-world quantum hardware.",
    department: "Quantum Control Software",
    type: "Full Time",
    location: "Amaravati Quantum Valley",
    experience: "2+ years · BS / MS / PhD",
    highlights: [
      "Python APIs, SDKs, and backend services",
      "Experiment orchestration & pulse scheduling",
      "Calibration automation & hardware integration",
      "Linux systems, C/C++, Git & CI/CD",
      "FPGA integration & performance optimization",
    ],
    applyEmail: CONTACT_EMAIL,
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1782465512/1781677755188_om6awa.jpg",
    linkedInUrl:
      "https://www.linkedin.com/posts/qbit-force_qbitforcequantum-hiring-quantumcomputing-activity-7472898142393229312-8caK/",
  },
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
    applyEmail: CONTACT_EMAIL,
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781373073/1780227838904_uvzwjm.jpg",
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
    immediate: true,
    highlights: [
      "RF & Microwave Engineer",
      "Quantum Processor Design Engineer",
      "Senior Quantum Scientist",
      "Superconducting qubits, cQED & cryogenic instrumentation",
    ],
    applyEmail: CONTACT_EMAIL,
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781373074/1779640657238_prqy2l.jpg",
    linkedInUrl:
      "https://www.linkedin.com/posts/qbit-force_quantumhiring-quantumcomputing-quantumjobs-activity-7464353933864378368-epw8",
  },
];

function JobRow({ role, index }: { role: (typeof openRoles)[number]; index: number }) {
  const imageOnLeft = index % 2 === 0;

  const imageBlock = (
    <div
      className={`order-1 min-w-0 overflow-hidden bg-[#f4f6fb] ${
        imageOnLeft ? "lg:order-1" : "lg:order-2"
      }`}
    >
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[420px]">
        <LazyImage
          src={role.imageUrl}
          alt={`${role.title} — Qbit Force hiring poster`}
          optimizeWidth={960}
          className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );

  const contentBlock = (
    <div
      className={`order-2 flex min-w-0 flex-col justify-center p-4 sm:p-6 lg:p-10 ${
        imageOnLeft ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-1.5 sm:mb-4 sm:gap-2">
        <span className="rounded-full bg-petal/10 px-2 py-0.5 font-display text-[0.625rem] font-bold uppercase tracking-wider text-petal sm:px-2.5 sm:py-1 sm:text-[0.6875rem]">
          {role.department}
        </span>
        <span className="rounded-full bg-navy/5 px-2 py-0.5 font-display text-[0.625rem] font-semibold text-navy sm:px-2.5 sm:py-1 sm:text-[0.6875rem]">
          {role.type}
        </span>
        {"immediate" in role && role.immediate && (
          <span className="rounded-full bg-petal px-2 py-0.5 font-display text-[0.625rem] font-bold uppercase tracking-wider text-white sm:px-2.5 sm:py-1 sm:text-[0.6875rem]">
            Immediate
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-bold leading-snug text-navy transition group-hover:text-petal sm:text-xl lg:text-[1.75rem]">
        {role.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted sm:mt-3 sm:text-base">{role.summary}</p>

      <ul className="mt-4 flex flex-col gap-1.5 sm:mt-5 sm:gap-2">
        {role.highlights.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-snug text-text-muted sm:text-sm sm:leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petal" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 text-xs text-text-muted sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 sm:pt-5 sm:text-sm">
        <span>{role.location}</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span>{role.experience}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:mt-5">
        <p className="text-xs leading-relaxed text-text-muted sm:text-sm">
          Apply:{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `mailto:${role.applyEmail}`;
            }}
            className="break-all font-semibold text-navy underline-offset-2 hover:text-petal hover:underline"
          >
            {role.applyEmail}
          </button>
        </p>
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-petal/25 bg-petal/5 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-petal transition group-hover:border-petal/40 group-hover:bg-petal/10 sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm group-hover:sm:gap-3">
          View on LinkedIn
          <span aria-hidden>→</span>
        </span>
      </div>
    </div>
  );

  return (
    <motion.a
      href={role.linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={springSnappy}
      className={`group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-white text-left no-underline shadow-sm transition-shadow hover:border-petal/40 hover:shadow-lg sm:rounded-2xl lg:grid lg:items-stretch ${
        imageOnLeft ? "lg:grid-cols-[3fr_7fr]" : "lg:grid-cols-[7fr_3fr]"
      }`}
      aria-label={`View ${role.title} on LinkedIn`}
    >
      {imageBlock}
      {contentBlock}
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
            className="mb-8 grid grid-cols-2 gap-3 sm:mb-12 sm:gap-4 lg:grid-cols-4"
          >
            {perks.map((perk) => (
              <motion.div
                key={perk.title}
                variants={fadeUp}
                className="rounded-xl border border-border bg-[#fafbff] px-3 py-4 text-center transition-colors hover:border-navy/20 sm:rounded-2xl sm:px-5 sm:py-6"
              >
                <h3 className="mb-1.5 font-display text-xs font-bold text-navy sm:mb-2 sm:text-sm">{perk.title}</h3>
                <p className="m-0 text-[0.6875rem] leading-snug text-text-muted sm:text-sm">{perk.text}</p>
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
            <motion.div variants={fadeUp} className="mb-6 max-w-2xl sm:mb-8">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-petal">
                Open Roles
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:mt-3 sm:text-3xl lg:text-4xl">
                Current Openings
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-base">
                Active postings on LinkedIn. Select a role to read the full description and apply
                directly through the post or via email.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6 sm:gap-10 lg:gap-14">
              {openRoles.map((role, index) => (
                <JobRow key={role.id} role={role} index={index} />
              ))}
            </div>
          </motion.div>

          <div
            className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-xl border border-border border-l-4 border-l-petal bg-[#fafbff] p-4 sm:mt-12 sm:flex-row sm:items-center sm:rounded-2xl sm:p-8"
          >
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-navy sm:text-base">Work with us at AQV</p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted sm:text-sm">
                Amaravati Quantum Valley, Andhra Pradesh · Domestic & international candidates welcome
              </p>
            </div>
            <Link
              to="/contactus"
              className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-navy px-6 py-2.5 font-display text-sm font-semibold text-white no-underline transition hover:bg-petal sm:w-auto"
            >
              General enquiry →
            </Link>
          </div>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Careers;
