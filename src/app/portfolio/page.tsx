import { getAllProjects } from "../../sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/urlFor";
import { shimmerBlur } from "../../lib/blur-placeholder";

export const revalidate = 3600;

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  year?: number;
  category?: string;
  coverImage?: {
    asset: { _ref: string; _type: string };
    alt?: string;
  };
}

const categoryLabel = (cat: string) =>
  cat?.replace(/-/g, " ") ?? "";

export default async function PortfolioPage() {
  const projects: Project[] = await getAllProjects();

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <main className="px-6 lg:px-8">
        {/* Page heading */}
        <div className="pt-10 pb-6">
          <h1 className="text-4xl lg:text-5xl font-light text-[#111111] mb-8">
            Artist Portfolio
          </h1>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-[#777777] py-8">
            Projects coming soon.
          </p>
        ) : (
          <div>
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug.current}`}
                className="group flex items-center gap-4 py-4 border-b border-[#E8E8E8]"
              >
                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-base text-[#111111] truncate">
                    {project.title}
                  </h2>
                  <div className="flex gap-3 mt-0.5">
                    {project.category && (
                      <span className="text-sm text-[#777777]">
                        {categoryLabel(project.category)}
                      </span>
                    )}
                    {project.year && (
                      <span className="text-sm text-[#777777]">{project.year}</span>
                    )}
                  </div>
                </div>

                {/* Thumbnail */}
                {project.coverImage?.asset ? (
                  <div className="w-[60px] h-[60px] overflow-hidden flex-shrink-0 bg-[#EEEBe7]">
                    <Image
                      src={urlFor(project.coverImage)
                        .width(120)
                        .height(120)
                        .auto("format")
                        .quality(80)
                        .url()}
                      alt={project.coverImage.alt || project.title}
                      width={120}
                      height={120}
                      placeholder="blur"
                      blurDataURL={shimmerBlur(120, 120)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[60px] h-[60px] bg-[#EEEBe7] flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
