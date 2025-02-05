'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useTranslations } from 'next-intl';

export function MenusViewToggle() {
  const [isGridView, setIsGridView] = useState(true);
  const t = useTranslations();
  
  return (
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
  );
}
