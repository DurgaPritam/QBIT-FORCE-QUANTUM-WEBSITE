/**
 * Scroll-linked timeline — adapted from Framer Scroll Timeline
 * https://framer.com/m/Scrolltimeline-INOzsL.js@ccv8WeYmtnL7Lr8K5f2e
 */
import type { ScrollTimelineItem } from "../content/journeySection";
import { useEffect, useRef, type CSSProperties } from "react";
import { animate, useMotionValue, useMotionValueEvent, type Transition } from "framer-motion";

export type { ScrollTimelineItem };

export type ScrollTimelineFont = CSSProperties;

export type ScrollTimelineProps = {
  items: ScrollTimelineItem[];
  labelFont?: ScrollTimelineFont;
  labelOpacity?: number;
  descFont?: ScrollTimelineFont;
  yearFont?: ScrollTimelineFont;
  frameBackground?: string;
  cornerRadius?: number;
  frameInset?: number;
  panelPadding?: string;
  headerMaxWidth?: number;
  totalScrollHeight?: string;
  scrollTransition?: Transition;
};

const defaultLabelFont: ScrollTimelineFont = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: "0.14em",
  lineHeight: "1.2em",
};

const defaultDescFont: ScrollTimelineFont = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(1rem, 2vw, 1.25rem)",
  lineHeight: "1.55em",
};

const defaultYearFont: ScrollTimelineFont = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 900,
  fontSize: "clamp(4rem, 14vw, 13.5rem)",
  lineHeight: "0.78em",
};

function applyPanelState(
  panels: HTMLElement[],
  scaled: number,
) {
  const n = panels.length;
  const idx = Math.min(n - 2, Math.floor(scaled));
  const t = scaled - idx;

  panels.forEach((panel, i) => {
    const year = panel.querySelector<HTMLElement>(".year");
    if (!year) return;

    if (i < idx) {
      panel.style.clipPath = "inset(0 0 0 100%)";
      year.style.transform = "rotate(-90deg)";
    } else if (i === idx) {
      const visible = 1 - t;
      panel.style.clipPath = `inset(0 ${(1 - visible) * 100}% 0 0)`;
      year.style.transform = `rotate(${-90 * t}deg)`;
    } else if (i === idx + 1) {
      const visible = t;
      panel.style.clipPath = `inset(0 0 0 ${(1 - visible) * 100}%)`;
      year.style.transform = "rotate(0deg)";
    } else {
      panel.style.clipPath = "inset(0 0 0 100%)";
      year.style.transform = "rotate(0deg)";
    }

    panel.style.zIndex = String(i);
  });
}

export default function ScrollTimeline({
  items,
  labelFont = defaultLabelFont,
  labelOpacity = 0.75,
  descFont = defaultDescFont,
  yearFont = defaultYearFont,
  frameBackground = "#000010",
  cornerRadius = 28,
  frameInset = 24,
  panelPadding = "48px",
  headerMaxWidth = 480,
  totalScrollHeight = "600vh",
  scrollTransition = { type: "tween", ease: "linear", duration: 0 },
}: ScrollTimelineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const panels = Array.from(wrap.querySelectorAll<HTMLElement>(".panel"));
    const n = panels.length;
    if (!n) return;

    function update() {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      let raw = total > 0 ? -rect.top / total : 0;
      raw = Math.min(1, Math.max(0, raw));
      const scaled = raw * (n - 1);
      animate(progress, scaled, scrollTransition);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    applyPanelState(panels, 0);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length, progress, scrollTransition]);

  useMotionValueEvent(progress, "change", (v) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const panels = Array.from(wrap.querySelectorAll<HTMLElement>(".panel"));
    if (!panels.length) return;
    applyPanelState(panels, Math.min(items.length - 1, Math.max(0, v)));
  });

  const sharedStyle = `
    .scroll-timeline-frame {
      position: sticky;
      top: calc(var(--nav-height, 76px) + ${frameInset}px);
      height: calc(100dvh - var(--nav-height, 76px) - ${frameInset * 2}px);
      margin: 0 ${frameInset}px;
      border-radius: ${cornerRadius}px;
      overflow: hidden;
      background: ${frameBackground};
    }
    .scroll-timeline-panel {
      position: absolute;
      inset: 0;
      clip-path: inset(0 0 0 100%);
    }
    .scroll-timeline-panel-inner {
      position: relative;
      height: 100%;
      padding: ${panelPadding};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }
    .scroll-timeline-header {
      align-self: flex-end;
      max-width: ${headerMaxWidth}px;
      text-align: left;
    }
    .scroll-timeline-eyebrow {
      display: block;
      text-transform: uppercase;
      opacity: ${labelOpacity};
      margin-bottom: 10px;
    }
    .scroll-timeline-desc {
      margin: 0;
    }
    .scroll-timeline-year {
      margin: 0;
      transform-origin: left bottom;
      will-change: transform;
    }
    @media (max-width: 640px) {
      .scroll-timeline-frame {
        margin: 0 12px;
        top: calc(var(--nav-height, 72px) + 8px);
        height: calc(100dvh - var(--nav-height, 72px) - 16px);
        border-radius: 20px;
      }
      .scroll-timeline-panel-inner {
        padding: 24px 20px;
      }
    }
  `;

  return (
    <div ref={wrapRef} className="scroll-timeline" style={{ height: totalScrollHeight }}>
      <style>{sharedStyle}</style>
      <div className="scroll-timeline-frame">
        {items.map((item, i) => (
          <section
            key={`${item.eyebrow}-${i}`}
            className="scroll-timeline-panel panel"
            style={{ background: item.bg, color: item.fg }}
          >
            <div className="scroll-timeline-panel-inner panel-inner">
              <div className="scroll-timeline-header panel-header">
                <span className="scroll-timeline-eyebrow eyebrow" style={labelFont}>
                  {item.eyebrow}
                </span>
                <p className="scroll-timeline-desc desc" style={descFont}>
                  {item.desc}
                </p>
              </div>
              <h2 className="scroll-timeline-year year" style={yearFont} aria-hidden>
                {item.year}
              </h2>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
