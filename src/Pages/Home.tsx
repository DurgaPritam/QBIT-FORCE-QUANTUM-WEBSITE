import Hero from "../Components/Hero.tsx";
import CompanyStory from "../Components/CompanyStory.tsx";
import PeoplePrinciplesSection from "../Components/PeoplePrinciplesSection.tsx";
import LinkedBlogsSection from "../Components/LinkedBlogsSection.tsx";
import PressMediaHomeSection from "../Components/PressMediaHomeSection.tsx";
import GalleryHomeSection from "../Components/GalleryHomeSection.tsx";
import VideosHomeSection from "../Components/VideosHomeSection.tsx";
import { Link } from "react-router-dom";
import { partnerLogos } from "../content/mediaHub";

function Home() {

  return (
    <>
      {/* Hero + Company Story — normal scroll (no sticky pin) */}
      <div className="relative bg-surface-warm">
        <Hero />
        <div className="relative z-10 -mt-4 overflow-hidden rounded-t-[2rem] bg-white sm:-mt-6 sm:rounded-t-[2.5rem]">
          <div
            className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-petal via-blue-light to-petal"
            aria-hidden
          />
          <CompanyStory />
        </div>
      </div>

      <PeoplePrinciplesSection />

      <LinkedBlogsSection />

    

      <GalleryHomeSection />

      <VideosHomeSection />

      <section className="bg-gradient-to-b from-[#f7f5f2] to-surface-warm py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
              Collaborations
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.125rem)] font-bold text-text">
              Partners & Clients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              Working with institutions and industry leaders to advance India&apos;s National Quantum
              Mission from Amaravati.
            </p>
            <div
              className="mx-auto my-8 h-[3px] w-20 rounded-full bg-gradient-to-r from-petal via-blue-light to-petal"
              aria-hidden
            />
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {partnerLogos.map((partner) => (
                <div
                  key={partner.id}
                  className="flex h-20 w-36 items-center justify-center rounded-xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:h-24 sm:w-44"
                >
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      <section className="bg-surface-warm px-5 pb-16 pt-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-deep via-mid to-navy p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-12">
              <div className="max-w-lg">
                <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-petal">
                  Join the journey
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                  Built in Amaravati, for the World
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">
                  Partner on indigenous quantum hardware, explore our media hub, or build your career
                  with the team shaping India&apos;s quantum future.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col lg:min-w-[200px]">
                <Link
                  to="/contactus"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 font-display text-sm font-semibold text-deep transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Get in Touch
                </Link>
                <Link
                  to="/careers"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 font-display text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Careers
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 font-display text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

export default Home;
