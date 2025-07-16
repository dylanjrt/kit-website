import { getArtist, getFeaturedItems, getSettings } from "../sanity/queries";
import { getImageUrl } from "../lib/sanity-image";
import Image from "next/image";

export default async function HomePage() {
  const [artist, featuredItems] = await Promise.all([
    getArtist(),
    getFeaturedItems(),
  ]);

  const featuredItem = featuredItems?.[0];

  return (
    <div className="bg-background-color">
      <div className="flex">
        {/* Left Section - Artist Bio */}
        <div className="flex w-1/2 justify-end p-8">
          <div className="max-w-md">
            <p className="text-primary-text font-serif text-lg leading-relaxed">
              {artist?.shortBio ||
                "Kitsolano is a designer based in Brooklyn, NY. Over the last seven years, they have cultivated a design practice under the tutelage of Danny Kaplan. Now, they run a studio out of the Brooklyn Navy Yard and have built a comprehensive repertoire spanning multiple styles and genres."}
            </p>
          </div>
        </div>

        {/* Right Section - Featured Item */}
        <div className="flex w-1/2 items-center justify-start p-8">
          {featuredItem && (
            <div className="relative w-full max-w-lg">
              {featuredItem.images?.[0] && (
                <Image
                  src={getImageUrl(featuredItem.images[0], 600, 800) || ""}
                  alt={featuredItem.images[0].alt || featuredItem.title}
                  className="h-auto w-full object-cover"
                  width={600}
                  height={800}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
