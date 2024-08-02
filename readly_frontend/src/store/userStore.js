import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (userData) => set({ user: userData }),
      setToken: (token) => set({ token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useUserStore;


// src/store/userStore.js
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// const useUserStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (userData) => set({ user: userData }),
//       clearUser: () => set({ user: null }),
//     }),
//     {
//       name: 'user-storage', // 로컬 스토리지에 저장될 키 이름
//     }
//   )
// )

// export default useUserStore;