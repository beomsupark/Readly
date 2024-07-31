import { create } from 'zustand';
import { createPhotoCard } from '../api/photocardAPI';

const usePhotocardStore = create((set) => ({
  photoCard: null,
  isLoading: false,
  error: null,

  createPhotoCard: async (bookId, text, visibility, memberId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createPhotoCard(bookId, text, visibility, memberId);
      set({ photoCard: response.CreatePhotoCardResponse, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default usePhotocardStore;