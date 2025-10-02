import { getArtist, getHomePage } from "../sanity/queries";
import HeroBackground from "../components/HeroBackground";
import Image from "next/image";
import { urlFor } from "../sanity/lib/urlFor";

export default async function HomePage() {
  const [artist, home] = await Promise.all([getArtist(), getHomePage()]);

  return (
    <div className="bg-background-color min-h-screen p-0">
      <HeroBackground image={home?.heroBackground} />

      {/* Bio Below */}
      <div className="mx-auto w-2/3 max-w-7xl justify-center px-6 py-12 lg:py-20">
        <div className="lg:col-span-2">
          <p className="text-secondary font-serif text-2xl leading-relaxed">
            {artist?.shortBio}
          </p>
        </div>
      </div>

      {/* Secondary Image */}
      {home?.secondaryImage?.asset && (
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={urlFor(home.secondaryImage)
                .width(2000)
                .auto("format")
                .quality(85)
                .url()}
              alt={home.secondaryImage.alt || "Secondary image"}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
          {home.secondaryImage.caption && (
            <p className="text-secondary mt-3 text-sm">
              {home.secondaryImage.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
