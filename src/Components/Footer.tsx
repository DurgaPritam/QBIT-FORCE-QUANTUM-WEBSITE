import { Link } from "react-router-dom";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { footerLogoUrl } from "../content/mediaHub";
import LazyImage from "./LazyImage";

const taglines = [
  "Quantum Hardware",
  "Cryogenics",
  "Amaravati Quantum Valley",
];

const mainLinks = [
  { to: "/products", label: "Products" },
  { to: "/company", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Careers" },
  { to: "/contactus", label: "Contact us" },
];

const legalLinks = [
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/privacypolicy", label: "Privacy Policy" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/qbit-force/posts/?feedView=all",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://x.com/qbit_force",
    label: "X (Twitter)",
    icon: FaXTwitter,
  },
  {
    href: "mailto:Info@qbitforcequantum.com",
    label: "Email",
    icon: FaEnvelope,
  },
  {
    href: "https://www.qbitforcequantum.com",
    label: "Website",
    icon: null,
  },
];

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3 12h18M12 3c2.5 2.8 4 5.8 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 5.8-4 9s1.5 6.2 4 9"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center sm:px-5 sm:py-16 lg:py-20">
        <Link to="/" className="inline-block no-underline transition hover:opacity-90">
          <LazyImage
            src={footerLogoUrl}
            alt="Qbit Force Quantum"
            optimizeWidth={440}
            className="mx-auto h-12 w-auto max-w-[220px] rounded-xl object-contain sm:h-14"
          />
        </Link>

        <p className="mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-[0.6875rem] sm:tracking-[0.18em]">
          {taglines.map((line, index) => (
            <span key={line} className="inline-flex items-center gap-2">
              {index > 0 && (
                <span className="text-white/30" aria-hidden>
                  •
                </span>
              )}
              {line}
            </span>
          ))}
        </p>

        <div className="mt-8 h-px w-full bg-white/10" aria-hidden />

        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10"
          aria-label="Footer navigation"
        >
          {mainLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-display text-sm font-medium text-white/90 no-underline transition hover:text-petal sm:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-base text-white no-underline transition hover:bg-white/20 hover:text-petal"
              >
                {Icon ? <Icon /> : <WebsiteIcon />}
              </a>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-xs text-white/45 sm:text-[0.8125rem]">
          {legalLinks.map((link, index) => (
            <span key={link.to} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-white/25" aria-hidden>
                  |
                </span>
              )}
              <Link to={link.to} className="text-white/45 no-underline transition hover:text-white">
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/40 sm:text-[0.8125rem]">
          © {new Date().getFullYear()} Qbit Force Quantum Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
