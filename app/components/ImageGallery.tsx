"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { fetchRandomImages } from "@/data/service";
import ImageCard from "./ImageCard";

interface IImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<IImage[]>([]);
  console.log('images', images)
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMoreImages();
  }, []);

  const getMoreImages = async () => {
    const newImages = await fetchRandomImages(page + 1);
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
      loader={<h4>Loading...</h4>}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            imageUrl={image.urls.small}
            altDescription={image.alt_description}
          />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};

export default ImageGallery;
