import { getArtist, getSettings } from "../../sanity/queries";
import ContactForm from "../../components/ContactForm";

export default async function ContactPage() {
  const [artist, settings] = await Promise.all([getArtist(), getSettings()]);

  return (
    <div className="bg-background-color min-h-screen">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl pb-20">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* About Section */}
          <div className="space-y-8">
            <h1 className="text-primary-text font-serif text-4xl leading-tight font-light">
              Get in Touch
            </h1>

            <div className="text-primary-text space-y-6 font-serif text-lg leading-relaxed">
              <p>
                Inquire about custom pieces, collaborations, or simply learn
                more about the work. Each piece is thoughtfully crafted in the
                studio, reflecting a deep understanding of form, function, and
                the subtle beauty of handmade ceramics.
              </p>

              {artist && artist.shortBio && (
                <p>
                  {artist.name}{" "}
                  {artist.location && `is based in ${artist.location}`} and
                  creates work that explores the intersection of traditional
                  ceramic techniques and contemporary design.
                  {artist.shortBio}
                </p>
              )}

              <p>
                Whether you&apos;re looking for a custom piece, interested in a
                collaboration, or would like to visit the studio, we&apos;d love
                to hear from you.
              </p>
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
