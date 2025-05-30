# Giphy Search App

A modern React application that allows users to search and interact with GIFs using the Giphy API. Built with TypeScript and the Baseline framework.

## 🌟 Features

- Real-time GIF search using Giphy's API
- Responsive grid layout for GIF display
- Copy GIF URL functionality
- Direct links to view GIFs on Giphy
- Loading states and error handling
- WebP format support for optimal performance

## 🚀 Live Demo

- Production: https://d22pvh2ls1mdfs.cloudfront.net
- Staging: https://d2vymdr9z8ehz5.cloudfront.net

## 🛠️ Technologies Used

- React
- TypeScript
- Baseline Framework
- React Testing Library
- AWS (CloudFront for deployment)
- Giphy API

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Giphy API Key

## 🔧 Setup

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd gif-search
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Giphy API key:

   ```
   REACT_APP_GIPHY_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🧪 Running Tests

```bash
npm test
```

Tests cover:

- Basic component rendering

## 📦 Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🔍 Project Structure

```
src/
  ├── components/     # React components
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── App.tsx        # Main application component
  ├── App.test.tsx   # Test suite
  └── index.tsx      # Application entry point
```

## 📄 License

This project is licensed under the MIT License.
