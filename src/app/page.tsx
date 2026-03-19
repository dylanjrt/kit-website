import { getArtist, getHomePage } from "../sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity/lib/urlFor";
import { shimmerBlur } from "../lib/blur-placeholder";

export default async function HomePage() {
  const [artist, home] = await Promise.all([
    getArtist(),
    getHomePage(),
  ]);

  const heroImage = home?.heroBackground;
  const collectionThumb = home?.heroBackground;
  const portfolioThumb = home?.secondaryImage;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#2a2820]">
      {/* Full-bleed background image */}
      {heroImage?.asset ? (
        <Image
          src={urlFor(heroImage).width(2400).auto("format").quality(90).url()}
          alt={heroImage.alt || ""}
          fill
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={shimmerBlur(2400, 1600)}
          priority
        />
      ) : null}

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col p-6 lg:p-8">

        {/* Top bar */}
        <div className="flex items-start justify-between">
          <span className="text-5xl lg:text-7xl font-bold text-[#111111] tracking-tight">
            BISQKIT
          </span>
          <div className="flex gap-5">
            <Link href="/contact" className="text-base text-[#111111] hover:opacity-50 transition-opacity">
              Contact
            </Link>
          </div>
        </div>

        {/* Main content — bio left, nav right */}
        <div className="mt-8 flex gap-16 items-start">
          {/* Bio */}
          <div className="max-w-xs">
            {artist?.shortBio && (
              <p className="text-sm text-[#111111] leading-relaxed">
                {artist.shortBio}
              </p>
            )}
          </div>

          {/* Primary nav */}
          <div className="flex gap-10 items-start ml-12">
            <Link href="/collection" className="group flex flex-col border border-[#111111] p-2 w-44">
              <span className="text-2xl lg:text-3xl font-medium text-[#111111] group-hover:opacity-50 transition-opacity leading-tight">
                Collection
              </span>
{collectionThumb?.asset && (
                <div className="relative overflow-hidden bg-[#EEEBe7] w-full" style={{ height: 80 }}>
                  <Image
                    src={urlFor(collectionThumb).width(240).height(160).auto("format").quality(80).url()}
                    alt="Collection"
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity duration-200"
                    sizes="120px"
                  />
                </div>
              )}
            </Link>
            <Link href="/portfolio" className="group flex flex-col border border-[#111111] p-2 w-44">
              <span className="text-2xl lg:text-3xl font-medium text-[#111111] group-hover:opacity-50 transition-opacity leading-tight">
                Portfolio
              </span>
{portfolioThumb?.asset && (
                <div className="relative overflow-hidden bg-[#EEEBe7] w-full" style={{ height: 80 }}>
                  <Image
                    src={urlFor(portfolioThumb).width(240).height(160).auto("format").quality(80).url()}
                    alt="Portfolio"
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity duration-200"
                    sizes="120px"
                  />
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Footer credit */}
        <div className="mt-auto flex justify-between items-end">
          <span className="text-[11px] text-[#777777]">
            © {new Date().getFullYear()} {artist?.name || "BISQKIT"}
          </span>
          <span className="text-[11px] text-[#777777]">
            site by{" "}
            <a href="https://dylanrt.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#555555] transition-colors">
              Dylan RT
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
