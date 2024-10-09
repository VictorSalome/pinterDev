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



export const fetchRandomImages = async (page: number = 1) => {
    const response = await axios.get(UNSPLASH_URL, {
        params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            page,
            per_page: 30,
        },
    });
    return response.data;
};




export const searchImagesByName = async (query: string, page: number = 1): Promise<UnsplashImage[]> => {
    const searchQuery = encodeURIComponent(query);
    const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery}`, {
        params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

        },

    });

    return response.data.results || [];

}

