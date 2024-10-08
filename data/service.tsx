import axios from 'axios';

const UNSPLASH_URL = 'https://api.unsplash.com/photos';
export interface UnsplashImage {
    id: string;
    alt_description: string;
    urls: {
        small: string;
        full: string;
    };
    user: {
        name: string;
    };
    // Adicione outros campos que precisar
}



export const fetchImages = async (page: number = 1) => {
    const response = await axios.get(UNSPLASH_URL, {
        params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            page,
            per_page: 30,
        },
    });
    return response.data;
};

export const fetchImagesByCategory = async (category: string, page: number = 1): Promise<UnsplashImage[]> => {
    const response = await axios.get(UNSPLASH_URL, {
        params: {
            query: category,
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            page,
            per_page: 30,
        },
    });

    return response.data.results || []; // Retorna um array
}