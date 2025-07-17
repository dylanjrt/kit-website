"use client";

import { useState } from "react";
import { getImageUrl } from "../lib/sanity-image";
import Image from "next/image";

interface Image {
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: Image[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Main Image */}
      {images[selectedImageIndex] && (
        <div className="aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
          <Image
            src={getImageUrl(images[selectedImageIndex], 800, 1000) || ""}
            alt={images[selectedImageIndex].alt || title}
            width={800}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-1.5 lg:grid-cols-4 lg:gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`aspect-square cursor-pointer overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? "border-primary-text"
                  : "hover:border-primary-text/50 border-transparent"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={getImageUrl(image, 200, 200) || ""}
                alt={image.alt || `${title} - Image ${index + 1}`}
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
