import { useState } from "react";
import { galleryItems } from "../data/galleryData";
import BentoGallery from "../Components/BentoGallery";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";

const ITEMS_PER_PAGE = 9;

function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / ITEMS_PER_PAGE));
  const pageItems = galleryItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const bentoImages = pageItems.map((item) => ({
    src: item.imageUrl,
    alt: item.title,
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

      <PageContentSection id="gallery">
          <BentoGallery
            images={bentoImages}
            gap={10}
            borderRadius={20}
            enableSpanning
            enableLightbox
            minHeight={560}
            spanConfig={[{ imageIndex: 0, colSpan: 2, rowSpan: 2 }]}
            gridColumns={3}
            gridRows={3}
          />

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-2.5 w-2.5 cursor-pointer rounded-full border-none transition-colors ${
                    currentPage === page ? "bg-navy" : "bg-border hover:bg-navy/40"
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-navy text-white transition hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                →
              </button>
            </div>
          )}
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Gallery;
