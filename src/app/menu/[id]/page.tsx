'use client';

import LayoutNav from '@/components/layout-nav';
import { MenuSteps } from '@/components/menus/menu-steps';
import { Skeleton } from '@/components/ui/skeleton';
import { useMenus } from '@/hooks/use-menus';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function MenuPage() {
  const params = useParams();
  const menuId = typeof params.id === 'string' ? params.id : undefined;
  const { menus, activeMenuId, setActiveMenuId, isLoading: menuLoading } = useMenus();
  const activeMenu = menus?.find(menu => menu.id === menuId);

  // Synchronize URL menu ID with active menu
  useEffect(() => {
    if (menuId && menuId !== activeMenuId) {
      setActiveMenuId(menuId);
    }
  }, [menuId, activeMenuId, setActiveMenuId]);

  if (menuLoading || !activeMenu) {
    return (
      <LayoutNav>
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </LayoutNav>
    );
  }

  return (
    <LayoutNav>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
              {activeMenu.label}
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
    </LayoutNav>
  );
}
