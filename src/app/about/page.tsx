import { getArtist } from "../../sanity/queries";

export const revalidate = 3600;
import Image from "next/image";
import { urlFor } from "../../sanity/lib/urlFor";
import { PortableText } from "next-sanity";
import { shimmerBlur } from "../../lib/blur-placeholder";

export default async function AboutPage() {
  const artist = await getArtist();

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <main className="px-6 lg:px-8">
        {/* Page heading */}
        <div className="pt-10 pb-6">
          <h1 className="text-4xl lg:text-5xl font-light text-[#111111] mb-8">
            About
          </h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left: bio + image */}
          <div className="lg:col-span-7 mb-10 lg:mb-0">
            {artist?.shortBio && (
              <p className="text-lg leading-relaxed text-[#111111] mb-6">
                {artist.shortBio}
              </p>
            )}

            {artist?.bio && (
              <div className="text-base leading-relaxed text-[#111111] mb-8">
                <PortableText value={artist.bio} />
              </div>
            )}

            {artist?.profileImage?.asset && (
              <div className="relative w-full max-w-lg overflow-hidden bg-[#EEEBe7]">
                <Image
                  src={urlFor(artist.profileImage)
                    .width(1000)
                    .auto("format")
                    .quality(85)
                    .url()}
                  alt={artist.profileImage.alt || artist.name || "Artist"}
                  width={1000}
                  height={750}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  placeholder="blur"
                  blurDataURL={shimmerBlur(1000, 750)}
                  className="w-full h-auto block"
                />
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Specialties */}
            {artist?.specialties && artist.specialties.length > 0 && (
              <div className="border-t border-[#E8E8E8] pt-6">
                <h2 className="text-sm text-[#777777] mb-3">
                  Specialties
                </h2>
                <div className="space-y-1">
                  {artist.specialties.map((s: string, i: number) => (
                    <p key={i} className="text-base text-[#111111]">
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {artist?.education && artist.education.length > 0 && (
              <div className="border-t border-[#E8E8E8] pt-6">
                <h2 className="text-sm text-[#777777] mb-3">
                  Education
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {artist.education.map(
                    (ed: { year?: string; institution?: string; degree?: string }, i: number) => (
                      <div key={i}>
                        {ed.year && (
                          <p className="text-sm text-[#777777] mb-1">{ed.year}</p>
                        )}
                        <p className="text-base text-[#111111] leading-relaxed">
                          {[ed.degree, ed.institution].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Awards */}
            {artist?.awards && artist.awards.length > 0 && (
              <div className="border-t border-[#E8E8E8] pt-6">
                <h2 className="text-sm text-[#777777] mb-3">
                  Awards
                </h2>
                <div className="space-y-4">
                  {artist.awards.map(
                    (award: { year?: string; title?: string; organization?: string }, i: number) => (
                      <div key={i}>
                        {award.year && (
                          <p className="text-sm text-[#777777] mb-1">{award.year}</p>
                        )}
                        <p className="text-base text-[#111111]">
                          {[award.title, award.organization].filter(Boolean).join(" — ")}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Contact */}
            {(artist?.email || artist?.location) && (
              <div className="border-t border-[#E8E8E8] pt-6">
                <h2 className="text-sm text-[#777777] mb-3">
                  Contact
                </h2>
                {artist.location && (
                  <p className="text-base text-[#111111] mb-2">
                    {artist.location}
                  </p>
                )}
                {artist.email && (
                  <a
                    href={`mailto:${artist.email}`}
                    className="text-base text-[#111111] hover:text-[#777777] transition-colors"
                  >
                    {artist.email}
                  </a>
                )}
              </div>
            )}

            {/* Social */}
            {artist?.socialMedia && (
              <div className="border-t border-[#E8E8E8] pt-6 flex flex-col gap-2">
                {artist.socialMedia.instagram && (
                  <a
                    href={artist.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-[#111111] hover:text-[#777777] transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {artist.socialMedia.etsy && (
                  <a
                    href={artist.socialMedia.etsy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-[#111111] hover:text-[#777777] transition-colors"
                  >
                    Etsy
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
