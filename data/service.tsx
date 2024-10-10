import { IUnsplashImage } from '@/app/Interfaces/interfaces';
import axios from 'axios';

const UNSPLASH_URL = 'https://api.unsplash.com/photos';




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




export const searchImagesByName = async (query: string, page: number = 1): Promise<IUnsplashImage[]> => {
    const searchQuery = encodeURIComponent(query);
    const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery}`, {
        params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

        },

    });

    return response.data.results || [];

}

export const viewImageByCaytegory = async (category: string, page: number = 1): Promise<IUnsplashImage[]> => {

    const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${category}`, {
        params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

        },

    });

    return response.data.results || [];
}

