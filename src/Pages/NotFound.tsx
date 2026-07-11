import { Link } from "react-router-dom";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";

function NotFound() {
  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="404"
        title="Page not found"
        intro="The page you’re looking for doesn’t exist or may have moved."
        chips={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contactus" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />
      <PageContentSection>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm text-text-muted sm:text-base">
            Check the URL, or head back to the homepage to continue exploring Qbit Force Quantum.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 font-display text-sm font-semibold text-white no-underline transition hover:bg-petal"
          >
            Back to home
          </Link>
        </div>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default NotFound;
