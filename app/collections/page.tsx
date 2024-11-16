"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, FolderPlus, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface ICollection {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    imageCount: number;
    isPrivate: boolean;
}

const Collections = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [collections, setCollections] = useState<ICollection[]>([
        {
            id: "1",
            title: "Natureza",
            description: "Fotos de paisagens naturais",
            coverImage: "https://source.unsplash.com/random/800x600/?nature",
            imageCount: 42,
            isPrivate: false,
        },
        {
            id: "2",
            title: "Arquitetura",
            description: "Designs modernos e clássicos",
            coverImage: "https://source.unsplash.com/random/800x600/?architecture",
            imageCount: 28,
            isPrivate: true,
        },
        // Adicione mais coleções mock aqui
    ]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Minhas Coleções
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Organize e gerencie suas imagens favoritas
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            className="rounded-full"
                        >
                            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                        </Button>
                        <Button className="rounded-full gap-2">
                            <Plus className="h-4 w-4" />
                            Nova Coleção
                        </Button>
                    </div>
                </div>

                {/* Grid de Coleções */}
                <div className={`grid gap-4 ${
                    viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                    : "grid-cols-1"
                }`}>
                    {collections.map((collection) => (
                        <motion.div
                            key={collection.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                <CardHeader className="relative p-0">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={collection.coverImage}
                                            alt={collection.title}
                                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                        />
                                        {collection.isPrivate && (
                                            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                                                🔒 Privada
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg mb-1">{collection.title}</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        {collection.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {collection.imageCount} imagens
                                    </span>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        Ver coleção
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Card para adicionar nova coleção */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card className="h-full flex flex-col items-center justify-center p-8 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
                            <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Criar Nova Coleção</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Organize suas imagens favoritas em uma nova coleção
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Collections; 