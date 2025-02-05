'use client';

import LayoutNav from '@/components/layout-nav';
import { MenuSteps } from '@/components/menus/menu-steps';
import { DeleteMenuDialog } from '@/components/menus/delete-menu-dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Pencil, Trash2 } from 'lucide-react';
import { useMenus } from '@/hooks/use-menus';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { downloadMenuImage } from '@/lib/download-menu';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const params = useParams();
  const menuId = typeof params.id === 'string' ? params.id : undefined;
  const { menus, activeMenuId, setActiveMenuId, isLoading: menuLoading } = useMenus();
  const activeMenu = menus?.find(menu => menu.id === menuId);
  const t = useTranslations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Synchronize URL menu ID with active menu
  useEffect(() => {
    if (menuId && menuId !== activeMenuId) {
      setActiveMenuId(menuId);
    }
  }, [menuId, activeMenuId, setActiveMenuId]);

  const handleDownload = async () => {
    if (activeMenu?.file_bucket && activeMenu?.file_path) {
      await downloadMenuImage(activeMenu);
    }
  };

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
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
                {activeMenu.label}
              </h1>
              <p className="text-muted-foreground">
                {t('menus.createdAt', {
                  date: format(new Date(activeMenu.created_at), 'PPP', { locale: fr }),
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!activeMenu.file_bucket || !activeMenu.file_path}
              >
                <Download className="w-4 h-4 mr-2" />
                {t('menus.download')}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/menus/${activeMenu.id}/edit`}>
                  <Pencil className="w-4 h-4 mr-2" />
                  {t('actions.edit')}
                </Link>
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('actions.delete')}
              </Button>
            </div>
          </div>

          <div>
            <MenuSteps menuId={activeMenu.id} />
          </div>
        </div>
      </div>
      <DeleteMenuDialog 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)} 
        menuId={activeMenu.id} 
      />
    </LayoutNav>
  );
}
