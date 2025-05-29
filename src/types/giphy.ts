// This type defines what a single GIF looks like
export interface GiphyGif {
  id: string;           // The unique ID of the GIF
  title: string;        // The title of the GIF
  url: string;          // The URL where we can view the GIF
  images: {
    original: {
      url: string;     // The URL of the original size GIF
    }
  }
}

// This type defines what we get back from the API when we search
export interface SearchResponse {
  data: GiphyGif[];    // An array of GIFs
} 

