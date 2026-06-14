import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EditorialContactForm from "../Components/EditorialContactForm";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Contact"
        title="Let's Build Together"
        intro="Connect with us to explore our quantum hardware platforms, partnerships, and opportunities from Amaravati to the world."
        chips={[
          { label: "Send enquiry", href: "#contact-form" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/press" },
        ]}
      />

      <PageContentSection id="contact-form">
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl border border-green-600/25 bg-green-600/[0.08] px-4 py-4 text-sm leading-relaxed text-green-700 sm:mb-8 sm:px-6"
            role="status"
          >
            <strong className="mb-1 block font-display">Thank you!</strong>
            Your email client should open with your message ready to send.
          </motion.div>
        )}

        <EditorialContactForm onSubmitted={() => setSubmitted(true)} />

        <p className="mt-6 text-center text-sm text-text-muted sm:mt-8">
          Prefer email?{" "}
          <a
            href="mailto:Info@qbitforcequantum.com"
            className="font-semibold text-navy no-underline hover:text-petal"
          >
            Info@qbitforcequantum.com
          </a>
          {" · "}
          <Link to="/press" className="font-semibold text-navy no-underline hover:text-petal">
            Media enquiries
          </Link>
        </p>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default ContactUs;
