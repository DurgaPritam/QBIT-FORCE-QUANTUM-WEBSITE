import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PressBentoGallery from "../Components/PressBentoGallery";
import MediaCategoryFilter from "../Components/MediaCategoryFilter";
import FramerPageHero, { FramerPageShell, mediaPageSectionClass, PageContentSection } from "../Components/FramerPageHero";
import { usePressMedia } from "../hooks/useApiContent";
import { mediaCategories } from "../data/mediaCategories";

function Press() {
  const { items: newsMediaImages } = usePressMedia();
  const [category, setCategory] = useState("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: newsMediaImages.length };
    for (const cat of mediaCategories) {
      if (cat.id !== "all") counts[cat.id] = 0;
    }
    for (const item of newsMediaImages) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [newsMediaImages]);

  const filteredItems = useMemo(
    () => (category === "all" ? newsMediaImages : newsMediaImages.filter((item) => item.category === category)),
    [newsMediaImages, category],
  );

  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Press & Media"
        title="In the News"
        intro="Press coverage and media features on Qbit Force Quantum, Amaravati Quantum Valley, and India's quantum computing roadmap."
        chips={[
          { label: "Coverage", href: "#press" },
          { label: "Gallery", href: "/gallery" },
          { label: "Publications", href: "/publications" },
        ]}
      />

      <PageContentSection id="press" className={mediaPageSectionClass}>
        <div className="mb-4">
          <p className="mb-2 font-display text-sm font-bold text-navy">Filter by category</p>
          <MediaCategoryFilter value={category} onChange={setCategory} counts={categoryCounts} />
        </div>

        {filteredItems.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-sm text-text-muted">
            No press items in this category yet.
          </p>
        ) : (
          <PressBentoGallery items={filteredItems} />
        )}

        <div className="mt-6 rounded-2xl border-b-[3px] border-b-petal bg-gradient-to-br from-deep to-mid p-5 text-center sm:mt-8 sm:p-8">
          <p className="mb-5 text-sm text-white/90 sm:text-lg">Media & press enquiries</p>
          <Link
            to="/contactus"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-petal px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#e01820] sm:px-7"
          >
            Contact Media Relations
          </Link>
        </div>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Press;
