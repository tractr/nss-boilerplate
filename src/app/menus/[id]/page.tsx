'use client';

import LayoutNav from '@/components/layout-nav';
import { MenuSteps } from '@/components/menus/menu-steps';
import { DeleteMenuDialog } from '@/components/menus/delete-menu-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Pencil, Trash2, ArrowLeft, Calendar, FileText, User, Tag, Settings2 } from 'lucide-react';
import { useMenus } from '@/hooks/use-menus';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { downloadMenuImage } from '@/lib/download-menu';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { useMenuSteps } from '@/hooks/use-menu-steps';
import Image from 'next/image';
import supabaseClient from '@/lib/supabase-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MenuPage() {
  const params = useParams();
  const menuId = typeof params.id === 'string' ? params.id : undefined;
  const { menus, activeMenuId, setActiveMenuId, isLoading: menuLoading } = useMenus();
  const activeMenu = menus?.find(menu => menu.id === menuId);
  const { steps } = useMenuSteps(menuId);
  const t = useTranslations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuImageUrl, setMenuImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const getMenuImageUrl = useCallback(async () => {
    if (!activeMenu?.file_bucket || !activeMenu?.file_path) return null;
    
    try {
      const { data, error } = await supabaseClient.storage
        .from(activeMenu.file_bucket)
        .createSignedUrl(activeMenu.file_path, 3600);

      if (error) {
        console.error('Error getting signed URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      return null;
    }
  }, [activeMenu]);

  useEffect(() => {
    if (menuId && menuId !== activeMenuId) {
      setActiveMenuId(menuId);
    }
  }, [menuId, activeMenuId, setActiveMenuId]);

  useEffect(() => {
    const loadImage = async () => {
      setLoadingImage(true);
      const url = await getMenuImageUrl();
      setMenuImageUrl(url);
      setLoadingImage(false);
    };

    if (activeMenu) {
      loadImage();
    }
  }, [activeMenu, getMenuImageUrl]);

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
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </LayoutNav>
    );
  }

  // Calculer les statistiques d'analyse
  const completedSteps = steps?.filter(step => step.status === 'completed')?.length ?? 0;
  const totalSteps = steps?.length ?? 0;
  const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <LayoutNav>
      <div className="container max-w-7xl py-4">
        {/* Navigation et Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/menus">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('actions.back')}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Settings2 className="h-5 w-5" />
                <span className="sr-only">Menu des actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={handleDownload}
                disabled={!activeMenu.file_bucket || !activeMenu.file_path}
                className="cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('menus.download')}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/menus/${activeMenu.id}/edit`}>
                  <Pencil className="w-4 h-4 mr-2" />
                  {t('actions.edit')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('actions.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Hero Section - Image et Infos */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Menu Image */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] w-full bg-muted">
                {loadingImage ? (
                  <Skeleton className="h-full w-full" />
                ) : menuImageUrl ? (
                  <>
                    <Image
                      src={menuImageUrl}
                      alt={activeMenu.label}
                      className="object-cover object-top"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Menu Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-6">
                {activeMenu.label}
              </h1>
              
              {/* Caractéristiques principales */}
              <div className="grid gap-4">
                <div className="space-y-3">
                  {/* Version */}
                  <div className="flex items-center gap-3">
                    <div className="w-5">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="w-24 text-sm text-muted-foreground">Version</span>
                    <span 
                      className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                      style={{ backgroundColor: '#849F78', color: 'white' }}
                    >
                      v{activeMenu.version}
                    </span>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center gap-3">
                    <div className="w-5">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="w-24 text-sm text-muted-foreground">Propriétaire</span>
                    <span>{activeMenu.owner}</span>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-5">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="w-24 text-sm text-muted-foreground">Créé le</span>
                    <span>{format(new Date(activeMenu.created_at), 'PPP', { locale: fr })}</span>
                  </div>

                  {/* Updated Date */}
                  {activeMenu.updated_date && (
                    <div className="flex items-center gap-3">
                      <div className="w-5">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="w-24 text-sm text-muted-foreground">Mis à jour le</span>
                      <span>{format(new Date(activeMenu.updated_date), 'PPP', { locale: fr })}</span>
                    </div>
                  )}
                </div>
                
                {/* Statistiques d'analyse */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{progress}%</div>
                      <p className="text-sm text-muted-foreground">Analyse complétée</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{completedSteps}/{totalSteps}</div>
                      <p className="text-sm text-muted-foreground">Étapes terminées</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Analyse - Pleine largeur */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Analyse du menu</CardTitle>
          </CardHeader>
          <CardContent>
            <MenuSteps menuId={activeMenu.id} />
          </CardContent>
        </Card>
      </div>

      <DeleteMenuDialog 
        menu={activeMenu}
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={() => {
          router.push('/menus');
        }}
      />
    </LayoutNav>
  );
}
