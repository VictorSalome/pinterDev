'use client';

import { Suspense, useCallback, useEffect, useState } from "react";
import { IUnsplashImage } from "../Interfaces/interfaces";
import { ImageCard } from "../components/ImageCard";
import { useInView } from "react-intersection-observer";
import { LoadingSpinner } from "../components/LoadingSpinner";

function SearchContent() {
  const [images, setImages] = useState<IUnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const searchImages = useCallback(async () => {
    if (loading || !query) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        {
          headers: {
            'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1',
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const newImages = data.results.filter((newImage: IUnsplashImage) => 
        !images.some(existingImage => existingImage.id === newImage.id)
      );

      setImages(prev => [...prev, ...newImages]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Erro ao pesquisar imagens:", err);
      setError("Falha ao carregar as imagens. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [loading, page, query, images]);

  useEffect(() => {
    if (inView && !loading && query) {
      searchImages();
    }
  }, [inView, loading, searchImages, query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setImages([]);
          setPage(1);
        }}
        placeholder="Pesquisar imagens..."
        className="w-full p-2 border rounded-lg mb-8"
      />

      {error && (
        <div className="text-red-500 text-center my-4">
          {error}
        </div>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((image, index) => (
          <div key={`${image.id}-${index}`} className="mb-4 break-inside-avoid">
            <ImageCard image={image} />
          </div>
        ))}
      </div>

      {loading && <LoadingSpinner />}
      <div ref={ref} className="h-10" />
    </div>
  );
}

export default function Search() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<LoadingSpinner />}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
