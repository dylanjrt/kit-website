import { getArtist, getFeaturedItems } from "../sanity/queries";
import HomeSlideshow from "../components/HomeSlideshow";

export default async function HomePage() {
  const [artist, featuredItems] = await Promise.all([
    getArtist(),
    getFeaturedItems(),
  ]);

  return (
    <div className="bg-background-color">
      <div className="flex">
        {/* Left Section - Artist Bio */}
        <div className="flex w-1/2 justify-end p-8">
          <div className="max-w-md">
            <p className="text-primary-text font-serif text-lg leading-relaxed">
              {artist?.shortBio}
            </p>
          </div>
        </div>

        {/* Right Section - Featured Item Slideshow */}
        <div className="flex w-1/2 items-center justify-start p-8">
          <HomeSlideshow items={featuredItems || []} />
        </div>
      </div>
    </div>
  );
}
