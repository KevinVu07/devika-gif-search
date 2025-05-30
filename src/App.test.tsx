import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('shows the app title', () => {
    const title = screen.getByText('Giphy Search');
    expect(title).toBeInTheDocument();
  });

  test('shows the search input', () => {
    const searchInput = screen.getByPlaceholderText('Search for GIFs...');
    expect(searchInput).toBeInTheDocument();
  });

  test('shows the search button', () => {
    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  test('can type in search input', () => {
    const searchInput = screen.getByPlaceholderText('Search for GIFs...');
    fireEvent.change(searchInput, { target: { value: 'cats' } });
    expect(searchInput).toHaveValue('cats');
  });
});
