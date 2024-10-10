'use client';

import { useEffect, useState } from 'react';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IUnsplashImage } from '@/app/Interfaces/interfaces'; // Importe sua interface
import { viewImageByCaytegory } from '@/data/service';

const Page = () => {
    const [images, setImages] = useState<IUnsplashImage[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = ['Carros', 'Natureza', 'Esportes', 'Anime', 'Séries'];

    const handleCategorySelect = async (category: string) => {
        setSelectedCategory(category);
        const fetchedImages = await viewImageByCaytegory(category);
        setImages(fetchedImages);
    };

    useEffect(() => {
        if (selectedCategory) {
            handleCategorySelect(selectedCategory);
        }
    }, [selectedCategory]);

    return (
        <div className="container mx-auto p-4">
            <div className="text-center my-8">
                <h1 className="text-3xl font-bold mb-2">10 de outubro de 2024 Inspire-se</h1>
                <p className="text-lg text-gray-600">Uma coleção de ideias inspiradoras para o seu dia</p>
            </div>

            <div className="flex justify-center mb-8">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant="outline"
                        className="mx-2"
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((image: IUnsplashImage, index: number) => (
                    <Card key={index} className="relative group overflow-hidden">
                        <Image
                            src={image.urls.small}
                            alt={image.alt_description}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                        />
                        <CardContent className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-70">
                            <CardTitle>{image.description || 'Imagem sem descrição'}</CardTitle>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Page;
