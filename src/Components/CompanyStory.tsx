import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const STORY_IMAGE_URL =
  "https://res.cloudinary.com/dps46p3m8/image/upload/v1788281148/DEPU0440.JPG_1_yfk1gj.jpg";

function CompanyStory() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
              About Qbit Force
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.375rem,3.25vw,2.125rem)] font-bold leading-tight tracking-tight text-text">
              Built in Amaravati, <span className="text-navy">for the World</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-text-muted sm:text-base">
              Qbit Force Quantum is building Andhra Pradesh&apos;s indigenous quantum hardware
              capabilities from Amaravati Quantum Valley. The company is developing dilution refrigerators, superconducting qubits, and
              open-access quantum computing platforms to support research, industry, startups, and
              MSMEs.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
              At the foundation stone ceremony, an MOU was announced to establish two quantum
              computers in Amaravati, marking a major step toward creating a strong quantum
              technology ecosystem in Andhra Pradesh and across India.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
              Qbit Force Quantum is helping put Andhra Pradesh at the forefront of India&apos;s
              quantum revolution.
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
                src={STORY_IMAGE_URL}
                alt="Qbit Force Quantum Reference Facility — dilution refrigerator and control systems"
                optimizeWidth={900}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-border bg-white p-3 sm:p-4">
              <p className="font-display text-xs font-semibold text-navy sm:text-sm">
                Amaravati Quantum Valley
              </p>
              <p className="mt-0.5 text-[0.6875rem] leading-snug text-text-muted sm:text-xs">
                Building indigenous quantum hardware at scale in Andhra Pradesh.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default CompanyStory;
