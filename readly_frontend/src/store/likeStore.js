// likeStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { addLike, removeLike } from '../api/likeAPI';

const useLikeStore = create(persist(
  (set, get) => ({
    likes: {},
    toggleLike: async (userId, itemId, itemType) => {
      const currentLikes = get().likes;
      const isLiked = currentLikes[itemId];

      // 먼저 상태를 변경하여 사용자에게 즉각적인 피드백을 제공
      set(state => ({
        likes: {
          ...state.likes,
          [itemId]: !isLiked
        }
      }));

      try {
        if (isLiked) {
          await removeLike(userId, itemType === 'review' ? itemId : null, itemType === 'photoCard' ? itemId : null);
        } else {
          await addLike(userId, itemType === 'review' ? itemId : null, itemType === 'photoCard' ? itemId : null);
        }
      } catch (error) {
        // 에러가 발생하면 좋아요 상태를 다시 원래대로 되돌림
        set(state => ({
          likes: {
            ...state.likes,
            [itemId]: isLiked
          }
        }));
        console.error('Error toggling like:', error);
      }
    },
    setInitialLikeStatus: (itemId, status) => {
      set(state => ({
        likes: {
          ...state.likes,
          [itemId]: status
        }
      }));
    }
  }),
  {
    name: 'like-storage',
    getStorage: () => localStorage,
  }
));

export default useLikeStore;
