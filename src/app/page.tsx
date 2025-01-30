'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import LayoutSidebar from '@/components/layout-sidebar';
import { useTranslations } from 'next-intl';
import { useMenus } from '@/hooks/use-menus';
import { MenuSteps } from '@/components/menus/menu-steps';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function HomePage() {
  const { menus, activeMenuId, isLoading: menuLoading } = useMenus();
  const t = useTranslations('home');
  const activeMenu = menus?.find(menu => menu.id === activeMenuId);

  return (
    <LayoutSidebar>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
              {menuLoading ? (
                <Skeleton className="h-12 w-[300px]" />
              ) : activeMenu ? (
                activeMenu.label
              ) : (
                t('noActiveMenu')
              )}
            </h1>
            {activeMenu && (
              <p className="text-muted-foreground">
                Version {activeMenu.version} • Créé le{' '}
                {format(new Date(activeMenu.created_at), 'PPP', { locale: fr })}
              </p>
            )}
          </div>

          {activeMenu && (
            <div>
              <MenuSteps menuId={activeMenu.id} />
            </div>
          )}
        </div>
      </div>
    </LayoutSidebar>
  );
}
