import Image from "next/image";
import { urlFor } from "../sanity/lib/urlFor";

interface HeroBackgroundProps {
  image: any;
  priority?: boolean;
}

export default function HeroBackground({
  image,
  priority = true,
}: HeroBackgroundProps) {
  if (!image?.asset) return null;

  const src = urlFor(image).width(2400).format("webp").quality(80).url();

  return (
    <section className="relative z-0 h-[80vh] w-full overflow-hidden lg:h-screen">
      <Image
        src={src}
        alt={image.alt || "Background"}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}
