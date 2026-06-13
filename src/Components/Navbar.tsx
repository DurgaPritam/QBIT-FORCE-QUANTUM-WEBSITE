import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { siteLogoUrl } from "../content/mediaHub";
import LazyImage from "./LazyImage";
import { easeOut, springSoft, springSnappy, stagger } from "../utils/motion";

const mediaLinks = [
  { to: "/gallery", label: "Gallery", desc: "Photos & events" },
  { to: "/publications", label: "Publications", desc: "Articles & research" },
  { to: "/videos", label: "Videos", desc: "Lab & media footage" },
  { to: "/press", label: "Press & Media", desc: "News & releases" },
];

const navLinkBase =
  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-medium no-underline transition hover:-translate-y-px";

function navLinkClass(active: boolean) {
  return active
    ? `${navLinkBase} border-2 border-petal bg-white font-semibold text-navy shadow-[0_4px_14px_rgba(255,30,38,0.15)] hover:bg-[#f7f5f2] hover:text-navy`
    : `${navLinkBase} border border-border/80 bg-white text-navy shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#f7f5f2] hover:text-navy`;
}

const navPillClass =
  "rounded-full border border-white/50 bg-white/25 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md";
const dropdownClass =
  "rounded-2xl border border-white/60 bg-white/90 p-2 shadow-[0_16px_48px_rgba(0,1,127,0.12)] backdrop-blur-xl";

const mobileItemReveal = {
  hidden: { opacity: 0, x: -28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOut },
  },
};

const mobileSubItemReveal = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
};

