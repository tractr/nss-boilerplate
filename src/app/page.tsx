'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import LayoutSidebar from '@/components/layout-sidebar';
import { useMenus } from '@/hooks/use-menus';
import { MenuSteps } from '@/components/menus/menu-steps';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const { menus, activeMenuId, isLoading: menuLoading } = useMenus();
  const activeMenu = menus?.find(menu => menu.id === activeMenuId);

  React.useEffect(() => {
    if (!menuLoading && !activeMenu) {
      redirect('/menus');
    }
  }, [menuLoading, activeMenu]);

  if (menuLoading || !activeMenu) {
    return null;
  }

  return (
    <LayoutSidebar>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
              {menuLoading ? <Skeleton className="h-12 w-[300px]" /> : activeMenu.label}
            </h1>
            <p className="text-muted-foreground">
              Version {activeMenu.version} • Créé le{' '}
              {format(new Date(activeMenu.created_at), 'PPP', { locale: fr })}
            </p>
          </div>

          <div>
            <MenuSteps menuId={activeMenu.id} />
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}
