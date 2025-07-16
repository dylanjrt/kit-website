import { getArtist, getSettings } from "../../sanity/queries";
import ContactForm from "../../components/ContactForm";
import Image from "next/image";
import { getImageUrl } from "../../lib/sanity-image";

export default async function ContactPage() {
  const [artist, settings] = await Promise.all([getArtist(), getSettings()]);

  return (
    <div className="bg-background-color min-h-screen">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl pb-20">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* About Section */}
          <div className="space-y-8">
            <div className="text-primary-text space-y-6 font-serif text-lg leading-relaxed">
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
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
