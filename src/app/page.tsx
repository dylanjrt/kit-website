import { getArtist, getHomePage } from "../sanity/queries";
import HeroBackground from "../components/HeroBackground";

export default async function HomePage() {
  const [artist, home] = await Promise.all([getArtist(), getHomePage()]);

  return (
    <div className="bg-background-color min-h-screen p-0">
      <HeroBackground image={home?.heroBackground} />

      {/* Bio Below */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-secondary font-serif text-lg leading-relaxed">
              {artist?.shortBio}
            </p>
          </div>
          <div />
        </div>
      </div>

      {/* Desktop Layout - Additional columns if needed */}
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
