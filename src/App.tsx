import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { searchGifs } from './services/giphyService';
import { GiphyGif } from './types/giphy';
import './App.css';

function App() {
  // State variables
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [gifs, setGifs] = useState<GiphyGif[]>([]); // Store GIFs generated from the search
  const [error, setError] = useState<string>(''); // For error messages
  const [copiedId, setCopiedId] = useState<string>(''); // Track which GIF URL was copied

  // Function that runs when user submits a search
  const handleSearch = async (searchTerm: string) => {
    // the search term is passed in as a prop from the SearchBar component, search process starts
    setIsLoading(true); // Show loading spinner
    setError(''); // Clear any old errors
    setGifs([]); // Clear old results

    try {
      const response = await searchGifs(searchTerm);
      setGifs(response.data); // Save the GIFs generated from the search
    } catch (err) {
      setError('Failed to search GIFs. Please try again.');
      setGifs([]);
    } finally {
      // stop loading spinner
      setIsLoading(false);
    }
  };

  // Function to copy a GIF's URL
  const handleCopyUrl = async (gif: GiphyGif) => {
    try {
      // Copy the fixed_width URL
      await navigator.clipboard.writeText(gif.images.fixed_width.url);
      setCopiedId(gif.id); // Remember which GIF was copied to compare with the current GIF
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => setCopiedId(''), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="App">
      <h1>Giphy Search</h1>
      <p>
        <i>Powered by GIPHY</i>
      </p>

      {/* Search bar - pass in as props are search function and loading state */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Show error message if there is one */}
      {error && <p className="error-message">{error}</p>}

      {/* Show either loading spinner or GIF grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="gif-grid">
          {/* Map through generated GIFs and show each one */}
          {gifs.map((gif) => (
            <div key={gif.id} className="gif-item">
              {/* Use webp format for better performance */}
              <picture>
                {/* Try WebP first if browser supports it */}
                <source
                  srcSet={gif.images.fixed_width.webp}
                  type="image/webp"
                />
                {/* Fallback to regular GIF */}
                <img
                  src={gif.images.fixed_width.url}
                  alt={gif.title}
                  loading="lazy"
                  width={gif.images.fixed_width.width}
                  height={gif.images.fixed_width.height}
                />
              </picture>
              {/* Buttons for copying URL and viewing on Giphy */}
              <div className="gif-actions">
                <button
                  onClick={() => handleCopyUrl(gif)}
                  className="action-button"
                >
                  {copiedId === gif.id ? 'Copied!' : 'Copy URL'}
                </button>
                <a
                  href={gif.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button"
                >
                  View on Giphy
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
