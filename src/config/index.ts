export const config = {
  GIPHY_API_KEY: process.env.REACT_APP_GIPHY_API_KEY || '',
  GIPHY_API_URL: 'https://api.giphy.com/v1/gifs',
};

// Validate required environment variables
if (!config.GIPHY_API_KEY) {
  console.error('Missing required environment variable: REACT_APP_GIPHY_API_KEY');
} 