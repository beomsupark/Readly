import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getMemberGroups } from '../api/communityAPI'

const groupStore = create(
  persist(
    (set, get) => ({
      groups: [],
      selectedGroupId: null,
      loading: false,
      error: null,
      fetchGroups: async (userId, token) => {
        set({ loading: true, error: null });
        try {
          const groups = await getMemberGroups(userId);
          set({ groups, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      selectGroup: (groupId) => set({ selectedGroupId: groupId }),
      getSelectedGroup: () => {
        const { groups, selectedGroupId } = get();
        return groups.find(group => group.groupId === selectedGroupId);
      },
    }),
    {
      name: 'group-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default groupStore;