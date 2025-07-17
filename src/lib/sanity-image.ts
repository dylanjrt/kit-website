import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity/lib/client";

const builder = imageUrlBuilder(client);

interface SanityImageSource {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | null | undefined,
  width: number = 800,
  height?: number,
) {
  if (!source) return null;

  const url = urlFor(source);

  if (height) {
    return url.width(width).height(height).fit("crop").url();
  }

  return url.width(width).fit("max").url();
}

export function getImageUrlWithHotspot(
  source: SanityImageSource | null | undefined,
  width: number = 800,
  height?: number,
) {
  if (!source) return null;

  const url = urlFor(source);

  if (height) {
    return url.width(width).height(height).fit("crop").url();
  }

  return url.width(width).fit("max").url();
}
