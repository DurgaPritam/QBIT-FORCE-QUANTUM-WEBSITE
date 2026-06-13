import { Link } from "react-router-dom";
import PressBentoGallery from "../Components/PressBentoGallery";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";
import { newsMediaImages } from "../content/mediaHub";

function Press() {
  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Press & Media"
        title="In the News"
        intro="Press coverage and media features on Qbit Force Quantum, Amaravati Quantum Valley, and India's quantum computing roadmap."
        chips={[
          { label: "Coverage", href: "#press" },
          { label: "Gallery", href: "/gallery" },
          { label: "Publications", href: "/publications" },
        ]}
      />

      <PageContentSection id="press">
        <PressBentoGallery items={newsMediaImages} />

        <div className="mt-10 rounded-2xl border-b-[3px] border-b-petal bg-gradient-to-br from-deep to-mid p-6 text-center sm:mt-12 sm:p-10">
          <p className="mb-5 text-sm text-white/90 sm:text-lg">Media & press enquiries</p>
          <Link
            to="/contactus"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-petal px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#e01820] sm:px-7"
          >
            Contact Media Relations
          </Link>
        </div>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Press;
