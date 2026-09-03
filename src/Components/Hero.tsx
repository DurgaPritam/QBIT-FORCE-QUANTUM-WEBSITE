import { Link } from "react-router-dom";
import { heroVideoUrl } from "../content/mediaHub";

function Hero() {
  return (
    <section className="relative z-0 mt-[var(--nav-height)] h-[calc(100dvh-var(--nav-height))] w-full max-w-none overflow-hidden">
      {/* Background video — machine stays on the right */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-right"
        src={heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Qbit Force quantum hardware facility"
      />

      {/* Cover left + middle so the right-side object stays clear */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[72%] sm:w-[65%] lg:w-[58%]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/85 to-deep/40 sm:from-deep/95 sm:via-deep/75 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
        <div className="w-full max-w-[min(100%,36rem)] sm:max-w-xl lg:max-w-2xl">
          <h1 className="font-display text-[clamp(1.75rem,4.5vw,3.15rem)] font-bold leading-[1.1] tracking-tight text-white">
            Indigenous{" "}
            <span className="text-petal">Quantum Hardware</span>
            <span className="mt-1 block text-white">for Global Markets</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Building indigenous quantum systems from Amaravati — dilution refrigerators,
            superconducting qubits, and open-access platforms for the world.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-7">
            <Link
              to="/contactus"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-petal px-6 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-black/25 transition-colors duration-200 hover:bg-petal-hover"
            >
              Get in Touch
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/company"
              className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-6 py-3 font-display text-sm font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20"
            >
              Our mission
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
