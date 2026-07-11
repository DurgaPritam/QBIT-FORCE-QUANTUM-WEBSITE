import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";
import type { MediaImage } from "../content/mediaHub";
import type { Article } from "../data/articlesData";
import type { GalleryItem } from "../data/galleryData";
import type { VideoItem } from "../data/videosData";

export { MediaLoadState } from "../Components/MediaLoadState";

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

function dedupeGalleryById(items: GalleryItem[]): GalleryItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

type ContentState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

function usePublicList<T>(path: string, mapData: (data: T[]) => T[]): ContentState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiRequest<T[]>(path)
      .then((data) => {
        if (!cancelled) setItems(mapData(data));
      })
      .catch((err) => {
        if (!cancelled) {
          setItems([]);
          setError(err instanceof Error ? err.message : "Unable to load content. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // mapData is stable per hook call site for these public lists
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { items, loading, error };
}

export function useGalleryItems() {
  return usePublicList<GalleryItem>("/public/gallery", (data) =>
    sortByOrder(dedupeGalleryById(data)),
  );
}

export function useVideos() {
  return usePublicList<VideoItem>("/public/videos", (data) =>
    sortByOrder(
      data.map((v) => ({
        ...v,
        thumbnail:
          v.thumbnail ??
          (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : undefined),
      })),
    ),
  );
}

export function useArticles() {
  return usePublicList<Article>("/public/publications", (data) => sortByOrder(data));
}

export function usePressMedia() {
  return usePublicList<MediaImage>("/public/press", (data) => sortByOrder(data));
}
