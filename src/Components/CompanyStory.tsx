import { Link } from "react-router-dom";
import { companyStoryImages } from "../content/mediaHub";
import LazyImage from "./LazyImage";

function CompanyStory() {
  const storyImage = companyStoryImages[0];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
              About Qbit Force
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-text">
              Built in Amaravati,
              <span className="mt-1 block text-navy">for the World</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
              Qbit Force Quantum is Andhra Pradesh&apos;s indigenous quantum hardware facility —
              developing dilution refrigerators, superconducting qubits, and open-access platforms
              at scale from Amaravati Quantum Valley.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              At the foundation stone ceremony, leadership announced an MoU to establish two quantum
              computers in Amaravati — catalyzing a high-tech ecosystem for research, industry, and
              MSME participation across India.
            </p>
            <Link
              to="/company"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-petal transition hover:gap-3"
            >
              Learn more about us
              <span aria-hidden>→</span>
            </Link>
          </div>

          <figure className="group overflow-hidden rounded-xl border border-border shadow-sm">
            <div className="aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
              <LazyImage
                src={storyImage.imageUrl}
                alt={storyImage.title}
                optimizeWidth={900}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-border bg-white p-3 sm:p-4">
              <p className="font-display text-xs font-semibold text-navy sm:text-sm">{storyImage.title}</p>
              <p className="mt-0.5 text-[0.6875rem] leading-snug text-text-muted sm:text-xs">
                {storyImage.caption}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default CompanyStory;
