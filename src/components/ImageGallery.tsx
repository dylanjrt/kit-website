"use client";

import { useState } from "react";
import { getImageUrl } from "../lib/sanity-image";
import Image from "next/image";

interface GalleryImage {
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-3">
      {/* Thumbnails — right column */}
      {images.length > 1 && (
        <div className="flex flex-col gap-1.5 order-last">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square w-14 lg:w-16 shrink-0 overflow-hidden border transition-all duration-200 bg-[#EEEBe7] ${
                index === selectedIndex
                  ? "border-[#111111]"
                  : "border-transparent hover:border-[#E8E8E8]"
              }`}
            >
              <Image
                src={getImageUrl(image, 200, 200) || ""}
                alt={image.alt || `${title} — ${index + 1}`}
                width={200}
                height={200}
                className="h-full w-full object-cover"
                quality={70}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      {images[selectedIndex] && (
        <div className="flex-1 bg-[#EEEBe7]">
          <Image
            src={getImageUrl(images[selectedIndex], 1400) || ""}
            alt={images[selectedIndex].alt || title}
            width={1400}
            height={1050}
            className="h-auto w-full object-contain block"
            priority={selectedIndex === 0}
            quality={85}
          />
        </div>
      )}
    </div>
  );
}
