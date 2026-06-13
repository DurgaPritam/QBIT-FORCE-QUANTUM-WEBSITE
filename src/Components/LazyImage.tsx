import type { ImgHTMLAttributes } from "react";
import { cloudinaryImageUrl } from "../utils/cloudinary";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Load immediately for above-the-fold assets */
  eager?: boolean;
  /** Resize Cloudinary assets for faster loads */
  optimizeWidth?: number;
};

function LazyImage({
  src,
  alt = "",
  className = "",
  eager = false,
  optimizeWidth,
  decoding = "async",
  loading,
  fetchPriority,
  ...rest
}: LazyImageProps) {
  const resolvedSrc =
    src && optimizeWidth ? cloudinaryImageUrl(String(src), optimizeWidth) : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      decoding={decoding}
      loading={loading ?? (eager ? "eager" : "lazy")}
      fetchPriority={fetchPriority ?? (eager ? "high" : "auto")}
      {...rest}
    />
  );
}

export default LazyImage;
