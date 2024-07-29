import { create } from 'zustand';
import { fetchBooks, searchBooksByTitle } from '../api/bookAPI.js';

const useBookStore = create((set) => ({
  books: [],
  searchResults: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true });
    try {
      const books = await fetchBooks();
      set({ books, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  searchBooks: async (title) => {
    set({ loading: true });
    try {
      const searchResults = await searchBooksByTitle(title);
      set({ searchResults, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useBookStore;