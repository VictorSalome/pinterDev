"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchImagesByName } from "@/data/service";
import { Input } from "@/components/ui/input";
import { TfiClose, TfiSearch } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

import { IUnsplashImage } from "@/app/Interfaces/interfaces";
import { ImageCard } from "../components/ImageCard";


const Search = () => {
    const [images, setImages] = useState<IUnsplashImage[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("query");
    const { toast } = useToast();

    useEffect(() => {
        if (query) {
            setSearchValue(query);
            handleInitialSearch(query);
        }
    }, [query]);

    const handleInitialSearch = async (searchQuery: string) => {
        try {
            setIsLoading(true);
            setImages([]);
            setPage(1);
            const searchResults = await searchImagesByName(searchQuery, 1);
            setImages(searchResults);
        } catch (error) {
            toast({
                title: "Erro na busca",
                description: "Não foi possível realizar a busca. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchValue("");
        setImages([]);
        setPage(1);
        setHasMore(true);
        router.push("/search");
    };

    const handleSearch = async () => {
        if (searchValue.trim() === "") return;

        try {
            setIsLoading(true);
            setImages([]);
            setPage(1);
            setHasMore(true);
            const searchResults = await searchImagesByName(searchValue.trim(), 1);
            setImages(searchResults);
            router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
        } catch (error) {
            toast({
                title: "Erro na busca",
                description: "Não foi possível realizar a busca. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchImages = useCallback(async () => {
        if (!query || isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const newImages = await searchImagesByName(query, page);

            if (newImages.length === 0) {
                setHasMore(false);
                return;
            }

            setImages(prev => [...prev, ...newImages]);
            setPage(prev => prev + 1);
        } catch (error) {
            toast({
                title: "Ops! Algo deu errado",
                description: "Não foi possível carregar as imagens. Por favor, tente novamente em alguns instantes.",
                variant: "destructive"
            });
            console.error("Error fetching images:", error);
        } finally {
            setIsLoading(false);
        }
    }, [query, page, isLoading, hasMore, toast]);

    const breakpointColumnsObj = {
        default: 2,  // Mobile primeiro
        640: 2,      // sm
        768: 3,      // md
        1024: 4,     // lg
        1280: 5,     // xl
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-2"
        >
            <div className="flex flex-col gap-3 mb-4">
                <div className="text-center space-y-2 px-2">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Descubra Imagens Incríveis
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
                        Explore nossa vasta coleção de imagens de alta qualidade.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sticky top-0 z-10 bg-background/80 backdrop-blur-lg p-2 sm:p-4 rounded-lg">
                    <div className="relative flex-1 min-w-0">
                        <div className="relative">
                            <TfiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground animate-pulse" />
                            <Input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyUp={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Ex: natureza, cidade, animais..."
                                className="w-full pl-10 pr-12 h-12 rounded-full bg-secondary/80 hover:bg-secondary/90 focus:bg-background border-none shadow-none ring-1 ring-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 [&::-webkit-search-cancel-button]:hidden outline-none"
                            />
                            {searchValue && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-secondary/80 rounded-full"
                                >
                                    <TfiClose className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={handleSearch}
                        className="rounded-full px-6 h-12 min-w-[120px]"
                        disabled={isLoading || searchValue.trim() === ""}
                    >
                        Buscar
                    </Button>
                </div>
            </div>

            {!query ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center min-h-[50vh] gap-4"
                >
                    <div className="text-6xl">🎨</div>
                    <p className="text-xl text-center text-muted-foreground magic-text px-4">
                        ✨ Explore um mundo de possibilidades visuais! ✨
                    </p>
                    <p className="text-center text-muted-foreground max-w-md">
                        Digite sua busca acima e descubra milhares de imagens incríveis para seu próximo projeto.
                    </p>
                </motion.div>
            ) : (
                <InfiniteScroll
                    dataLength={images.length}
                    next={fetchImages}
                    hasMore={hasMore}
                    loader={
                        <div className="flex flex-col items-center gap-2 p-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary magic-border"></div>
                            <p className="text-sm text-muted-foreground">Carregando mais imagens incríveis...</p>
                        </div>
                    }
                    endMessage={
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8 space-y-2"
                        >
                            <p className="text-xl text-muted-foreground magic-text">
                                ✨ Você chegou ao fim da galeria! ✨
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Tente uma nova busca para descobrir mais imagens incríveis
                            </p>
                        </motion.div>
                    }
                >
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <ImageCard image={image} />
                            </motion.div>
                        ))}
                    </Masonry>
                </InfiniteScroll>
            )}

            <style jsx global>{`
                .magic-text {
                    background: linear-gradient(to right, #ff4b1f, #1fddff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: hue 10s infinite linear;
                }

                .magic-border {
                    border-image: linear-gradient(45deg, #ff4b1f, #1fddff) 1;
                    animation: spin 1s linear infinite;
                }

                .magic-image {
                    filter: contrast(1.1) saturate(1.2);
                }

                .my-masonry-grid {
                    display: flex;
                    margin-left: -16px;
                    width: auto;
                }

                .my-masonry-grid_column {
                    padding-left: 16px;
                    background-clip: padding-box;
                }

                @keyframes hue {
                    from {
                        filter: hue-rotate(0deg);
                    }
                    to {
                        filter: hue-rotate(360deg);
                    }
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 640px) {
                    .my-masonry-grid {
                        margin-left: -8px;
                    }
                    .my-masonry-grid_column {
                        padding-left: 8px;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default Search;
