import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCollection,
  HiOutlineDocumentText,
  HiOutlineFilm,
  HiOutlineInbox,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { apiRequest } from "../../api/client";
import { useAdminRefresh } from "./AdminLayout";
import type { AdminStats } from "../../api/types";

const sections = [
  {
    key: "contacts" as const,
    label: "Inbox",
    path: "contacts",
    description: "Contact form messages",
    icon: HiOutlineInbox,
    accent: "bg-petal/10 text-petal ring-petal/20",
  },
  {
    key: "gallery" as const,
    label: "Gallery",
    path: "gallery",
    description: "Photos & facility media",
    icon: HiOutlineCollection,
    accent: "bg-navy/10 text-navy ring-navy/15",
  },
  {
    key: "videos" as const,
    label: "Videos",
    path: "videos",
    description: "Tours & coverage",
    icon: HiOutlineFilm,
    accent: "bg-mid/10 text-mid ring-mid/15",
  },
  {
    key: "publications" as const,
    label: "Publications",
    path: "publications",
    description: "Articles & insights",
    icon: HiOutlineDocumentText,
    accent: "bg-navy/10 text-navy ring-navy/15",
  },
  {
    key: "press" as const,
    label: "Press & Media",
    path: "press",
    description: "News & press coverage",
    icon: HiOutlineNewspaper,
    accent: "bg-petal/10 text-petal ring-petal/20",
  },
];

export default function AdminHome() {
  const { refreshKey } = useAdminRefresh();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    apiRequest<AdminStats>("/admin/stats", { auth: true })
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load stats"));
  }, [refreshKey]);

  const totalItems = stats
    ? stats.gallery + stats.videos + stats.publications + stats.press
    : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <section className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-petal via-[#e01820] to-[#9a1018] p-5 text-white shadow-lg sm:rounded-3xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/60">Admin CMS</p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Dashboard</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Manage gallery, videos, publications, press media, and your contact inbox. Sessions expire after 1 hour -
              use Refresh to reload data.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold">{totalItems ?? "—"}</p>
              <p className="text-xs text-white/70">Total media</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold">{stats?.contacts ?? "—"}</p>
              <p className="text-xs text-white/70">Inbox</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm sm:col-span-1">
              <p className="text-2xl font-bold">{stats?.gallery ?? "—"}</p>
              <p className="text-xs text-white/70">Gallery</p>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <p className="rounded-xl border border-petal/30 bg-petal/5 px-4 py-3 text-sm text-petal">{error}</p>
      )}

      <section>
        <h2 className="font-display text-lg font-bold text-navy">What would you like to manage?</h2>
        <p className="mt-1 text-sm text-text-muted">Select a section to open.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const count = stats ? stats[section.key] : null;
            return (
              <Link
                key={section.key}
                to={`/qbitadmin-2026-login/dashboard/${section.path}`}
                className="group rounded-2xl border-2 border-border bg-white p-5 no-underline transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${section.accent}`}>
                  <Icon className="text-xl" />
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-navy group-hover:text-petal">{section.label}</h3>
                  <span className="font-display text-lg font-bold text-navy/40">{count ?? "—"}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{section.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
