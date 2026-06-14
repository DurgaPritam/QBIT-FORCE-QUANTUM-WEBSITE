import { useEffect, useState } from "react";
import { loadingScreenLogoUrl } from "../content/mediaHub";

type Props = {
  exiting: boolean;
  onExitComplete: () => void;
};

const FADE_OUT_MS = 450;

function LoadingScreen({ exiting, onExitComplete }: Props) {
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    setLogoVisible(false);
    const revealTimer = window.setTimeout(() => setLogoVisible(true), 80);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (!exiting) return;

    const timer = window.setTimeout(onExitComplete, FADE_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [exiting, onExitComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-deep via-mid to-navy ease-in-out ${
        exiting
          ? "pointer-events-none opacity-0 transition-opacity duration-[450ms]"
          : "opacity-100"
      }`}
      aria-hidden={exiting}
      aria-label="Loading Qbit Force"
      aria-busy={!exiting}
    >
      <div
        className={`relative flex flex-col items-center transition-all duration-700 ease-out ${
          logoVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } ${exiting ? "scale-105 opacity-0 transition-all duration-[450ms]" : ""}`}
      >
        <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
          <div className="absolute inset-0 animate-[splashRing_2.4s_linear_infinite] rounded-full border-2 border-transparent border-t-petal border-r-petal/40" />
          <div className="absolute inset-3 animate-[splashRing_3.2s_linear_infinite_reverse] rounded-full border border-transparent border-b-blue-light/70 border-l-blue-light/30" />
          <div className="animate-[splashPulse_2s_ease-in-out_infinite]">
            <img
              src={loadingScreenLogoUrl}
              alt="Qbit Force Quantum"
              className="h-20 w-20 object-contain sm:h-28 sm:w-28"
              width={112}
              height={112}
            />
          </div>
        </div>

        <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-sm">
          Qbit Force
        </p>

        <div className="relative mt-5 h-1 w-40 overflow-hidden rounded-full bg-white/15 sm:w-48">
          <div className="absolute inset-y-0 w-1/2 animate-[splashShimmer_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-petal to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
