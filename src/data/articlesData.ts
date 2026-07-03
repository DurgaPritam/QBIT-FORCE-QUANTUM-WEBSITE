export type Article = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "publication" | "press" | "insight";
  readTime: string;
  author?: string;
  featured?: boolean;
  imageUrl?: string;
  link?: string;
  /** Lower value appears first on the site (1 = first). */
  sortOrder?: number;
};

export const articles: Article[] = [
  {
    id: "a5",
    title: "Amaravati Quantum Facility Reaches 4 Kelvin Milestone",
    excerpt:
      "The Amaravati Quantum Reference Facility achieved a major milestone as its indigenous dilution refrigerator successfully reached 4 Kelvin (-269°C), strengthening India's capabilities in cryogenic engineering and advancing the National Quantum Mission. Made in Amaravati, for the World.",
    date: "2026-06-21",
    category: "publication",
    readTime: "3 min",
    featured: true,
    author: "Andhra Pradesh Economic Development Board",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1782234524/1782038591880_w5sr3g.jpg",
    link: "https://www.linkedin.com/posts/quantumcapitalamaravati-nationalquantummission-share-7474411595910103040-KSox/",
  },
  {
    id: "a6",
    title: "Amaravati at World Cities Summit — Building Cities That Love People Back",
    excerpt:
      "Andhra Pradesh Economic Development Board highlights Amaravati's future cities vision at the World Cities Summit, showcasing people-centric urban development alongside the state's quantum innovation agenda under Choose Speed, Choose AP.",
    date: "2026-06-19",
    category: "publication",
    readTime: "3 min",
    featured: true,
    author: "Andhra Pradesh Economic Development Board",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1782234882/Screenshot_2026-06-23_224408_zcfbxt.png",
    link: "https://www.linkedin.com/posts/apedb_worldcitiessummit-amaravati-futurecities-activity-7473334024397090816-hKlI/",
  },
  {
    id: "a1",
    title: "Amaravati Quantum Valley Announces Quantum Computers Initiative",
    excerpt:
      "Highlights from the Amaravati Quantum Valley announcement, focusing on the establishment of quantum computing infrastructure and the growth of India's quantum ecosystem.",
    date: "2026-02-07",
    category: "press",
    readTime: "3 min",
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781023863/DAS_5340_g7me7u.jpg",
    link: "https://www.linkedin.com/posts/amaravati-quantum-valley-quantum-computers-share-7465660005392945152-SieP/",
  },
  {
    id: "a2",
    title: "Principal Scientific Adviser Highlights Quantum Innovation",
    excerpt:
      "A discussion on India's quantum technology roadmap and the role of indigenous quantum computing initiatives in advancing national capabilities.",
    date: "2026-02-07",
    category: "publication",
    readTime: "4 min",
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781023913/Screenshot_2026-06-09_222110_ym7lbg.png",
    link: "https://www.linkedin.com/posts/principal-scientific-adviser-to-the-government-ugcPost-7449851435250372609-7-w2/",
  },
  {
    id: "a3",
    title: "Andhra Pradesh Emerging as a Quantum Technology Hub",
    excerpt:
      "Industry leaders and innovators discuss the opportunities being created through Andhra Pradesh's investment in quantum technologies and advanced manufacturing.",
    date: "2026-01-15",
    category: "insight",
    readTime: "5 min",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781024008/1776170355903_jlqwvl.jpg",
    link: "https://www.linkedin.com/posts/india-andhrapradesh-deccanfounders-share-7449798429800652800-2qJv/",
  },
  {
    id: "a4",
    title: "The India Way: Building a Sustainable Quantum Ecosystem",
    excerpt:
      "Perspectives on strengthening India's position in quantum computing through innovation, collaboration, and indigenous technology development.",
    date: "2025-12-10",
    category: "publication",
    readTime: "6 min",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781024008/1780987927822_nfgvuk.jpg",
    link: "https://www.linkedin.com/posts/bharatstrategicapexinstitute-bsai-theindiaway-ugcPost-7470006850126741504-P-St/",
  },
].map((article, index) => ({ ...article, sortOrder: index + 1 })) as Article[];

export const articleCategories = [
  { id: "all", label: "All" },
  { id: "publication", label: "Publications" },
  { id: "press", label: "Press" },
  { id: "insight", label: "Insights" },
] as const;
