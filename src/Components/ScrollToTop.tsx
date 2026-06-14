import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./SmoothScroll.tsx";

function getScrollPaddingTop(): number {
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 84;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const offset = -getScrollPaddingTop();

    if (hash) {
      const id = hash.replace("#", "");
      const target = `#${id}`;

      if (lenis) {
        lenis.scrollTo(target, { offset, force: true });
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { force: true });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
}
