import React, { useState } from 'react';
import './SearchBar.css';

// props type
type SearchBarProps = {
  onSearch(searchTerm: string): void;
  isLoading: boolean;
};

// SearchBar component
function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Stop page refresh

    // Only search if there's text
    if (searchTerm.trim().length > 0) {
      onSearch(searchTerm);
    }
  }

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for GIFs..."
        disabled={isLoading}
      />

      {/* Search button */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;
