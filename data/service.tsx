import axios from 'axios';

const UNSPLASH_URL = 'https://api.unsplash.com/photos';

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
