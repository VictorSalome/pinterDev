'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { IUnsplashImage } from '@/app/Interfaces/interfaces';
import { viewImageByCaytegory } from '@/data/service';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import { Loader } from '@/app/components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Page = () => {
    const [images, setImages] = useState<IUnsplashImage[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('nature');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [carouselImages, setCarouselImages] = useState<IUnsplashImage[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { toast } = useToast();

    const categories = [
        { id: 'cars', label: 'Carros', icon: '🚗' },
        { id: 'nature', label: 'Natureza', icon: '🌲' },
        { id: 'sports', label: 'Esportes', icon: '⚽' },
        { id: 'anime', label: 'Anime', icon: '🎭' },
        { id: 'series', label: 'Séries', icon: '🎬' },
        { id: 'movies', label: 'Filmes', icon: '🎥' },
        { id: 'animals', label: 'Animais', icon: '🐾' },
        { id: 'food', label: 'Comida', icon: '🍔' }
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === carouselImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? carouselImages.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [carouselImages.length]);

    const fetchImages = useCallback(async () => {
        if (!selectedCategory || isLoading) return;

        try {
            setIsLoading(true);
            const newImages = await viewImageByCaytegory(selectedCategory);
            
            if (newImages.length === 0) {
                setHasMore(false);
                return;
            }

            setImages(prev => [...prev, ...newImages]);
            if (carouselImages.length === 0) {
                setCarouselImages(newImages.slice(0, 5));
            }
            setPage(prev => prev + 1);
        } catch (error) {
            toast({
                title: "Erro ao carregar imagens",
                description: "Tente novamente mais tarde",
                variant: "destructive"
            });
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedCategory, isLoading, toast, carouselImages.length]);

    const handleCategorySelect = async (category: string) => {
        setSelectedCategory(category);
        setImages([]);
        setPage(1);
        setHasMore(true);
        
        try {
            setIsLoading(true);
            const newImages = await viewImageByCaytegory(category);
            setImages(newImages);
            setCarouselImages(newImages.slice(0, 5));
            
            toast({
                title: "Categoria alterada",
                description: `Mostrando imagens de ${categories.find(c => c.id === category)?.label}`,
            });
        } catch (error) {
            toast({
                title: "Erro ao carregar categoria",
                description: "Tente novamente mais tarde",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []); 

    const breakpointColumnsObj = {
        default: 4,
        1536: 4,
        1280: 3,
        1024: 3,
        768: 2,
        640: 1
    };

    return (
        <ScrollArea className="h-full w-full">
            <div className="container mx-auto px-4 py-8 space-y-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl font-bold tracking-tight scroll-m-20 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Inspire-se Hoje
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore nossa coleção curada de imagens inspiradoras para despertar sua criatividade
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        {carouselImages[currentImageIndex] && (
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={carouselImages[currentImageIndex].urls.regular}
                                    alt={carouselImages[currentImageIndex].alt_description || "Carousel image"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h2 className="text-2xl font-bold mb-2">
                                        {carouselImages[currentImageIndex].description || "Imagem em destaque"}
                                    </h2>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                        onClick={prevImage}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                        onClick={nextImage}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                <Tabs defaultValue={selectedCategory} className="w-full">
                    <TabsList className="flex flex-wrap justify-center h-auto gap-2 bg-transparent">
                        {categories.map(({ id, label, icon }) => (
                            <TabsTrigger
                                key={id}
                                value={id}
                                onClick={() => handleCategorySelect(id)}
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
                            >
                                <span className="mr-2">{icon}</span>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <InfiniteScroll
                    dataLength={images.length}
                    next={fetchImages}
                    hasMore={hasMore}
                    loader={<Loader />}
                    endMessage={
                        <Badge variant="secondary" className="mx-auto block w-fit">
                            Não há mais imagens para carregar
                        </Badge>
                    }
                >
                    <AnimatePresence>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex -ml-4 w-auto"
                            columnClassName="pl-4 bg-clip-padding"
                        >
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id || index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Card className="mb-4 overflow-hidden group hover:shadow-lg transition-all duration-300">
                                        <CardContent className="p-0">
                                            <AspectRatio ratio={4/3}>
                                                {isLoading ? (
                                                    <Skeleton className="w-full h-full" />
                                                ) : (
                                                    <>
                                                        <Image
                                                            src={image.urls.small}
                                                            alt={image.alt_description || 'Imagem inspiradora'}
                                                            fill
                                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <motion.div 
                                                            className="absolute bottom-0 left-0 right-0 p-4 text-white"
                                                            initial={{ y: 100 }}
                                                            whileHover={{ y: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <h3 className="text-sm font-medium line-clamp-2 drop-shadow-lg">
                                                                {image.description || 'Imagem sem descrição'}
                                                            </h3>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </AspectRatio>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </Masonry>
                    </AnimatePresence>
                </InfiniteScroll>
            </div>
        </ScrollArea>
    );
};

export default Page;
