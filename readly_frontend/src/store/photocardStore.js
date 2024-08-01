import { create } from 'zustand';
import { createPhotoCard, updatePhotoCard } from '../api/photocardAPI';

const usePhotocardStore = create((set) => ({
  photoCard: null,
  isLoading: false,
  error: null,

  createPhotoCard: async (bookId, text, visibility, memberId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createPhotoCard(bookId, text, visibility, memberId);
      set({ photoCard: response, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updatePhotoCard: async (imageLink, photoCardId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPhotoCard = await updatePhotoCard(imageLink, photoCardId);
      set({ photoCard: updatedPhotoCard, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  setPhotoCard: (state, photoCard) => {
    state.photoCard = photoCard;
  },
}));

export default usePhotocardStore;