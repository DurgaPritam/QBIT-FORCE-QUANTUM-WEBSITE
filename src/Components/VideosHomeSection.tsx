import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { VideoItem } from "../data/videosData";
import { useVideos } from "../hooks/useApiContent";
import { useSectionPreload } from "../hooks/useSectionPreload";
import OptimizedCoverImage from "./OptimizedCoverImage";

const FEATURED_THUMB_WIDTH = 960;
const STRIP_THUMB_WIDTH = 280;

function InlinePlayer({ video }: { video: VideoItem }) {
  if (video.youtubeId) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        title={video.title}
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (video.src) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        controls
        autoPlay
        playsInline
        poster={video.thumbnail}
      >
        <source src={video.src} type="video/mp4" />
      </video>
    );
  }

  return null;
}

function FeaturedVideoPlayer({
  video,
  isPlaying,
  onPlay,
  eagerThumbnail = false,
}: {
  video: VideoItem;
  isPlaying: boolean;
  onPlay: () => void;
  eagerThumbnail?: boolean;
}) {
  return (
    <div className="relative aspect-video min-h-[200px] overflow-hidden rounded-xl bg-deep sm:min-h-[240px] sm:rounded-2xl">
      {isPlaying ? (
        <>
          <InlinePlayer key={video.id} video={video} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-4 sm:p-5">
            <span className="font-display text-[0.625rem] font-bold uppercase tracking-wider text-petal">
              Now playing
            </span>
            <h3 className="mt-1 font-display text-base font-bold leading-snug text-white sm:text-lg">
              {video.title}
            </h3>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={onPlay}
          className="group relative block h-full min-h-[200px] w-full cursor-pointer border-none bg-deep p-0 text-left sm:min-h-[240px]"
          aria-label={`Play ${video.title}`}
        >
          {video.thumbnail && (
            <OptimizedCoverImage
              src={video.thumbnail}
              optimizeWidth={FEATURED_THUMB_WIDTH}
              eager={eagerThumbnail}
              className="absolute inset-0 h-full w-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-deep/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-petal pl-1 text-white shadow-lg shadow-petal/40 transition duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110 sm:h-14 sm:w-14">
              ▶
            </div>
          </div>
          {video.duration !== "—" && (
            <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-[0.625rem] font-semibold text-white">
              {video.duration}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="font-display text-[0.625rem] font-bold uppercase tracking-wider text-petal">
              Featured
            </span>
            <h3 className="mt-1 font-display text-base font-bold leading-snug text-white sm:text-lg">
              {video.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70 sm:text-sm">
              {video.description}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

function VideoStripCard({
  video,
  index,
  isActive,
  onSelect,
  eagerThumbnail = false,
}: {
  video: VideoItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  eagerThumbnail?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full gap-3 rounded-lg border p-2.5 text-left transition sm:gap-4 sm:rounded-xl sm:p-3 ${
        isActive
          ? "border-petal/60 bg-white/15"
          : "border-white/10 bg-white/5 hover:border-petal/40 hover:bg-white/10"
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-deep sm:h-[4.5rem] sm:w-28">
        {video.thumbnail && (
          <OptimizedCoverImage
            src={video.thumbnail}
            optimizeWidth={STRIP_THUMB_WIDTH}
            eager={eagerThumbnail}
            className="absolute inset-0 h-full w-full"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-deep/30">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-petal/90 pl-0.5 text-[0.5rem] text-white">
            ▶
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="font-display text-[0.625rem] font-semibold uppercase tracking-wider text-petal/90">
          {video.category}
        </span>
        <h4 className="mt-0.5 line-clamp-2 font-display text-xs font-semibold leading-snug text-white sm:text-sm">
          {video.title}
        </h4>
        <span className="mt-1 text-[0.625rem] text-white/50">{video.duration}</span>
      </div>
    </button>
  );
}

function VideosHomeSection() {
  const { items: videos } = useVideos();
  const preloadTargets = videos
    .filter((video): video is VideoItem & { thumbnail: string } => Boolean(video.thumbnail))
    .map((video, index) => ({
      url: video.thumbnail,
      width: index === 0 ? FEATURED_THUMB_WIDTH : STRIP_THUMB_WIDTH,
    }));
  const { sectionRef, preload } = useSectionPreload(preloadTargets);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videos.length === 0) {
      setActiveVideo(null);
      setIsPlaying(false);
      return;
    }
    setActiveVideo((prev) => {
      if (prev && videos.some((v) => v.id === prev.id)) return prev;
      return videos[0];
    });
  }, [videos]);

  if (!activeVideo) return null;

  const handleSelectVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-deep via-mid to-navy" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(245,0,0,0.2) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(93,143,216,0.15) 0%, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-petal">
              Watch & Learn
            </span>
            <h2 className="mt-1 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-white">
              Videos & Media
            </h2>
          </div>
          <Link
            to="/videos"
            className="inline-flex w-fit shrink-0 self-start items-center rounded-full border border-white/30 px-4 py-1.5 font-display text-xs font-semibold text-white no-underline transition hover:border-white hover:bg-white/10 sm:text-sm"
          >
            View all
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-5 lg:gap-5">
          <div className="lg:col-span-3">
            <FeaturedVideoPlayer
              video={activeVideo}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              eagerThumbnail={preload}
            />
          </div>
          <div className="flex flex-col gap-2.5 lg:col-span-2 lg:justify-center">
            {videos.map((video, index) => (
              <VideoStripCard
                key={video.id}
                video={video}
                index={index}
                isActive={isPlaying && activeVideo.id === video.id}
                onSelect={() => handleSelectVideo(video)}
                eagerThumbnail={preload}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-1 overflow-hidden opacity-40" aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-3 w-3 shrink-0 rounded-sm border border-white/30 bg-white/10" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideosHomeSection;
