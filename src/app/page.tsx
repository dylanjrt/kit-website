import { getArtist, getFeaturedItems } from "../sanity/queries";
import HomeSlideshow from "../components/HomeSlideshow";

export default async function HomePage() {
  const [artist, featuredItems] = await Promise.all([
    getArtist(),
    getFeaturedItems(),
  ]);

  return (
    <div className="bg-background-color min-h-screen">
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col lg:hidden">
        {/* Featured Item Slideshow - Top on mobile */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <HomeSlideshow items={featuredItems || []} />
        </div>

        {/* Artist Bio - Middle on mobile */}
        <div className="flex flex-col items-start justify-start p-4 lg:p-8">
          <div className="w-full">
            <p className="text-secondary text-md font-serif leading-relaxed">
              {artist?.shortBio}
            </p>
          </div>
        </div>

        {/* Studio and Social - Bottom on mobile */}
        <div className="flex flex-col items-start justify-start space-y-6 p-4 lg:p-8">
          {/* Studio */}
          <div className="w-full">
            <h1 className="text-primary text-md pb-2 font-bold">STUDIO</h1>
            <div className="text-secondary text-md font-serif leading-relaxed">
              {artist?.location
                ?.split("\n")
                .map((line: string, index: number) => (
                  <p key={index} className={index > 0 ? "mt-1" : ""}>
                    {line}
                  </p>
                ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full">
            <h1 className="text-primary text-md pb-2 font-bold">FOLLOW</h1>
            <ul className="text-secondary text-md space-y-1 font-serif leading-relaxed">
              {artist?.socialMedia &&
                Object.entries(artist.socialMedia)
                  .filter(([_, value]) => !!value)
                  .map(([key, value]) => {
                    const url = value as string;
                    const displayUrl = url.replace(/^https?:\/\/(www\.)?/i, "");
                    return (
                      <li key={key}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-secondary transition-colors hover:underline"
                        >
                          {displayUrl}
                        </a>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden items-stretch justify-center lg:flex">
        {/* Left Section */}
        <div className="flex w-1/4 flex-col items-start justify-start p-8">
          {/* Artist Bio */}
          <div className="w-full">
            <p className="text-secondary text-md font-serif leading-relaxed">
              {artist?.shortBio}
            </p>
          </div>
        </div>

        {/* Right Section - Featured Item Slideshow */}
        <div className="flex w-1/3 items-center justify-start p-8">
          <HomeSlideshow items={featuredItems || []} />
        </div>

        <div className="flex w-1/4 flex-col items-start justify-between p-8">
          {/* Studio */}
          <div className="w-full">
            <h1 className="text-primary text-md pb-2 font-bold">STUDIO</h1>
            <div className="text-secondary text-md font-serif leading-relaxed">
              {artist?.location
                ?.split("\n")
                .map((line: string, index: number) => (
                  <p key={index} className={index > 0 ? "mt-1" : ""}>
                    {line}
                  </p>
                ))}
            </div>
          </div>
          {/* Social Media */}
          <div className="w-full pb-24">
            <h1 className="text-primary text-md pb-2 font-bold">FOLLOW</h1>
            <ul className="text-secondary text-md space-y-1 font-serif leading-relaxed">
              {artist?.socialMedia &&
                Object.entries(artist.socialMedia)
                  .filter(([_, value]) => !!value)
                  .map(([key, value]) => {
                    const url = value as string;
                    const displayUrl = url.replace(/^https?:\/\/(www\.)?/i, "");
                    return (
                      <li key={key}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-secondary transition-colors hover:underline"
                        >
                          {displayUrl}
                        </a>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
