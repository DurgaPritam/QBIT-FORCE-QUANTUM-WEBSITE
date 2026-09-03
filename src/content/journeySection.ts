export type JourneyStep = {
  id: string;
  step: string;
  title: string;
  date: string;
  subtitle: string;
  accent: string;
};

export const journeyHeadline = "Journey of Qbit Force Quantum";

export const journeySteps: JourneyStep[] = [
  {
    id: "formation",
    step: "01",
    title: "Formation of Qbit Force Quantum",
    date: "December 15th, 2025",
    subtitle: "Qbit Force Quantum was established to build indigenous quantum hardware from Amaravati.",
    accent: "#000080",
  },
  {
    id: "manufacturing",
    step: "02",
    title: "Manufacturing and Procuring Components",
    date: "Feb 15 – Mar 25, 2026",
    subtitle: "Sourcing and fabricating cryogenic, RF, and superconducting components for quantum systems.",
    accent: "#15803d",
  },
  {
    id: "delivery-parts",
    step: "03",
    title: "Delivery of Parts",
    date: "March 29th, 2026",
    subtitle: "Critical hardware modules delivered on schedule to the Amaravati reference facility.",
    accent: "#ea580c",
  },
  {
    id: "building",
    step: "04",
    title: "Building Quantum Computer",
    date: "Mar 30 – Apr 13, 2026",
    subtitle: "Assembly and integration of dilution refrigerator stacks and control infrastructure.",
    accent: "#7c3aed",
  },
  {
    id: "product-delivery",
    step: "05",
    title: "Product Delivery of 1Q and 1S",
    date: "April 14th, 2026",
    subtitle: "First indigenous 1Q and 1S quantum systems delivered to partners and research users.",
    accent: "#2563eb",
  },
  {
    id: "test-beds",
    step: "06",
    title: "Delivering Quantum Test Beds and Computers for Tomorrow",
    date: "Ongoing",
    subtitle: "Scaling open-access quantum test beds and computers for research, industry, and MSMEs across India.",
    accent: "#0d9488",
  },
];

export type ScrollTimelineItem = {
  year: string;
  eyebrow: string;
  desc: string;
  bg: string;
  fg: string;
};

export const scrollTimelineItems: ScrollTimelineItem[] = journeySteps.map((step) => ({
  year: step.date.includes("2025") ? "2025" : step.date === "Ongoing" ? "NOW" : "2026",
  eyebrow: `${step.step}  ·  ${step.date}`,
  desc: `${step.title}. ${step.subtitle}`,
  bg: step.accent,
  fg: "#ffffff",
}));
