"use client";

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
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
    const newImages = await fetchImages(page + 1);
    setImages([...images, ...newImages]);
    setPage(page + 1);
  };

  useEffect(() => {
    getMoreImages();
  }, []);

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2
  };

  return (
    <>
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
            <div key={image.id} className="mb-4">
              <Image 
                src={image.urls.small} 
                alt={image.alt_description} 
                width={300} 
                height={300} 
                className='border rounded-xl w-full' 
              />
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </>
  );
};

export default Home;
