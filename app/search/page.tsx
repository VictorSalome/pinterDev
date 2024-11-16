"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HeaderGlobal } from "../components/HeaderGlobal";
import { IUnsplashImage } from "../Interfaces/interfaces";
import { ImageCard } from "../components/ImageCard";
import { useInView } from "react-intersection-observer";
import { Suspense } from 'react';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [images, setImages] = useState<IUnsplashImage[]>([]);
    const [loading, setLoading] = useState(false);
    const { ref, inView } = useInView();
    const [page, setPage] = useState(1);

    const handleInitialSearch = useCallback(async () => {
        if (!query) return;
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            setImages(data.results);
            setPage(2);
        } catch (err) {
            console.error("Erro na busca:", err);
        } finally {
            setLoading(false);
        }
    }, [query]);

    const fetchMoreImages = useCallback(async () => {
        if (!query) return;
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            setImages((prev) => [...prev, ...data.results]);
            setPage((prev) => prev + 1);
        } catch (err) {
            console.error("Erro ao carregar mais imagens:", err);
        } finally {
            setLoading(false);
        }
    }, [query, page]);

    useEffect(() => {
        handleInitialSearch();
    }, [handleInitialSearch]);

    useEffect(() => {
        if (inView && !loading) {
            fetchMoreImages();
        }
    }, [inView, loading, fetchMoreImages]);

    return (
        <main className="min-h-screen bg-white">
            <HeaderGlobal />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">
                    Resultados para: {query}
                </h1>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
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
            </div>
        </main>
    );
}

export default function Search() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>}>
            <SearchContent />
        </Suspense>
    );
}
