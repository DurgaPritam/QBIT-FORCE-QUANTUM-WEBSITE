const DEFAULT_CONTACT_EMAIL = "info@qbitforcequantum.com";
const DEFAULT_SITE_URL = "https://qbitforcequantum.com";

/** Public site URL — set via VITE_SITE_URL in .env */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/$/, "");

/** Public contact email — set via VITE_CONTACT_EMAIL in .env */
export const CONTACT_EMAIL = (
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL
).toLowerCase();

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

/** Display label (capitalized local part for branding consistency). */
export const CONTACT_EMAIL_DISPLAY = (() => {
  const [local, domain] = CONTACT_EMAIL.split("@");
  if (!domain) return CONTACT_EMAIL;
  return `${local.charAt(0).toUpperCase()}${local.slice(1)}@${domain}`;
})();
