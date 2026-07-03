import { siteVideos } from "../content/mediaHub";

export type VideoItem = {
  /** Unique slug — matches admin Slug field. */
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "facility" | "technology" | "events" | "education";
  src?: string;
  youtubeId?: string;
  thumbnail?: string;
  /** Lower value appears first on the site (1 = first). */
  sortOrder?: number;
};

export const videos: VideoItem[] = siteVideos.map((v, index) => ({
  id: v.id,
  title: v.title,
  description: v.description,
  duration: v.duration,
  category: v.category,
  src: v.src,
  youtubeId: v.youtubeId,
  thumbnail:
    v.poster ??
    (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : undefined),
  sortOrder: index + 1,
}));
