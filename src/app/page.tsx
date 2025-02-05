'use client';

import LayoutNav from '@/components/layout-nav';
import { MenusDataTable } from '@/components/menus/menus-data-table';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations();

  return (
    <LayoutNav>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t('menus.title')}</h1>
          <Button asChild>
            <Link href="/menu/new">
              <Plus className="w-4 h-4 mr-2" />
              {t('menus.createMenu')}
            </Link>
          </Button>
        </div>
        <MenusDataTable />
      </div>
    </LayoutNav>
  );
}
