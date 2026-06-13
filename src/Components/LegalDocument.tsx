import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportTight } from "../utils/motion";

type LegalDocumentProps = {
  children: ReactNode;
};

export function LegalDocument({ children }: LegalDocumentProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportTight}
      variants={fadeUp}
      className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 lg:p-10 [&_h3:first-child]:mt-0 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy sm:[&_h3]:text-xl [&_h4]:mt-4 [&_h4]:font-display [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-navy [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-text-muted sm:[&_li]:text-[0.9375rem] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-text-muted sm:[&_p]:text-[1rem] sm:[&_p]:leading-[1.75] [&_strong]:font-semibold [&_strong]:text-navy [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
    >
      {children}
    </motion.div>
  );
}
