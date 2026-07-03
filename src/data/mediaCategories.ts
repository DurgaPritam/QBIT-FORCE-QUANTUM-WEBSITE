export type MediaCategory = "facility" | "events" | "hardware" | "team" | "news";

export const mediaCategories: { id: MediaCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "facility", label: "Facility" },
  { id: "events", label: "Events" },
  { id: "hardware", label: "Hardware" },
  { id: "team", label: "Team" },
  { id: "news", label: "News" },
];

export const mediaCategoryLabel: Record<MediaCategory, string> = {
  facility: "Facility",
  events: "Events",
  hardware: "Hardware",
  team: "Team",
  news: "News",
};

export const videoCategories = [
  { id: "all", label: "All" },
  { id: "facility", label: "Facility" },
  { id: "technology", label: "Technology" },
  { id: "events", label: "Events" },
  { id: "education", label: "Education" },
] as const;
