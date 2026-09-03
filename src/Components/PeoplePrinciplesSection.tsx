import { useEffect, useRef, useState } from "react";
import {
  principlesHeadline,
  principlesImpactRow,
  principlesTopRow,
  type PrinciplesPanel,
} from "../content/principlesSection";
import LazyImage from "./LazyImage";
import { cloudinaryImageUrl } from "../utils/cloudinary";

const solidStyles = {
  navy: "bg-navy text-white",
  petal: "bg-petal text-white",
  light: "bg-slate text-white",
};

const panelHeight =
  "min-h-[7.5rem] sm:min-h-[200px] lg:min-h-[300px]";

/** ~1/3 of max-w-6xl at 2x — keeps the bento grid fast without softening detail */
const PANEL_IMAGE_WIDTH = 800;

function ImagePanel({
  imageUrl,
  alt,
  eager = false,
}: {
  imageUrl: string;
  alt: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`group relative h-full w-full overflow-hidden bg-[#e8e6e3] ${panelHeight}`}
    >
      <LazyImage
        src={imageUrl}
        alt={alt}
        optimizeWidth={PANEL_IMAGE_WIDTH}
        eager={eager}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-300 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]`}
      />
      <div
        className={`absolute inset-0 bg-black/45 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-black/35 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
    </div>
  );
}

function SolidPanelBlock({ panel }: { panel: Extract<PrinciplesPanel, { type: "solid" }> }) {
  const textClass = panel.variant === "light" ? "text-text" : "text-white";
  const subClass = panel.variant === "light" ? "text-text-muted" : "text-white/75";

  return (
    <div
      className={`flex h-full w-full flex-col justify-end p-2 sm:p-5 lg:p-6 ${panelHeight} ${solidStyles[panel.variant]}`}
    >
      <h3 className={`font-display text-[0.625rem] font-bold leading-tight sm:text-lg sm:leading-snug ${textClass}`}>
        {panel.title}
      </h3>
      {panel.subtitle && (
        <p className={`mt-1 max-w-xs text-[0.5625rem] leading-snug sm:mt-1.5 sm:text-sm sm:leading-relaxed ${subClass}`}>
          {panel.subtitle}
        </p>
      )}
    </div>
  );
}

function Panel({
  panel,
  eagerImages = false,
}: {
  panel: PrinciplesPanel;
  eagerImages?: boolean;
}) {
  if (panel.type === "image") {
    return <ImagePanel imageUrl={panel.imageUrl} alt={panel.alt} eager={eagerImages} />;
  }
  return <SolidPanelBlock panel={panel} />;
}

function PeoplePrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [preloadImages, setPreloadImages] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreloadImages(true);
          observer.disconnect();
        }
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!preloadImages) return;

    const imagePanels = [...principlesTopRow, ...principlesImpactRow].filter(
      (panel): panel is Extract<PrinciplesPanel, { type: "image" }> => panel.type === "image",
    );

    imagePanels.forEach((panel) => {
      const img = new Image();
      img.src = cloudinaryImageUrl(panel.imageUrl, PANEL_IMAGE_WIDTH);
    });
  }, [preloadImages]);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-[clamp(1.35rem,3vw,2rem)] font-normal leading-tight tracking-tight text-text">
          {principlesHeadline.line1}
          <br />
          {principlesHeadline.line2}
        </h2>
      </div>

      <div className="mx-auto mt-6 max-w-6xl lg:mt-8">
        {/* Top row — 3 columns on all breakpoints (matches desktop layout) */}
        <div className="grid grid-cols-3 items-stretch gap-px bg-border sm:gap-0.5">
          {principlesTopRow.map((panel) => (
            <Panel key={panel.id} panel={panel} eagerImages={preloadImages} />
          ))}
        </div>

        {/* Bottom row — 3 columns on all breakpoints */}
        <div className="mt-px grid grid-cols-3 items-stretch gap-px bg-border sm:mt-0.5 sm:gap-0.5">
          {principlesImpactRow.map((panel) => (
            <Panel key={panel.id} panel={panel} eagerImages={preloadImages} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PeoplePrinciplesSection;
