'use client';

import { Tables } from '@/types/database';
import { MenusDataTable } from './menus-data-table';
import { MenusGridView } from './menus-grid-view';
import { useTranslations } from 'next-intl';
import supabaseClient from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';

type Menu = Tables<'menus'>;

interface MenusViewProps {
  className?: string;
  isGridView: boolean;
}

export function MenusView({ className, isGridView }: MenusViewProps) {
  const t = useTranslations();

  const { data: menus = [] } = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('menus')
        .select('*')
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  return (
    <div className={className}>
      {isGridView ? (
        <MenusGridView menus={menus} />
      ) : (
        <div className="border rounded-lg">
          <MenusDataTable menus={menus} />
        </div>
      )}
    </div>
  );
}
