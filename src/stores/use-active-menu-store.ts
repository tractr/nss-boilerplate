import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActiveMenuState {
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
}

export const useActiveMenuStore = create<ActiveMenuState>()(
  persist(
    set => ({
      activeMenuId: null,
      setActiveMenuId: id => set({ activeMenuId: id }),
    }),
    {
      name: 'active-menu-storage',
    }
  )
);
