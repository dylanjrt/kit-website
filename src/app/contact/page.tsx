import { getArtist, getSettings } from "../../sanity/queries";
import ContactForm from "../../components/ContactForm";

export default async function ContactPage() {
  const [artist, settings] = await Promise.all([getArtist(), getSettings()]);

  return (
    <div className="bg-background-color min-h-screen">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl pt-32 pb-20">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Left Column - Contact Information */}
          <div className="space-y-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <h2 className="text-primary-text font-serif text-sm tracking-widest uppercase">
                CONTACT
              </h2>

              <div className="text-primary-text space-y-6 font-serif text-lg">
                {settings?.contact?.email && (
                  <div>
                    <p className="mb-1 text-sm tracking-wide uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.contact.email}`}
                      className="hover:text-secondary-text transition-colors duration-300"
                    >
                      {settings.contact.email}
                    </a>
                  </div>
                )}

                {settings?.contact?.phone && (
                  <div>
                    <p className="mb-1 text-sm tracking-wide uppercase">
                      Phone
                    </p>
                    <a
                      href={`tel:${settings.contact.phone}`}
                      className="hover:text-secondary-text transition-colors duration-300"
                    >
                      {settings.contact.phone}
                    </a>
                  </div>
                )}

                {settings?.contact?.address && (
                  <div>
                    <p className="mb-1 text-sm tracking-wide uppercase">
                      Studio
                    </p>
                    <div>
                      <p>{settings.contact.address}</p>
                      {settings.contact.city && settings.contact.state && (
                        <p>
                          {settings.contact.city}, {settings.contact.state}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            {settings?.socialMedia && (
              <div className="space-y-6">
                <p className="text-primary-text font-serif text-sm tracking-widest uppercase">
                  FOLLOW
                </p>
                <div className="space-y-2">
                  {settings.socialMedia.instagram && (
                    <a
                      href={settings.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-text hover:text-secondary-text block font-serif text-lg transition-colors duration-300"
                    >
                      @
                      {settings.socialMedia.instagram.split("/").pop() ||
                        "instagram"}
                    </a>
                  )}
                  {settings.socialMedia.facebook && (
                    <a
                      href={settings.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-text hover:text-secondary-text block font-serif text-lg transition-colors duration-300"
                    >
                      Facebook
                    </a>
                  )}
                  {settings.socialMedia.etsy && (
                    <a
                      href={settings.socialMedia.etsy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-text hover:text-secondary-text block font-serif text-lg transition-colors duration-300"
                    >
                      Etsy
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="space-y-4">
              <a
                href="/shop"
                className="text-primary-text hover:text-secondary-text block font-serif text-lg transition-colors duration-300"
              >
                → View Collection
              </a>
              <a
                href="mailto:hello@example.com"
                className="text-primary-text hover:text-secondary-text block font-serif text-lg transition-colors duration-300"
              >
                → Send Inquiry
              </a>
            </div>
          </div>

          {/* Right Column - About & Contact Form */}
          <div className="space-y-16">
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
                  Whether you&apos;re looking for a custom piece, interested in
                  a collaboration, or would like to visit the studio, we&apos;d
                  love to hear from you.
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

      {/* Footer Credit */}
      <div className="text-primary-text pb-8 text-center font-serif text-sm">
        site by: <span className="underline">Dylan RT</span>
      </div>
    </div>
  );
}
