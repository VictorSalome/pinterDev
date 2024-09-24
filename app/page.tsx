"use client";

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Image from 'next/image';
import { fetchImages } from '@/data/service';

interface IImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const Home = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState(1);

  const getMoreImages = async () => {
    const newImages = await fetchImages(page);
    setImages((prev) => [...prev, ...newImages]);
    setPage(page + 1);
  };

  useEffect(() => {
    getMoreImages();
  }, []);

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={getMoreImages}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id}>
            <Image src={image.urls.small} alt={image.alt_description} width={300} height={300} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Home;
