import { Link } from "react-router-dom";
import { galleryItems } from "../data/galleryData";
import { useSectionPreload } from "../hooks/useSectionPreload";
import OptimizedCoverImage from "./OptimizedCoverImage";
import SectionViewAllLink from "./SectionViewAllLink";

const FEATURED_TILE_WIDTH = 960;
const MOSAIC_TILE_WIDTH = 480;

import { mediaCategoryLabel } from "../data/mediaCategories";

const GALLERY_HOME_ITEMS = galleryItems.slice(0, 5);

const GALLERY_PRELOAD_TARGETS = GALLERY_HOME_ITEMS.map((item, index) => ({
  url: item.imageUrl,
  width: index === 0 ? FEATURED_TILE_WIDTH : MOSAIC_TILE_WIDTH,
}));

function MosaicTile({
  item,
  className = "",
  large = false,
  eager = false,
}: {
  item: (typeof galleryItems)[0];
  className?: string;
  large?: boolean;
  eager?: boolean;
}) {
  return (
    <Link
      to="/gallery"
      className={`group relative block h-full overflow-hidden bg-deep ${className}`}
    >
      <OptimizedCoverImage
        src={item.imageUrl}
        alt={item.title}
        optimizeWidth={large ? FEATURED_TILE_WIDTH : MOSAIC_TILE_WIDTH}
        eager={eager}
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <span className="font-display text-[0.625rem] font-bold uppercase tracking-wider text-petal">
          {mediaCategoryLabel[item.category] ?? item.category}
        </span>
        <p
          className={`mt-0.5 font-display font-semibold leading-snug text-white ${
            large ? "text-sm sm:text-base" : "text-xs sm:text-sm"
          }`}
        >
          {item.title}
        </p>
        {item.caption && large && (
          <p className="mt-1 line-clamp-2 text-[0.65rem] leading-snug text-white/75 sm:text-xs">{item.caption}</p>
        )}
      </div>
    </Link>
  );
}

function GalleryHomeSection() {
  const { sectionRef, preload } = useSectionPreload(GALLERY_PRELOAD_TARGETS);
  const [featured, ...rest] = GALLERY_HOME_ITEMS;

  if (!featured) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-[#f7f5f2] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between lg:items-end">
          <div>
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
              Visual Stories
            </span>
            <h2 className="mt-1 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-text">
              Photo Gallery
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-text-muted sm:text-sm">
              Facility moments, quantum hardware, and events from Amaravati Quantum Valley.
            </p>
          </div>
          <SectionViewAllLink to="/gallery" />
        </div>

        <div className="mt-6 grid h-[320px] grid-cols-4 grid-rows-2 gap-2 sm:mt-8 sm:h-[380px] sm:gap-2.5 lg:h-[420px]">
          <MosaicTile
            item={featured}
            large
            eager={preload}
            className="col-span-2 row-span-2 rounded-l-xl sm:rounded-l-2xl"
          />
          {rest.slice(0, 2).map((item, i) => (
            <MosaicTile
              key={item.id}
              item={item}
              eager={preload}
              className={i === 1 ? "rounded-tr-xl sm:rounded-tr-2xl" : ""}
            />
          ))}
          {rest.slice(2, 4).map((item, i) => (
            <MosaicTile
              key={item.id}
              item={item}
              eager={preload}
              className={i === 1 ? "rounded-br-xl sm:rounded-br-2xl" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryHomeSection;
