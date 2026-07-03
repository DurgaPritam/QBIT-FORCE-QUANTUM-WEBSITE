export const SITE_URL = "https://www.qbitforcequantum.com";
export const SITE_NAME = "Qbit Force Quantum";

export const DEFAULT_DESCRIPTION =
  "Indigenous superconducting quantum hardware, dilution refrigerators, and open-access platforms. Built in Amaravati, for the world.";

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192857/QFLogo-Bsun1Dcj_tzycu8.png";

/** Site-wide baseline keywords appended to every page's specific keywords. */
export const DEFAULT_KEYWORDS = [
  "Qbit Force Quantum",
  "quantum computing India",
  "quantum hardware",
  "superconducting qubits",
  "Amaravati Quantum Valley",
  "indigenous quantum technology",
];

export type PageMeta = {
  title: string;
  description: string;
  keywords: string[];
};

export const pageMetaByPath: Record<string, PageMeta> = {
  "/": {
    title: "Indigenous Quantum Hardware",
    description: DEFAULT_DESCRIPTION,
    keywords: [
      "quantum computing company",
      "dilution refrigerator",
      "open-access quantum platform",
      "made in India quantum",
    ],
  },
  "/company": {
    title: "About Us",
    description:
      "Meet Qbit Force Quantum — Andhra Pradesh's indigenous quantum hardware facility at Amaravati Quantum Valley.",
    keywords: [
      "about Qbit Force",
      "quantum hardware facility",
      "Andhra Pradesh quantum",
      "quantum startup India",
      "quantum research team",
    ],
  },
  "/products": {
    title: "Quantum Hardware Platforms",
    description:
      "Explore indigenous dilution refrigerators, superconducting qubits, and open-access quantum computing platforms from Amaravati.",
    keywords: [
      "dilution refrigerator",
      "superconducting qubit platform",
      "cryogenic systems",
      "quantum processor",
      "open-access quantum computing",
    ],
  },
  "/careers": {
    title: "Careers",
    description:
      "Join the Qbit Force team building India's quantum hardware future in cryogenics, RF engineering, and quantum foundry operations.",
    keywords: [
      "quantum jobs India",
      "quantum computing careers",
      "cryogenics engineer jobs",
      "RF engineering careers",
      "quantum foundry jobs",
    ],
  },
  "/contactus": {
    title: "Contact Us",
    description:
      "Get in touch with Qbit Force Quantum for partnerships, products, careers, and media enquiries from Amaravati.",
    keywords: [
      "contact Qbit Force",
      "quantum partnership",
      "quantum hardware enquiry",
      "quantum collaboration India",
    ],
  },
  "/gallery": {
    title: "Photo Gallery",
    description:
      "Facility moments, quantum hardware, and events from Amaravati Quantum Valley and Qbit Force Quantum.",
    keywords: [
      "quantum lab photos",
      "quantum facility gallery",
      "quantum hardware images",
      "Amaravati quantum photos",
    ],
  },
  "/publications": {
    title: "Publications & Insights",
    description:
      "Articles, press coverage, and stories from Qbit Force Quantum's indigenous hardware journey.",
    keywords: [
      "quantum computing articles",
      "quantum research insights",
      "quantum blog India",
      "quantum hardware publications",
    ],
  },
  "/videos": {
    title: "Videos & Media",
    description:
      "Watch facility walkthroughs, technology updates, and media coverage from Qbit Force Quantum.",
    keywords: [
      "quantum facility tour",
      "quantum computing videos",
      "quantum lab walkthrough",
      "quantum technology videos",
    ],
  },
  "/press": {
    title: "Press & Media",
    description:
      "Press coverage and media features on Qbit Force Quantum, Amaravati Quantum Valley, and India's quantum mission.",
    keywords: [
      "quantum computing news",
      "Qbit Force press",
      "India quantum mission",
      "quantum media coverage",
    ],
  },
  "/terms": {
    title: "Terms and Conditions",
    description: "Terms governing your use of the Qbit Force Quantum website and services.",
    keywords: ["terms and conditions", "terms of service", "website terms"],
  },
  "/privacypolicy": {
    title: "Privacy Policy",
    description: "How Qbit Force Quantum collects, uses, and protects your personal information.",
    keywords: ["privacy policy", "data protection", "personal information"],
  },
};
