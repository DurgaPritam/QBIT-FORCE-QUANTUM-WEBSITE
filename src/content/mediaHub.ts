/** Central media store — update URLs here to refresh site-wide content */

export const siteLogoUrl =
  "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192857/QFLogo-Bsun1Dcj_tzycu8.png";

export const footerLogoUrl =
  "https://res.cloudinary.com/dps46p3m8/image/upload/v1781370587/QFLogo-Bsun1Dcj_tzycu8-removebg-preview_kynkat.png";

export const loadingScreenLogoUrl =
  "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192857/favIcon_ox2js2.png";

export const indiaMapUrl =
  "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192856/Indiamap-DA7EbyRf_eu2u3f.jpg";

/** Partner / client logos — update URLs here */
export const partnerLogos = [
  {
    id: "partner-techqubit",
    name: "TechQubit",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192857/TechQubit-luAw_Uld_vrcxzj.jpg",
  },
  {
    id: "partner-amber",
    name: "Amber",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192854/Amber-C3xYVwVj_tob5ik.png",
  },
  {
    id: "partner-srm",
    name: "SRM University AP",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192855/SRM-360I-l_J_h4naja.jpg",
  },
] as const;

/** Team member photos — update URLs here */
export const teamPhotoUrls = {
  venkat:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192859/Venkat-Bo_L1uKO_jcqwtk.jpg",
  gopaljoshi:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192855/gopaljoshi-CZvOC0Rb_nrwwo5.jpg",
  subhash:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192856/Subhash1-7yZhVpAJ_qxiwno.jpg",
  nagalakshmaiah:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192857/Nagalakshmaiah-xC-2JkVm_qjzjzc.jpg",
  pallavi:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192857/Pallavi-BMHGTMLE_whqm1c.jpg",
  durgaPritam:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192856/DurgaPritam-B_hQrdU3_aucbwo.jpg",
  chandanesh:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192856/Chandanesh-hLko5rXq_cdyf4r.jpg",
  rupa:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1781192855/Rupa-j_kkHFft_ghwn8g.jpg",
} as const;

export type HeroSlide = {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

export type MediaImage = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: "facility" | "events" | "hardware" | "team" | "news";
};

export const heroSlides: HeroSlide[] = [
  
  {
    id: "hero-4",
    type: "image",
    src: "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935950/Copy_of_IMG_20260414_161438_zed6bs.jpg",
    alt: "Qbit Force quantum hardware platform",
  },
  {
    id: "hero-video",
    type: "video",
    src: "https://res.cloudinary.com/dps46p3m8/video/upload/v1780935951/WhatsApp_Video_2026-06-07_at_7.40.37_PM_ij7kaw.mp4",
    poster:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935950/Copy_of_IMG_20260414_161438_zed6bs.jpg",
    alt: "Qbit Force facility walkthrough",
  },
  {
    id: "hero-3",
    type: "image",
    src: "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935962/Copy_of_IMG_20260415_121621_kykc6t.jpg",
    alt: "Quantum systems development at Qbit Force",
  },
  {
    id: "hero-1",
    type: "image",
    src: "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935959/Copy_of_IMG_20260414_144515_wl0abz.jpg",
    alt: "Qbit Force quantum facility",
  },
  
];

export const companyStoryImages: MediaImage[] = [
  {
    id: "company-1",
    title: "Amaravati Quantum Valley",
    caption: "Building indigenous quantum hardware at scale in Andhra Pradesh.",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780937130/WhatsApp_Image_2026-06-07_at_6.53.46_PM_vshegz.jpg",
    category: "facility",
  },
  
 
];

export const newsMediaImages: MediaImage[] = [
  {
    id: "news-1",
    title: "SiliconIndia Exclusive Coverage",
    caption:
      "The Big Milestone in Amaravati That Unlocks India's Quantum Potential – featuring the launch of India's first open-access quantum facility.",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780937129/WhatsApp_Image_2026-06-07_at_6.53.49_PM_1_wmrujs.jpg",
    category: "news",
  },
  {
    id: "news-2",
    title: "Business India – Aiming for a Quantum Leap",
    caption:
      "Business India highlights Andhra Pradesh's quantum push and the inauguration of the Amaravati Quantum Reference Facility.",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780937129/WhatsApp_Image_2026-06-07_at_6.53.49_PM_ujd0wk.jpg",
    category: "news",
  },
  {
    id: "news-3",
    title: "Business India Magazine Feature",
    caption:
      "Speed and scale define Andhra Pradesh's quantum ambitions, showcasing Amaravati's emergence as a national quantum innovation hub.",
    imageUrl:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780937129/WhatsApp_Image_2026-06-07_at_6.53.48_PM_2_ymefan.jpg",
    category: "news",
  },
  
];

export type SiteVideo = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "facility" | "technology" | "events" | "education";
  src?: string;
  youtubeId?: string;
  poster?: string;
};

/** Site videos — update URLs here */
export const siteVideos: SiteVideo[] = [
  {
    id: "qf-video-1",
    title: "Qbit Force — Facility Walkthrough",
    description:
      "Walkthrough of our Amaravati quantum hardware facility: cryogenic assembly, control systems, and open-access platforms.",
    src: "https://res.cloudinary.com/dps46p3m8/video/upload/v1780935951/WhatsApp_Video_2026-06-07_at_7.40.37_PM_ij7kaw.mp4",
    poster:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935950/Copy_of_IMG_20260414_161438_zed6bs.jpg",
    duration: "—",
    category: "facility",
  },
  {
    id: "qf-video-2",
    title: "Qbit Force — Lab & Operations",
    description:
      "Inside our quantum hardware lab: manufacturing, assembly, and day-to-day operations at Qbit Force.",
    src: "https://res.cloudinary.com/dps46p3m8/video/upload/v1780935956/WhatsApp_Video_2026-06-07_at_7.52.46_PM_nmic6w.mp4",
    poster:
      "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935960/Copy_of_IMG_20260414_161532_l2o2mc.jpg",
    duration: "—",
    category: "facility",
  },
  {
    id: "qf-video-youtube-1",
    title: "Qbit Force — Featured Coverage",
    description:
      "Watch our latest featured video coverage on quantum hardware development in India.",
    youtubeId: "pIXXVpTbKh4",
    duration: "—",
    category: "events",
  },
  {
    id: "qf-video-youtube-2",
    title: "Qbit Force — Live Session",
    description:
      "Live stream from Qbit Force — quantum computing updates and facility highlights.",
    youtubeId: "0EvUWqsqC6g",
    duration: "—",
    category: "events",
  },
];
