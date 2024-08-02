import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // 스토리지에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
)

export default useUserStore;