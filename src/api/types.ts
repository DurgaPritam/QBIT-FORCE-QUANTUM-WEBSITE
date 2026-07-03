export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: "facility" | "events" | "hardware" | "team" | "news";
  imageUrl: string;
  sortOrder?: number;
  active?: boolean;
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "facility" | "technology" | "events" | "education";
  src?: string;
  youtubeId?: string;
  thumbnail?: string;
  sortOrder?: number;
  active?: boolean;
};

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
  sortOrder?: number;
  active?: boolean;
};

export type PressMediaItem = {
  id: string;
  title: string;
  caption: string;
  category: "facility" | "events" | "hardware" | "team" | "news";
  imageUrl: string;
  sortOrder?: number;
  active?: boolean;
};

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
  emailSent: boolean;
  read: boolean;
  createdAt: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  username: string;
};

export type AdminStats = {
  gallery: number;
  videos: number;
  publications: number;
  press: number;
  contacts: number;
  unreadContacts: number;
};
