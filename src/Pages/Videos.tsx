import VideoBentoGallery from "../Components/VideoBentoGallery";
import FramerPageHero, { FramerPageShell, mediaPageSectionClass, PageContentSection } from "../Components/FramerPageHero";
import { MediaLoadState, useVideos } from "../hooks/useApiContent";

function Videos() {
  const { items: videos, loading, error } = useVideos();

  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Watch & Learn"
        title="Videos"
        intro="Facility tours, lab footage, and curated coverage on quantum computing in India — hover to preview, click for fullscreen playback."
        chips={[
          { label: "Browse videos", href: "#videos" },
          { label: "Gallery", href: "/gallery" },
          { label: "Press & Media", href: "/press" },
        ]}
      />

      <PageContentSection id="videos" className={mediaPageSectionClass}>
        {loading || error || videos.length === 0 ? (
          <MediaLoadState
            loading={loading}
            error={error}
            empty={!loading && !error && videos.length === 0}
            emptyMessage="No videos yet."
          />
        ) : (
          <VideoBentoGallery
            videos={videos}
            gap={6}
            borderRadius={16}
            enableSpanning
            hoverAutoplay
            minHeight={560}
            spanConfig={[{ imageIndex: 0, colSpan: 2, rowSpan: 2 }]}
            gridColumns={3}
            gridRows={3}
          />
        )}
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Videos;
