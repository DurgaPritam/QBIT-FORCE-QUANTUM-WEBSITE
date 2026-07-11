import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EditorialContactForm from "../Components/EditorialContactForm";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";
import { CONTACT_EMAIL_DISPLAY, CONTACT_MAILTO } from "../config/site";

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
            Your enquiry has been received. Our team will get back to you within one business day.
          </motion.div>
        )}

        <EditorialContactForm onSubmitted={() => setSubmitted(true)} />

        <p className="mt-6 text-center text-sm text-text-muted sm:mt-8">
          Prefer email?{" "}
          <a
            href={CONTACT_MAILTO}
            className="font-semibold text-navy no-underline hover:text-petal"
          >
            {CONTACT_EMAIL_DISPLAY}
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
