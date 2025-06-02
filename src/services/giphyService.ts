import axios from 'axios';
import { config } from '../config';
import { SearchResponse } from '../types/giphy';

export const searchGifs = async (searchTerm: string) => {
  try {
    const response = await axios.get<SearchResponse>('https://api.giphy.com/v1/gifs/search', {
      params: {
        // eslint-disable-next-line camelcase
        api_key: config.GIPHY_API_KEY, 
        q: searchTerm,
        limit: 20
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Error:', error);
    }
    throw error;
  }
}; 