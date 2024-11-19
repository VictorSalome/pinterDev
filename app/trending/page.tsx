"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "../components/CategoryCard";
import { ImageGallery } from "../components/ImageGallery";
import { IUnsplashImage } from "../Interfaces/interfaces";
import { LoadingSpinner } from "../components/LoadingSpinner";

const categories = [
  {
    id: "animals",
    title: "Animais",
    image: "/images/categories/animals.jpg",
    description: "Fotos incríveis do reino animal",
    query: "animals nature wildlife"
  },
  {
    id: "cars",
    title: "Carros",
    image: "/images/categories/cars.jpg",
    description: "Automóveis espetaculares",
    query: "luxury cars automotive"
  },
  {
    id: "anime",
    title: "Anime",
    image: "/images/categories/anime.jpg",
    description: "Arte e cultura japonesa",
    query: "anime manga japanese-art"
  },
  {
    id: "music",
    title: "Música",
    image: "/images/categories/music.jpg",
    description: "O mundo da música em imagens",
    query: "music instruments concert"
  },
  {
    id: "landscapes",
    title: "Paisagens",
    image: "/images/categories/landscapes.jpg",
    description: "Paisagens deslumbrantes",
    query: "landscape nature scenic"
  },
  {
    id: "places",
    title: "Lugares",
    image: "/images/categories/places.jpg",
    description: "Destinos fascinantes",
    query: "travel destinations architecture"
  },
  {
    id: "food",
    title: "Gastronomia",
    image: "/images/categories/food.jpg",
    description: "Delícias culinárias",
    query: "food cooking culinary"
  },
  {
    id: "sports",
    title: "Esportes",
    image: "/images/categories/sports.jpg",
    description: "Momentos esportivos marcantes",
    query: "sports athletic action"
  }
];

export default function TrendingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [images, setImages] = useState<IUnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = async (category: string) => {
    try {
      setLoading(true);
      const selectedCat = categories.find(cat => cat.id === category);
      if (!selectedCat) return;

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${selectedCat.query}&page=${page}&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        {
          headers: {
            'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1'
          }
        }
      );

      if (!response.ok) throw new Error('Falha ao carregar imagens');

      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchImages(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-white pt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tendências</h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore as categorias mais populares e descubra imagens incríveis
          </p>
        </motion.div>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard
                title={category.title}
                image={category.image}
                description={category.description}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Seção de Imagens */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {categories.find(cat => cat.id === selectedCategory)?.title}
            </h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ImageGallery images={images} />
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
} 