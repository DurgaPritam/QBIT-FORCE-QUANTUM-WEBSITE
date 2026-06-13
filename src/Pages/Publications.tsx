import { useState } from "react";
import ArticleBentoGallery from "../Components/ArticleBentoGallery";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";
import { articleCategories, articles } from "../data/articlesData";

function Publications() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Blogs"
        title="Qbit Force Blog"
        intro="Insights, research updates, and stories from our quantum hardware journey in Amaravati — click any tile to preview, then read the full article."
        chips={[
          { label: "Read articles", href: "#publications" },
          { label: "Gallery", href: "/gallery" },
          { label: "Videos", href: "/videos" },
        ]}
      />

      <PageContentSection id="publications">
        <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8">
          {articleCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={
                activeCategory === cat.id
                  ? "cursor-pointer rounded-full border-2 border-navy bg-navy px-4 py-2 font-display text-xs font-semibold text-white sm:px-5 sm:text-sm"
                  : "cursor-pointer rounded-full border-2 border-border bg-white px-4 py-2 font-display text-xs font-semibold text-text transition-colors duration-200 hover:border-navy hover:text-navy sm:px-5 sm:text-sm"
              }
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <ArticleBentoGallery articles={filtered} />
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Publications;
