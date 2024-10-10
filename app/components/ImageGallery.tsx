"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { fetchRandomImages } from "@/data/service";
import ImageCard from "./ImageCard";
import { Loader } from "./Loader";
import { IUnsplashImage } from "../Interfaces/interfaces"; // Importe a interface aqui

const ImageGallery = () => {
  const [images, setImages] = useState<IUnsplashImage[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMoreImages();
  }, []);

  const getMoreImages = async () => {
    const newImages = await fetchRandomImages(page);
    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
  };

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={getMoreImages}
      hasMore={true}
      loader={<Loader />}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image} // Passa a imagem inteira para o componente ImageCard
          />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};

export default ImageGallery;
