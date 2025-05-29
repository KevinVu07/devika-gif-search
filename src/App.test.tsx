import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// 1. Basic Render Tests - Check if components show up
describe('App Component Basic Renders', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('shows the app title', () => {
    // Find the heading that says "Giphy Search"
    const title = screen.getByText('Giphy Search');
    expect(title).toBeInTheDocument();
  });

  test('shows the search input', () => {
    // Find input by its placeholder text
    const searchInput = screen.getByPlaceholderText('Search for GIFs...');
    expect(searchInput).toBeInTheDocument();
  });

  test('shows the search button', () => {
    // Find button by its text
    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });
});

// 2. User Interaction Tests - Check if things work when users do something
describe('Search Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('search button is enabled by default', () => {
    const searchButton = screen.getByText('Search');
    expect(searchButton).not.toBeDisabled();
  });

  test('can type in search input', () => {
    // Find the search input
    const searchInput = screen.getByPlaceholderText('Search for GIFs...');

    // Simulate typing "cats"
    fireEvent.change(searchInput, { target: { value: 'cats' } });

    // Check if the input now has "cats" as its value
    expect(searchInput).toHaveValue('cats');
  });
});

// 3. Loading State Tests - Check if loading states work
describe('Loading States', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('shows loading spinner when searching', async () => {
    // Get the input and button
    const searchInput = screen.getByPlaceholderText('Search for GIFs...');
    const searchButton = screen.getByText('Search');

    // Type and submit search
    fireEvent.change(searchInput, { target: { value: 'cats' } });
    fireEvent.click(searchButton);

    // Check if loading spinner appears
    const loadingSpinner = await screen.findByText('Loading GIFs...');
    expect(loadingSpinner).toBeInTheDocument();
  });
});

// 4. Error State Tests - Check if errors are handled
describe('Error States', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('shows error message when search fails', async () => {
    // Get the input and button
    const searchInput = screen.getByPlaceholderText('Search for GIFs...');
    const searchButton = screen.getByText('Search');

    // Type and submit search
    fireEvent.change(searchInput, { target: { value: 'cats' } });
    fireEvent.click(searchButton);

    // Check if error message appears (if search fails)
    const errorMessage = await screen.findByText(
      'Failed to search GIFs. Please try again.',
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
