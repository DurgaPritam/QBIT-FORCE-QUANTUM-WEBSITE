import { useMemo, useState } from "react";
import { useGalleryItems } from "../hooks/useApiContent";
import BentoGallery from "../Components/BentoGallery";
import MediaCategoryFilter from "../Components/MediaCategoryFilter";
import FramerPageHero, { FramerPageShell, mediaPageSectionClass, PageContentSection } from "../Components/FramerPageHero";
import { mediaCategories } from "../data/mediaCategories";
import { computeBentoGridLayout, defaultBentoSpanConfig } from "../utils/bentoGridLayout";

const GRID_COLUMNS = 3;

function galleryGridRows(imageCount: number): number {
  if (imageCount <= 0) return 3;
  const spanConfig = defaultBentoSpanConfig();
  let rows = 3;
  while (
    computeBentoGridLayout(GRID_COLUMNS, rows, imageCount, true, spanConfig).filter(
      (cell) => cell.imageIndex !== null,
    ).length < imageCount
  ) {
    rows++;
  }
  return rows;
}

function Gallery() {
  const { items: galleryItems } = useGalleryItems();
  const [category, setCategory] = useState("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: galleryItems.length };
    for (const cat of mediaCategories) {
      if (cat.id !== "all") counts[cat.id] = 0;
    }
    for (const item of galleryItems) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [galleryItems]);

  const filteredItems = useMemo(
    () => (category === "all" ? galleryItems : galleryItems.filter((item) => item.category === category)),
    [galleryItems, category],
  );

  const gridRows = galleryGridRows(filteredItems.length);

  const bentoImages = filteredItems.map((item) => ({
    src: item.imageUrl,
    alt: item.title,
    title: item.title,
    caption: item.caption,
  }));

  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Media"
        title="Gallery"
        intro="Explore our Amaravati quantum facility — cryogenic systems, hardware platforms, and the people building India's white-box quantum stack."
        chips={[
          { label: "View photos", href: "#gallery" },
          { label: "Videos", href: "/videos" },
          { label: "Publications", href: "/publications" },
        ]}
      />

      <PageContentSection id="gallery" className={mediaPageSectionClass}>
        <div className="mb-4">
          <p className="mb-2 font-display text-sm font-bold text-navy">Filter by category</p>
          <MediaCategoryFilter value={category} onChange={setCategory} counts={categoryCounts} />
        </div>

        {filteredItems.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-sm text-text-muted">
            No gallery items in this category yet.
          </p>
        ) : (
          <BentoGallery
            images={bentoImages}
            gap={6}
            borderRadius={16}
            enableSpanning={filteredItems.length > 0}
            enableLightbox
            minHeight={Math.max(560, gridRows * 200)}
            spanConfig={[{ imageIndex: 0, colSpan: 2, rowSpan: 2 }]}
            gridColumns={GRID_COLUMNS}
            gridRows={gridRows}
          />
        )}
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Gallery;
