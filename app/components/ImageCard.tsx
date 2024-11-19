"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Bookmark, Share2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IUnsplashImage } from "../Interfaces/interfaces";

interface ImageCardProps {
  image: IUnsplashImage;
}

export function ImageCard({ image }: ImageCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.urls.full);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao fazer download:', error);
    }
  };

  return (
    <>
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative group">
        {/* Imagem Principal */}
        <div
          className="relative cursor-zoom-in"
          onClick={() => setShowDialog(true)}
        >
          <div className="relative" style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}>
            <Image
              src={image.urls.regular}
              alt={image.alt_description || "Unsplash Image"}
              fill
              className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                }`}
              onLoadingComplete={() => setIsLoading(false)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          {/* Overlay com botões */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart
                  className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSaved(!isSaved);
                }}
              >
                <Bookmark
                  className={`h-5 w-5 ${isSaved ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'}`}
                />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
              >
                <Download className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
        </div>

        {/* Informações do usuário */}
        <div className="p-3 bg-whi">
          <div className="flex items-center gap-2">
            <Image
              src={image.user.profile_image.small}
              alt={image.user.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm font-medium text-gray-900">
              {image.user.name}
            </p>
          </div>
        </div>
      </div>

      {/* Dialog de detalhes */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Lado esquerdo - Imagem */}
            <div className="relative bg-black flex items-center">
              <Image
                src={image.urls.regular}
                alt={image.alt_description || ""}
                fill
                className="object-contain"
              />
            </div>

            {/* Lado direito - Informações */}
            <div className="p-6 w-full">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {image.description || image.alt_description || "Sem título"}
                </DialogTitle>
              </DialogHeader>

              {/* Ações */}
              <div className="flex gap-2 mt-4 ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {isLiked ? 'Curtido' : 'Curtir'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                  {isSaved ? 'Salvo' : 'Salvar'}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Compartilhar
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </div>

              {/* Informações do usuário */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={image.user.profile_image.medium}
                    alt={image.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{image.user.name}</p>
                    <p className="text-sm text-gray-500">@{image.user.username}</p>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold">{image.likes}</p>
                  <p className="text-sm text-gray-500">Curtidas</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{image.views || 0}</p>
                  <p className="text-sm text-gray-500">Visualizações</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{image.downloads || 0}</p>
                  <p className="text-sm text-gray-500">Downloads</p>
                </div>
              </div>

              {/* Tags */}
              {image.tags && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Tags relacionadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag: any, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
