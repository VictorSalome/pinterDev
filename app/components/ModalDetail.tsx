"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IUnsplashImage } from "@/app/Interfaces/interfaces";
import Image from "next/image";

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  image: IUnsplashImage;
}

export function ModalDetail({ isOpen, onClose, image }: ModalDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="relative">
          <Image
            src={image.urls.regular}
            alt={image.alt_description || "Image detail"}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white rounded-b-lg">
            <p className="font-medium">{image.description || image.alt_description}</p>
            <p className="text-sm opacity-75">Por {image.user.name}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
