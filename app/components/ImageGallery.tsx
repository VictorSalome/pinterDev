"use client";

import { IUnsplashImage } from "../Interfaces/interfaces";
import { ImageCard } from "./ImageCard";

interface ImageGalleryProps {
  images: IUnsplashImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-4 mx-auto">
      {images.map((image, index) => (
        <ImageCard key={`${image.id}-${index}`} image={image} />
      ))}
    </div>
  );
}
