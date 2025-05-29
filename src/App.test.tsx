import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Basic Render Tests
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

// User Interaction Tests
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

// Loading State Tests
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

// Error State Tests - Check if errors are handled
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
