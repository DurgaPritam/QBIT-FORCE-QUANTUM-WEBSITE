import type { MediaImage } from "../content/mediaHub";

export type GalleryItem = {
  /** Unique slug — matches admin Slug field and frontend media id. */
  id: string;
  title: string;
  caption: string;
  category: "facility" | "events" | "hardware" | "team" | "news";
  imageUrl: string;
  /** Lower value appears first on the site (1 = first). */
  sortOrder?: number;
};

const GALLERY_IMAGE_URLS = {
  quantumFrontierLaunch:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935950/Copy_of_IMG_20260414_161438_zed6bs.jpg",
  leadershipInauguration:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1780935959/Copy_of_IMG_20260414_144515_wl0abz.jpg",
  amaravatiFacility:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1780937130/WhatsApp_Image_2026-06-07_at_6.53.46_PM_vshegz.jpg",
  srmLeadershipVisit:
    "https://res.cloudinary.com/dps46p3m8/image/upload/v1782461778/WhatsApp_Image_2026-06-25_at_10.20.07_PM_lxrjmn.jpg",
} as const;

/** Static gallery fallback — synced with admin CMS slugs; deduped by image URL. */
const rawGalleryItems: GalleryItem[] = [
  {
    id: "gallery-quantum-frontier-launch",
    title: "India's First Open Access Quantum Frontier",
    caption:
      "Launch of the Amaravati Quantum Reference Facilities at SRM University Amaravati — built in Amaravati, open to India, for the world.",
    category: "events",
    imageUrl: GALLERY_IMAGE_URLS.quantumFrontierLaunch,
    sortOrder: 1,
  },
  {
    id: "gallery-leadership-inauguration",
    title: "Quantum Leadership at Amaravati",
    caption:
      "Dignitaries and partners at the inauguration of India's open-access quantum frontier.",
    category: "events",
    imageUrl: GALLERY_IMAGE_URLS.leadershipInauguration,
    sortOrder: 2,
  },
  {
    id: "company-1",
    title: "Amaravati Quantum Valley",
    caption: "Building indigenous quantum hardware at scale in Andhra Pradesh.",
    category: "facility",
    imageUrl: GALLERY_IMAGE_URLS.amaravatiFacility,
    sortOrder: 3,
  },
  {
    id: "gallery-srm-leadership-visit",
    title: "Leadership Visit at SRM University AP",
    caption:
      "Reviewing quantum and computing innovations with students and faculty at SRM University AP.",
    category: "events",
    imageUrl: GALLERY_IMAGE_URLS.srmLeadershipVisit,
    sortOrder: 4,
  },
];

function dedupeGalleryItems(items: GalleryItem[]): GalleryItem[] {
  const seenUrls = new Set<string>();
  const seenIds = new Set<string>();
  return items.filter((item) => {
    const url = item.imageUrl.trim();
    if (!url || seenUrls.has(url) || seenIds.has(item.id)) return false;
    seenUrls.add(url);
    seenIds.add(item.id);
    return true;
  });
}

export const galleryItems: GalleryItem[] = dedupeGalleryItems(rawGalleryItems);

/** Map company story images without duplicating gallery entries. */
export function galleryItemsExcludingStory(storyImages: MediaImage[]): GalleryItem[] {
  const galleryUrls = new Set(galleryItems.map((g) => g.imageUrl));
  return storyImages
    .filter((item) => !galleryUrls.has(item.imageUrl))
    .map((item, index) => ({
      id: item.id,
      title: item.title,
      caption: item.caption,
      category: item.category === "news" ? ("facility" as const) : item.category,
      imageUrl: item.imageUrl,
      sortOrder: galleryItems.length + index + 1,
    }));
}
