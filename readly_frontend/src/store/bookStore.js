import { create } from 'zustand';
import { fetchBooks, searchBooksByTitle } from '../api/bookAPI.js';

const useBookStore = create((set) => ({
  books: [],
  searchResults: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const books = await fetchBooks();
      console.log("Fetched books:", books);
      set({ books, loading: false });
    } catch (error) {
      console.error("Error in fetchBooks:", error);
      set({ error: error.message || 'Failed to fetch books', loading: false });
    }
  },

  searchBooks: async (title) => {
    set({ loading: true, error: null });
    try {
      const searchResults = await searchBooksByTitle(title);
      set({ searchResults, loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to search books', loading: false });
    }
  },
}));

export default useBookStore;