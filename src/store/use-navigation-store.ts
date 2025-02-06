import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type NavigationStore = {
  isSidebarMode: boolean
  toggleNavigationMode: () => void
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      isSidebarMode: false,
      toggleNavigationMode: () => set((state) => ({ isSidebarMode: !state.isSidebarMode })),
    }),
    {
      name: 'navigation-storage',
    }
  )
)
