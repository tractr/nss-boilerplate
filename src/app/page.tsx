'use client';

import LayoutNav from '@/components/layout-nav';
import { MenusView } from '@/components/menus/menus-view';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { List, LayoutGrid } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = 'newest' | 'oldest' | 'name' | 'version';

export default function HomePage() {
  const t = useTranslations();
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  return (
    <LayoutNav>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t('menus.title')}</h1>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('menus.filters.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('menus.filters.sortOptions.newest')}</SelectItem>
                <SelectItem value="oldest">{t('menus.filters.sortOptions.oldest')}</SelectItem>
                <SelectItem value="name">{t('menus.filters.sortOptions.name')}</SelectItem>
                <SelectItem value="version">{t('menus.filters.sortOptions.version')}</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex h-9 border rounded-md">
              <Toggle
                pressed={isGridView}
                onPressedChange={pressed => setIsGridView(pressed)}
                aria-label={t('menus.gridView')}
                className="h-full data-[state=on]:bg-accent rounded-none rounded-l-md"
              >
                <LayoutGrid className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={!isGridView}
                onPressedChange={pressed => setIsGridView(!pressed)}
                aria-label={t('menus.listView')}
                className="h-full data-[state=on]:bg-accent rounded-none rounded-r-md"
              >
                <List className="h-4 w-4" />
              </Toggle>
            </div>
          </div>
        </div>
        <MenusView isGridView={isGridView} sortBy={sortBy} />
      </div>
    </LayoutNav>
  );
}
