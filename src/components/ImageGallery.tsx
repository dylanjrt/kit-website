"use client";

import { useState, useEffect } from "react";
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Preload all images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, index]));
            resolve();
          };
          img.onerror = () => resolve(); // Still resolve to avoid hanging
          img.src = getImageUrl(image) || "";
        });
      });

      await Promise.all(promises);
    };

    preloadImages();
  }, [images]);

  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Main Image */}
      {images[selectedImageIndex] && (
        <div className="relative max-w-2xl">
          <Image
            src={getImageUrl(images[selectedImageIndex]) || ""}
            alt={images[selectedImageIndex].alt || title}
            width={800}
            height={600}
            className={`h-auto w-full object-contain transition-opacity duration-300 ${
              loadedImages.has(selectedImageIndex) ? "opacity-100" : "opacity-0"
            }`}
            priority={selectedImageIndex === 0}
            quality={85}
          />
          {!loadedImages.has(selectedImageIndex) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loader"></div>
            </div>
          )}
        </div>
      )}

      {/* Thumbnail Grid */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-1.5 lg:gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`aspect-square w-16 cursor-pointer overflow-hidden border-2 transition-all duration-200 lg:w-20 ${
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
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                loading="eager"
                quality={75}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
