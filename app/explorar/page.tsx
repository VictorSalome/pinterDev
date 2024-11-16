'use client';

import { Suspense, useCallback, useEffect, useState } from "react";
import { HeaderGlobal } from "../components/HeaderGlobal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUnsplashImage } from "../Interfaces/interfaces";
import { ImageCard } from "../components/ImageCard";
import { useInView } from "react-intersection-observer";

// Componente para o conteúdo principal
function ExplorarContent() {
  const [images, setImages] = useState<IUnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const nextImage = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      setImages((prev) => [...prev, ...data]);
    } catch (err) {
      console.error("Erro ao carregar imagens:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    nextImage();
  }, [nextImage]);

  useEffect(() => {
    if (inView && !loading) {
      nextImage();
    }
  }, [inView, loading, nextImage]);

  return (
    <>
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList>
          <TabsTrigger value="for-you">Para você</TabsTrigger>
          <TabsTrigger value="today">Hoje</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-8">
        {images.map((image) => (
          <div key={image.id} className="mb-4 break-inside-avoid">
            <ImageCard image={image} />
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div ref={ref} className="h-10" />
    </>
  );
}

// Componente principal com Suspense
export default function Explorar() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderGlobal />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        }>
          <ExplorarContent />
        </Suspense>
      </div>
    </main>
  );
}
