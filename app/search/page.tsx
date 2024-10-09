"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { searchImagesByName } from "@/data/service"; // Função de busca

interface IImage {
    id: string;
    urls: {
        small: string;
    };
    alt_description: string;
}

const Search = () => {
    const [images, setImages] = useState<IImage[]>([]);
    const [page, setPage] = useState(1);
    const searchParams = useSearchParams();
    const query = searchParams.get("query"); // Obtém o valor da query

    useEffect(() => {
        if (query) {
            fetchImages();
        }
    }, [query]);

    const fetchImages = async () => {
        const newImages = await searchImagesByName(query || "", page);
        setImages((prev) => [...prev, ...newImages]);
        setPage((prev) => prev + 1);
    };

    const breakpointColumnsObj = {
        default: 5,
        1100: 4,
        700: 3,
        500: 2,
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
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
                                className="border rounded-xl w-full"
                            />
                        </div>
                    ))}
                </Masonry>
            </InfiniteScroll>
        </div>
    );
};

export default Search;
