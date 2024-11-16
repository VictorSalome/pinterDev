"use client";

import { IUnsplashImage } from "@/app/Interfaces/interfaces";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

import { Download, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  image: IUnsplashImage;
}

export function ModalDetail({ isOpen, onClose, image }: ModalDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {image.description || image.alt_description}
              </h2>
              <p className="text-muted-foreground">
                Fotografia por{" "}
                <a
                  href={image.user.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:underline"
                >
                  {image.user.name}
                </a>
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
