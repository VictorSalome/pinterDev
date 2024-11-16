"use client";

import { useEffect, useState, useCallback } from "react";
import { ImageCard } from "./ImageCard";
import { IUnsplashImage } from "@/app/Interfaces/interfaces";
import { useInView } from "react-intersection-observer";

export function ImageGallery() {
  const [images, setImages] = useState<IUnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      setImages((prevImages) => [...prevImages, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (inView && !loading) {
      fetchImages();
    }
  }, [inView, loading, fetchImages]);

  if (images.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="mb-4 break-inside-avoid">
          <ImageCard image={image} />
        </div>
      ))}
      <div ref={ref} className="h-10" />
    </div>
  );
}
