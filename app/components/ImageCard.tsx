import { useState } from "react";
import Image from "next/image";
import { ModalDetail } from "./ModalDetail"; // Importe o modal
import { IUnsplashImage } from "../Interfaces/interfaces";

interface ImageCardProps {
  image: IUnsplashImage; // Mantenha a imagem como prop
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDetailModalPhoto = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mb-4">
      <Image
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        width={300}
        height={300}
        className="border rounded-xl w-full cursor-pointer"
        onClick={openDetailModalPhoto} // Abre o modal ao clicar na imagem
      />

      {isOpen && (
        <ModalDetail
          isOpen={isOpen}
          onClose={closeModal}
          image={image} // Passe a imagem inteira aqui
        />
      )}
    </div>
  );
};

export default ImageCard;
