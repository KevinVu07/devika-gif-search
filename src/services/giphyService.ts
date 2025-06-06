import axios from 'axios';
import { config } from '../config';
import { SearchResponse } from '../types/giphy';

// comment to push to commit for staging testing
export const searchGifs = async (searchTerm: string) => {
  // Input validation for XSS protection
  if (!searchTerm || typeof searchTerm !== 'string') {
    throw new Error('Invalid search term');
  }
  
  // Sanitize the search term (remove any HTML tags)
  const sanitizedTerm = searchTerm.replace(/<[^>]*>/g, '').trim();
  
  if (sanitizedTerm.length === 0) {
    throw new Error('Search term cannot be empty');
  }

  try {
    const response = await axios.get<SearchResponse>('https://api.giphy.com/v1/gifs/search', {
      params: {
        // eslint-disable-next-line camelcase
        api_key: config.GIPHY_API_KEY, 
        q: sanitizedTerm,
        limit: 20
      }
    });
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