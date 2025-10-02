import { getArtist } from "../../sanity/queries";

export default async function ContactPage() {
  const artist = await getArtist();

  const addressLines = (artist?.location || "")
    .split("\n")
    .filter((l: string) => l.trim().length > 0);

  return (
    <div className="bg-background-color min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left: Section label */}
          <div className="flex items-start lg:justify-start">
            <h1 className="text-primary text-lg tracking-widest">CONTACT</h1>
          </div>

          {/* Right: Contact details */}
          <div className="space-y-6 text-xl leading-relaxed tracking-widest lg:col-span-2">
            <div className="space-y-2">
              {addressLines.map((line: string, idx: number) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {artist?.phone && <p className="pt-2">{artist.phone}</p>}
            {artist?.email && (
              <p>
                <a
                  href={`mailto:${artist.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {artist.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
