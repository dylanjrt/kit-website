import { getArtist } from "../../sanity/queries";

export const revalidate = 3600;

export default async function ContactPage() {
  const artist = await getArtist();

  const rows = [
    artist?.location && { label: "Location", value: artist.location },
    artist?.email && {
      label: "Email",
      value: artist.email,
      href: `mailto:${artist.email}`,
    },
    artist?.phone && { label: "Phone", value: artist.phone },
    artist?.socialMedia?.instagram && {
      label: "Instagram",
      value: artist.socialMedia.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\/?/, "@"),
      href: artist.socialMedia.instagram,
      external: true,
    },
    artist?.socialMedia?.etsy && {
      label: "Etsy",
      value: "Shop",
      href: artist.socialMedia.etsy,
      external: true,
    },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }>;

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <main className="px-6 lg:px-8">
        {/* Page heading */}
        <div className="pt-10 pb-6">
          <h1 className="text-4xl lg:text-5xl font-light text-[#111111] mb-8">
            Contact
          </h1>
        </div>

        {/* Contact table */}
        <div className="max-w-2xl">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[8rem_1fr] gap-4 py-4 border-b border-[#E8E8E8] items-baseline"
            >
              <span className="text-sm text-[#777777]">
                {row.label}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-base text-[#111111] hover:text-[#777777] transition-colors"
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-base text-[#111111] whitespace-pre-line">
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
