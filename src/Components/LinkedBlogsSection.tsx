import { Link } from "react-router-dom";
import type { Article } from "../data/articlesData";
import { useArticles } from "../hooks/useApiContent";
import { useSectionPreload } from "../hooks/useSectionPreload";
import OptimizedCoverImage from "./OptimizedCoverImage";
import SectionViewAllLink from "./SectionViewAllLink";

const BLOG_THUMB_WIDTH = 240;
const HOME_BLOG_LIMIT = 4;

const categorySource: Record<Article["category"], string> = {
  publication: "Blog",
  press: "Press Release",
  insight: "Blog",
};

function formatMeta(article: Article) {
  const date = new Date(article.date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const source = article.author ?? categorySource[article.category];
  return `${date} | ${source}`;
}

function BlogThumbnail({
  imageUrl,
  eager,
  wrapperClassName,
}: {
  imageUrl: string;
  eager: boolean;
  wrapperClassName: string;
}) {
  return (
    <div
      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-[#e8e6e3] sm:h-24 sm:w-24 ${wrapperClassName}`}
    >
      <OptimizedCoverImage
        src={imageUrl}
        optimizeWidth={BLOG_THUMB_WIDTH}
        eager={eager}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function LinkedBlogListItem({
  article,
  eagerImages,
}: {
  article: Article;
  eagerImages: boolean;
}) {
  const readLinkClass =
    "mt-2 inline-block font-display text-xs font-semibold text-petal no-underline transition hover:underline sm:text-sm";
  const titleLinkClass = "text-text no-underline transition hover:text-petal";

  return (
    <article className="flex gap-3 sm:gap-4">
      {article.imageUrl &&
        (article.link ? (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0"
          >
            <BlogThumbnail imageUrl={article.imageUrl} eager={eagerImages} wrapperClassName="" />
          </a>
        ) : (
          <Link to="/publications" className="group shrink-0">
            <BlogThumbnail imageUrl={article.imageUrl} eager={eagerImages} wrapperClassName="" />
          </Link>
        ))}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="text-[0.6875rem] text-text-muted sm:text-xs">{formatMeta(article)}</p>
        <h3 className="mt-1 font-display text-sm font-bold leading-snug text-text sm:text-base">
          {article.link ? (
            <a href={article.link} target="_blank" rel="noopener noreferrer" className={titleLinkClass}>
              {article.title}
            </a>
          ) : (
            <Link to="/publications" className={titleLinkClass}>
              {article.title}
            </Link>
          )}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-muted sm:text-sm">
          {article.excerpt}
        </p>
        {article.link ? (
          <a href={article.link} target="_blank" rel="noopener noreferrer" className={readLinkClass}>
            Read blog
          </a>
        ) : (
          <Link to="/publications" className={readLinkClass}>
            Read blog
          </Link>
        )}
      </div>
    </article>
  );
}

function LinkedBlogsSection() {
  const { items: articles } = useArticles();
  const homeArticles = articles.slice(0, HOME_BLOG_LIMIT);
  const preloadTargets = homeArticles
    .filter((article): article is Article & { imageUrl: string } => Boolean(article.imageUrl))
    .map((article) => ({ url: article.imageUrl, width: BLOG_THUMB_WIDTH }));
  const { sectionRef, preload } = useSectionPreload(preloadTargets);

  if (homeArticles.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
              Linked Blogs
            </span>
            <h2 className="mt-1 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-text">
              Qbit Force Blog
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-text-muted sm:text-sm">
              Insights, press coverage, and stories from our quantum hardware journey.
            </p>
          </div>
          <SectionViewAllLink to="/publications" label="View all blogs" />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:mt-8">
          {homeArticles.map((article) => (
            <LinkedBlogListItem key={article.id} article={article} eagerImages={preload} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LinkedBlogsSection;
