import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";
import { newsMediaImages, type MediaImage } from "../content/mediaHub";
import type { Article } from "../data/articlesData";
import type { GalleryItem } from "../data/galleryData";
import type { VideoItem } from "../data/videosData";
import { galleryItems as staticGallery } from "../data/galleryData";
import { articles as staticArticles } from "../data/articlesData";
import { videos as staticVideos } from "../data/videosData";

function mapPressStatic(): MediaImage[] {
  return newsMediaImages;
}

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

export function useGalleryItems() {
  const [items, setItems] = useState<GalleryItem[]>(staticGallery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<GalleryItem[]>("/public/gallery")
      .then((data) => {
        if (data.length > 0) setItems(sortByOrder(dedupeGalleryById(data)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function useVideos() {
  const [items, setItems] = useState<VideoItem[]>(staticVideos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<VideoItem[]>("/public/videos")
      .then((data) => {
        if (data.length > 0) {
          setItems(
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
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function useArticles() {
  const [items, setItems] = useState<Article[]>(staticArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<Article[]>("/public/publications")
      .then((data) => {
        if (data.length > 0) setItems(sortByOrder(data));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePressMedia() {
  const [items, setItems] = useState<MediaImage[]>(mapPressStatic());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<MediaImage[]>("/public/press")
      .then((data) => {
        if (data.length > 0) setItems(sortByOrder(data));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
