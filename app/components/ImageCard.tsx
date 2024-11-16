"use client";

import { IUnsplashImage } from "@/app/Interfaces/interfaces";
import Image from "next/image";
import { useState } from "react";
import { ModalDetail } from "./ModalDetail";
import { motion } from "framer-motion";

interface ImageCardProps {
  image: IUnsplashImage;
}

export function ImageCard({ image }: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative group cursor-zoom-in"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={image.urls.regular}
          alt={image.alt_description || "Unsplash Image"}
          width={image.width}
          height={image.height}
          className="w-full h-auto rounded-xl object-cover transition-all duration-300 group-hover:brightness-75"
          placeholder="blur"
          blurDataURL={image.blur_hash || ""}
        />
        <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-gradient-to-t from-black/50 to-transparent rounded-xl">
          <div className="text-white">
            <p className="font-medium line-clamp-2">{image.description || image.alt_description}</p>
            <p className="text-sm opacity-75">Por {image.user.name}</p>
          </div>
        </div>
      </motion.div>

      <ModalDetail isOpen={isOpen} onClose={() => setIsOpen(false)} image={image} />
    </>
  );
}
