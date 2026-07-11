import type { Article, GalleryItem, PressMediaItem, VideoItem } from "../../api/types";

export const inputClass = "rounded-lg border border-border px-3 py-2 text-sm w-full";

/** Build a URL-safe id from a media title. */
export function slugifyTitle(title: string): string {
  const base = title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || `item-${Date.now()}`;
}

export function emptyGallery(): GalleryItem {
  return { id: "", title: "", caption: "", category: "facility", imageUrl: "", sortOrder: 1, active: true };
}

export function emptyVideo(): VideoItem {
  return {
    id: "",
    title: "",
    description: "",
    duration: "—",
    category: "facility",
    src: "",
    youtubeId: "",
    thumbnail: "",
    sortOrder: 1,
    active: true,
  };
}

export function emptyArticle(): Article {
  return {
    id: "",
    title: "",
    excerpt: "",
    date: new Date().toISOString().slice(0, 10),
    category: "publication",
    readTime: "3 min",
    author: "",
    featured: false,
    imageUrl: "",
    link: "",
    sortOrder: 1,
    active: true,
  };
}

export function emptyPress(): PressMediaItem {
  return { id: "", title: "", caption: "", category: "news", imageUrl: "", sortOrder: 1, active: true };
}

export function SortOrderField({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">
        Display order (1 = first)
      </label>
      <input
        type="number"
        min={1}
        value={value ?? 1}
        onChange={(e) => onChange(Number(e.target.value) || 1)}
        className={inputClass}
      />
    </div>
  );
}

export function TitleField({ value, onChange }: { value: string; onChange: (title: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Title</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Title shown on the website"
        className={inputClass}
        required
      />
    </div>
  );
}

export function CaptionField({
  value,
  onChange,
  rows = 2,
}: {
  value: string;
  onChange: (caption: string) => void;
  rows?: number;
}) {
  return (
    <div className="sm:col-span-2">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Caption</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Caption shown below the title on the website"
        className={inputClass}
        rows={rows}
      />
    </div>
  );
}
