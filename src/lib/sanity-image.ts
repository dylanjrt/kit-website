import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity/lib/client";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function getImageUrl(source: any, width: number = 800, height?: number) {
  if (!source) return null;

  const url = urlFor(source);

  if (height) {
    return url.width(width).height(height).fit("crop").url();
  }

  return url.width(width).fit("max").url();
}

export function getImageUrlWithHotspot(
  source: any,
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
