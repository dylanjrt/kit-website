import { getArtist, getHomePage } from "../sanity/queries";
import HeroBackground from "../components/HeroBackground";

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
    </div>
  );
}
