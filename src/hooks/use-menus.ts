import { useQuery } from '@tanstack/react-query';
import supabaseClient from '@/lib/supabase-client';
import { type Database } from '@/types/database';
import { useActiveMenuStore } from '@/stores/use-active-menu-store';
import { useEffect } from 'react';

type Menu = Database['public']['Tables']['menus']['Row'];

export function useMenus() {
  const { data: menus, isLoading } = useQuery<Menu[]>({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('menus')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { activeMenuId, setActiveMenuId } = useActiveMenuStore();

  // Set first menu as active if none selected
  useEffect(() => {
    if (!activeMenuId && menus?.length && !isLoading) {
      setActiveMenuId(menus[0].id);
    }
  }, [activeMenuId, menus, isLoading, setActiveMenuId]);

  return {
    menus,
    isLoading,
    activeMenuId,
    setActiveMenuId,
    activeMenu: menus?.find(menu => menu.id === activeMenuId),
  };
}
