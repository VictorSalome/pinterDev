import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { IUnsplashImage } from "../Interfaces/interfaces"; // Importe sua interface

interface ModalDetailProps {
    isOpen: boolean;
    onClose: () => void;
    image: IUnsplashImage; // Altere aqui para receber a imagem inteira
}

export const ModalDetail = ({ isOpen, onClose, image }: ModalDetailProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">{image.alt_description || "Sem descrição"}</DialogTitle>
            <DialogDescription className="text-gray-500">{image.description}</DialogDescription>
          </DialogHeader>
  
          <Image
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            width={300}
            height={300}
            className="w-full h-auto rounded-md my-4 object-cover"
          />
  
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Fotógrafo:</strong> {image.user.name}
            </p>
            <p className="text-gray-700">
              <strong>Portfolio:</strong>{" "}
              <a href={image.user.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {image.user.portfolio_url}
              </a>
            </p>
          </div>
  
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onClose}>
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};
