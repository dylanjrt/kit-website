import { getArtist, getSettings } from "../../sanity/queries";
import ContactForm from "../../components/ContactForm";
import Image from "next/image";
import { getImageUrl } from "../../lib/sanity-image";

export default async function ContactPage() {
  const [artist] = await Promise.all([getArtist(), getSettings()]);

  return (
    <div className="bg-background-color min-h-screen">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* About Section */}
          <div className="space-y-6 lg:w-1/2 lg:space-y-8">
            <div className="text-secondary lg:text-md space-y-4 font-serif text-sm leading-relaxed lg:space-y-6">
              <p>
                Inquire about custom pieces, collaborations, or simply learn
                more about the work. Each piece is thoughtfully crafted in the
                studio, reflecting a deep understanding of form, function, and
                the subtle beauty of handmade ceramics.
              </p>

              <p>
                Whether you&apos;re looking for a custom piece, interested in a
                collaboration, or would like to visit the studio, we&apos;d love
                to hear from you.
              </p>
              <Image
                src={getImageUrl(artist?.profileImage, 500, 500) || ""}
                alt={artist?.name}
                width={500}
                height={500}
                className="hidden lg:block"
                priority
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <ContactForm artist={artist} />
          </div>
        </div>
      </div>
    </div>
  );
}
