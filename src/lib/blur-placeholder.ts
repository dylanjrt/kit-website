// Generates a base64 SVG blur placeholder for Next.js <Image> components.
// Used for Sanity CDN images which require an explicit blurDataURL.
export function shimmerBlur(w = 800, h = 600): string {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#F0F0F0"/>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
