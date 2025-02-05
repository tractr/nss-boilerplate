'use client';

import { Tables } from '@/types/database';
import { useState } from 'react';
import { MenusDataTable } from './menus-data-table';
import { MenusGridView } from './menus-grid-view';
import { LayoutGrid, List } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useTranslations } from 'next-intl';
import supabaseClient from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';

type Menu = Tables<'menus'>;

export function MenusView() {
  const [isGridView, setIsGridView] = useState(false);
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
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex gap-2 border rounded-lg p-1">
          <Toggle
            pressed={!isGridView}
            onPressedChange={pressed => setIsGridView(!pressed)}
            aria-label={t('menus.listView')}
            size="sm"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={isGridView}
            onPressedChange={pressed => setIsGridView(pressed)}
            aria-label={t('menus.gridView')}
            size="sm"
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
      
      {isGridView ? (
        <MenusGridView menus={menus} />
      ) : (
        <MenusDataTable menus={menus} />
      )}
    </div>
  );
}
