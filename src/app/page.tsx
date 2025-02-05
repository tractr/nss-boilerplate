'use client';

import LayoutNav from '@/components/layout-nav';
import { MenusView } from '@/components/menus/menus-view';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { List, LayoutGrid } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations();
  const [isGridView, setIsGridView] = useState(true);

  return (
    <LayoutNav>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t('menus.title')}</h1>
          <div className="flex gap-2 border rounded-lg p-1">
            <Toggle
              pressed={isGridView}
              onPressedChange={pressed => setIsGridView(pressed)}
              aria-label={t('menus.gridView')}
              size="sm"
            >
              <LayoutGrid className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={!isGridView}
              onPressedChange={pressed => setIsGridView(!pressed)}
              aria-label={t('menus.listView')}
              size="sm"
            >
              <List className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
        <MenusView isGridView={isGridView} />
      </div>
    </LayoutNav>
  );
}
