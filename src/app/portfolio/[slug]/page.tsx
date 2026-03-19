import { getSingleProject, getAllProjects } from "../../../sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../../sanity/lib/urlFor";
import { PortableText } from "next-sanity";
import { shimmerBlur } from "../../../lib/blur-placeholder";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabel = (cat: string) => cat?.replace(/-/g, " ");

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getSingleProject(slug);

  if (!project) {
    return (
      <div className="bg-[#F7F5F2] flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#777777] mb-6">
            Project not found
          </p>
          <Link
            href="/portfolio"
            className="text-sm text-[#777777] hover:text-[#111111] transition-colors"
          >
            ← Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <main className="px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 pb-6 border-b border-[#E8E8E8]">
          <Link
            href="/portfolio"
            className="text-sm text-[#777777] hover:text-[#111111] transition-colors"
          >
            ← Portfolio
          </Link>
          <h1 className="text-3xl lg:text-4xl font-light text-[#111111] mt-4">
            {project.title}
          </h1>
          <p className="text-sm text-[#777777] mt-2">
            {project.category ? categoryLabel(project.category) : ""}
            {project.category && project.year ? " — " : ""}
            {project.year ?? ""}
          </p>
        </div>

        {/* Cover image */}
        {project.coverImage?.asset && (
          <div className="mt-6 w-full overflow-hidden bg-[#EEEBe7]">
            <Image
              src={urlFor(project.coverImage)
                .width(2000)
                .auto("format")
                .quality(90)
                .url()}
              alt={project.coverImage.alt || project.title}
              width={2000}
              height={1125}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={shimmerBlur(2000, 1125)}
              className="w-full h-auto block"
              priority
            />
          </div>
        )}

        {/* Description + images */}
        <div className="py-8 lg:grid lg:grid-cols-12 lg:gap-10">
          {project.description && project.description.length > 0 && (
            <div className="lg:col-span-4 mb-8 lg:mb-0 border-t border-[#E8E8E8] pt-6 lg:border-t-0 lg:pt-0">
              <div className="text-base text-[#111111] leading-relaxed">
                <PortableText value={project.description} />
              </div>
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div
              className={`${
                project.description?.length > 0
                  ? "lg:col-span-8"
                  : "lg:col-span-12"
              } grid grid-cols-2 gap-3`}
            >
              {project.images.map(
                (
                  img: {
                    asset: { _ref: string; _type: string };
                    alt?: string;
                    caption?: string;
                  },
                  i: number,
                ) => (
                  <div key={i}>
                    <div className="overflow-hidden bg-[#EEEBe7]">
                      <Image
                        src={urlFor(img)
                          .width(1200)
                          .auto("format")
                          .quality(85)
                          .url()}
                        alt={img.alt || `${project.title} — ${i + 1}`}
                        width={1200}
                        height={900}
                        sizes="(min-width: 1024px) 40vw, 50vw"
                        className="w-full h-auto block"
                      />
                    </div>
                    {img.caption && (
                      <p className="text-sm text-[#777777] mt-1.5">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