function MobileMenuToggle({ expanded, onClick }: { expanded: boolean; onClick: () => void }) {
  return (
    <button
      className="relative ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white p-0 text-navy shadow-sm transition hover:bg-[#f7f5f2] lg:hidden max-lg:mr-1.5 max-lg:h-12 max-lg:w-12"
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls="main-nav-menu"
      aria-label={expanded ? "Close navigation" : "Open navigation"}
    >
      <span className="relative block h-4 w-[22px]">
        <motion.span
          className="absolute left-0 top-0 block h-0.5 w-[22px] origin-center rounded-sm bg-current"
          animate={expanded ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={springSnappy}
        />
        <motion.span
          className="absolute left-0 top-[7px] block h-0.5 w-[22px] rounded-sm bg-current"
          animate={expanded ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute bottom-0 left-0 block h-0.5 w-[22px] origin-center rounded-sm bg-current"
          animate={expanded ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={springSnappy}
        />
      </span>
    </button>
  );
}

type MobileNavItem =
  | { type: "link"; label: string; to: string; active: boolean }
  | {
      type: "group";
      label: string;
      active: boolean;
      openKey: string;
      links: typeof mediaLinks;
    };

function MobileRevealNav({
  expanded,
  items,
  mobileOpenGroups,
  toggleMobileGroup,
  closeMenu,
  isActive,
}: {
  expanded: boolean;
  items: MobileNavItem[];
  mobileOpenGroups: Set<string>;
  toggleMobileGroup: (name: string) => void;
  closeMenu: () => void;
  isActive: (path: string) => boolean;
}) {
  return (
    <AnimatePresence>
      {expanded && (
        <>
          <motion.button
            type="button"
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="fixed bottom-0 left-0 right-0 top-[var(--nav-height)] z-[1001] border-none bg-[rgba(0,0,16,0.5)] backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />

          <motion.div
            key="mobile-panel"
            id="main-nav-menu"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 24px 24px)" }}
            animate={{ clipPath: "inset(0 0 0 0 round 0 0 24px 24px)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 24px 24px)" }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="fixed bottom-0 left-0 right-0 top-[var(--nav-height)] z-[1002] overflow-hidden bg-white shadow-[0_24px_64px_rgba(0,1,127,0.12)] lg:hidden"
          >
            <div className="flex h-full max-h-[calc(100dvh-var(--nav-height))] flex-col">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: easeOut }}
                className="shrink-0 border-b border-[#f0ece8] bg-gradient-to-r from-[#fafbff] to-white px-5 pb-4 pt-5"
              >
                <span className="mb-1.5 block font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
                  Menu
                </span>
                <p className="m-0 font-display text-lg font-bold text-navy">Explore Qbit Force</p>
              </motion.div>

              <nav className="flex-1 overflow-y-auto overscroll-contain" aria-label="Mobile navigation">
                <motion.ul
                  className="m-0 list-none p-0"
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  {items.map((item) => {
                    if (item.type === "link") {
                      return (
                        <motion.li
                          key={item.label}
                          variants={mobileItemReveal}
                          className="border-b border-[#f0ece8]"
                        >
                          <Link
                            to={item.to}
                            className={`flex min-h-[54px] w-full items-center px-5 py-4 font-display text-base font-semibold text-navy no-underline transition hover:bg-[#f7f5f2] ${
                              item.active
                                ? "border-l-4 border-petal bg-gradient-to-r from-petal/10 to-transparent pl-[calc(1.25rem-4px)]"
                                : ""
                            }`}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      );
                    }

                    const isOpen = mobileOpenGroups.has(item.openKey);

                    return (
                      <motion.li
                        key={item.label}
                        variants={mobileItemReveal}
                        className="border-b border-[#f0ece8]"
                      >
                        <button
                          type="button"
                          className={`flex min-h-[54px] w-full items-center justify-between border-none bg-transparent px-5 py-4 text-left font-display text-base font-semibold text-navy transition hover:bg-[#f7f5f2] ${
                            item.active
                              ? "border-l-4 border-petal bg-gradient-to-r from-petal/10 to-transparent pl-[calc(1.25rem-4px)]"
                              : ""
                          }`}
                          aria-expanded={isOpen}
                          onClick={() => toggleMobileGroup(item.openKey)}
                        >
                          {item.label}
                          <motion.span
                            className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/80 bg-white"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={springSoft}
                            aria-hidden
                          >
                            <span className="block h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-navy" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={springSoft}
                              className="overflow-hidden bg-[#f7f5f2]"
                            >
                              <motion.ul
                                className="m-0 list-none p-0"
                                initial="hidden"
                                animate="visible"
                                variants={stagger}
                              >
                                {item.links.map((link) => (
                                  <motion.li key={link.to} variants={mobileSubItemReveal}>
                                    <Link
                                      to={link.to}
                                      className={`flex flex-col gap-0.5 border-t border-[rgba(232,228,223,0.7)] py-3.5 pl-7 pr-5 no-underline transition hover:bg-[rgba(0,1,127,0.04)] hover:pl-8 ${
                                        isActive(link.to)
                                          ? "border-l-[3px] border-petal bg-petal/5 pl-[calc(1.75rem-3px)] hover:pl-[calc(2rem-3px)]"
                                          : ""
                                      }`}
                                      onClick={closeMenu}
                                    >
                                      <span className="font-display text-[0.9375rem] font-semibold text-navy">
                                        {link.label}
                                      </span>
                                      <span className="text-[0.8125rem] leading-snug text-text-muted">
                                        {link.desc}
                                      </span>
                                    </Link>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45, ease: easeOut }}
                className="shrink-0 border-t border-border bg-white px-5 py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_rgba(0,1,127,0.06)]"
              >
                <Link
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-petal to-[#e01820] px-6 py-3.5 font-display text-[0.9375rem] font-semibold text-white no-underline shadow-[0_4px_14px_rgba(255,30,38,0.28)]"
                  to="/contactus"
                  onClick={closeMenu}
                >
                  Get in Touch →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Set<string>>(new Set());
  const closeDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const closeMenu = () => {
    setExpanded(false);
    setOpenDropdown(null);
    setMobileOpenGroups(new Set());
  };

  const openDropdownMenu = (name: string) => {
    if (closeDropdownTimer.current) {
      clearTimeout(closeDropdownTimer.current);
      closeDropdownTimer.current = null;
    }
    setOpenDropdown(name);
  };

  const scheduleCloseDropdown = () => {
    if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current);
    closeDropdownTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      closeDropdownTimer.current = null;
    }, 150);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileGroup = (name: string) => {
    setMobileOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  useEffect(() => {
    if (expanded) setMobileOpenGroups(new Set(["media"]));
  }, [expanded]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  useEffect(() => {
    setExpanded(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current);
    };
  }, []);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(path + "/");

  const companyActive = location.pathname.startsWith("/company");
  const mediaActive = ["/gallery", "/publications", "/videos", "/press"].some((p) =>
    location.pathname.startsWith(p),
  );

  const isHome = location.pathname === "/";
  const heroNav = isHome && !scrolled && !expanded;

  const contactCta = (
    <Link
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-petal to-[#e01820] px-5 py-2.5 font-display text-sm font-semibold text-white no-underline shadow-[0_4px_14px_rgba(255,30,38,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(255,30,38,0.38)]"
      to="/contactus"
      onClick={closeMenu}
    >
      <span>Get in Touch</span>
      <span className="transition group-hover:translate-x-0.5" aria-hidden>
        →
      </span>
    </Link>
  );

  const mobileNavItems = [
    { type: "link" as const, label: "Home", to: "/", active: isActive("/") },
    { type: "link" as const, label: "About Us", to: "/company", active: companyActive },
    { type: "link" as const, label: "Products", to: "/products", active: isActive("/products") },
    { type: "group" as const, label: "Media", active: mediaActive, openKey: "media", links: mediaLinks },
    { type: "link" as const, label: "Careers", to: "/careers", active: isActive("/careers") },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000]">
      <div
        className={`relative z-[1003] min-h-[var(--nav-height)] overflow-visible border-b transition-all duration-300 ${
          heroNav
            ? "border-transparent bg-transparent"
            : "border-white/40 bg-white/50 shadow-[0_4px_24px_rgba(0,1,127,0.06)] backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex min-h-[var(--nav-height)] max-w-7xl items-center gap-4 overflow-visible px-5 sm:px-8 lg:px-10 max-lg:pr-[max(1.25rem,env(safe-area-inset-right,0px))]">
          <Link to="/" className="flex shrink-0 items-center no-underline" onClick={closeMenu}>
            <LazyImage src={siteLogoUrl} alt="Qbit Force Quantum" eager optimizeWidth={320} className="block h-11 w-auto transition hover:scale-[1.03] sm:h-12" />
          </Link>

          <MobileMenuToggle expanded={expanded} onClick={() => setExpanded(!expanded)} />

          <div className="hidden flex-1 items-center justify-between gap-4 overflow-visible lg:flex">
            <div className="flex flex-1 justify-center overflow-visible">
              <ul className={`m-0 flex list-none items-center gap-1 overflow-visible ${navPillClass}`}>
                <li>
                  <Link className={navLinkClass(isActive("/"))} to="/" onClick={closeMenu}>
                    Home
                  </Link>
                </li>

                <li>
                  <Link className={navLinkClass(companyActive)} to="/company" onClick={closeMenu}>
                    About Us
                  </Link>
                </li>

                <li>
                  <Link className={navLinkClass(isActive("/products"))} to="/products" onClick={closeMenu}>
                    Products
                  </Link>
                </li>

                <li
                  className="relative"
                  onMouseEnter={() => openDropdownMenu("media")}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  <button
                    type="button"
                    className={`${navLinkClass(mediaActive)} border-none ${openDropdown === "media" && !mediaActive ? "bg-[#f7f5f2]" : ""}`}
                    aria-expanded={openDropdown === "media"}
                    onClick={() => toggleDropdown("media")}
                  >
                    Media
                    <span
                      className={`ml-0.5 h-0 w-0 border-x-4 border-t-[5px] border-x-transparent border-t-current opacity-75 transition ${openDropdown === "media" ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={`absolute left-1/2 top-full z-[1100] mt-2 min-w-[440px] -translate-x-1/2 transition-all duration-300 before:absolute before:-top-3.5 before:-left-6 before:-right-6 before:h-3.5 ${dropdownClass} ${
                      openDropdown === "media"
                        ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none invisible translate-y-2.5 scale-[0.97] opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {mediaLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex flex-col gap-0.5 rounded-xl px-4 py-3.5 no-underline transition hover:translate-x-0.5 hover:bg-[rgba(0,1,127,0.06)]"
                          onClick={closeMenu}
                        >
                          <span className="font-display text-sm font-semibold text-navy">{link.label}</span>
                          <span className="text-xs text-text-muted">{link.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>

                <li>
                  <Link className={navLinkClass(isActive("/careers"))} to="/careers" onClick={closeMenu}>
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex shrink-0 items-center">{contactCta}</div>
          </div>
        </div>
      </div>

      <MobileRevealNav
        expanded={expanded}
        items={mobileNavItems}
        mobileOpenGroups={mobileOpenGroups}
        toggleMobileGroup={toggleMobileGroup}
        closeMenu={closeMenu}
        isActive={isActive}
      />
    </header>
  );
}

export default Navbar;
