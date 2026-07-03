import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  pageMetaByPath,
  SITE_NAME,
  SITE_URL,
} from "../content/seo";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Injects a per-page JSON-LD block (WebPage + breadcrumbs) for structured data. */
function upsertStructuredData(data: Record<string, unknown>) {
  const id = "page-structured-data";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMetaByPath[pathname] ?? pageMetaByPath["/"];
    const pageTitle = meta?.title ?? SITE_NAME;
    const description = meta?.description ?? DEFAULT_DESCRIPTION;
    const fullTitle = pathname === "/" ? `${SITE_NAME} | ${pageTitle}` : `${pageTitle} | ${SITE_NAME}`;
    const canonicalPath = pathname === "/" ? "" : pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const keywords = [...(meta?.keywords ?? []), ...DEFAULT_KEYWORDS].join(", ");

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", DEFAULT_OG_IMAGE);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", DEFAULT_OG_IMAGE);
    upsertCanonical(canonicalUrl);

    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ];
    if (pathname !== "/") {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: pageTitle,
        item: canonicalUrl,
      });
    }

    upsertStructuredData({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    });
  }, [pathname]);
}
