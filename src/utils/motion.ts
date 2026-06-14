import type { Transition, Variants } from "framer-motion";

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Framer-style spring — snappy but smooth (hover / tap only) */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 1,
};

/** Scroll reveals disabled — content is visible immediately for smooth native scroll */
export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const blurUp: Variants = {
  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const wordReveal: Variants = {
  hidden: { opacity: 1, y: 0, rotateX: 0 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
};

export const stagger: Variants = {
  hidden: {},
  visible: {},
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {},
};

export const viewportOnce = { once: true, margin: "-80px" as const };

export const viewportTight = { once: true, margin: "-40px" as const };
