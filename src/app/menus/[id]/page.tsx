'use client';

import LayoutNav from '@/components/layout-nav';
import { MenuSteps } from '@/components/menus/menu-steps';
import { DeleteMenuDialog } from '@/components/menus/delete-menu-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Download, 
  Pencil, 
  Trash2, 
  ArrowLeft, 
  Calendar, 
  FileText, 
  User, 
  Tag, 
  Settings2,
  Timer,
  Utensils,
  Leaf,
  Clock,
  Chart,
  Flame,
  Droplet,
  ChefHat,
  Apple,
  BarChart3,
  ChevronDown,
  History
} from 'lucide-react';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
      <LayoutNav containerClassName="bg-muted/50">
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
    <LayoutNav containerClassName="bg-muted/50">
      <div className="container max-w-7xl py-4">
        {/* Navigation et Actions */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>

          <div className="flex items-center gap-2">
            {/* Version */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 w-32"
                >
                  <History className="mr-1 h-4 w-4" />
                  Version {activeMenu.version}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <History className="mr-1 h-4 w-4" />
                  Version {activeMenu.version}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/menus/${activeMenu.id}/edit`)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Éditer</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDownload}
                  disabled={!activeMenu.file_bucket || !activeMenu.file_path}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Télécharger</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Hero Section - Image et Infos */}
        <Card className="shadow-lg border-0">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-l-lg">
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
                    <div className="absolute inset-0 bg-black/20 rounded-tl-lg" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Menu Info */}
            <div className="px-10 py-10">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight mb-5">
                  {activeMenu.label}
                </h1>

                <div className="space-y-4">
                  {/* Informations de base */}
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">Version</span>
                    <span className="text-muted-foreground">{activeMenu.version}</span>

                    <span className="font-semibold text-foreground">Propriétaire</span>
                    <span className="text-muted-foreground">{activeMenu.owner}</span>

                    <span className="font-semibold text-foreground">Créé le</span>
                    <span className="text-muted-foreground">
                      {format(new Date(activeMenu.created_at), 'PPP', { locale: fr })}
                    </span>

                    {activeMenu.updated_date && (
                      <>
                        <span className="font-semibold text-foreground">Modifié le</span>
                        <span className="text-muted-foreground">
                          {format(new Date(activeMenu.updated_date), 'PPP', { locale: fr })}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="h-px bg-border my-2" />

                  {/* Système */}
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">Progression</span>
                    <span className="text-muted-foreground">{progress}%</span>

                    <span className="font-semibold text-foreground">Durée</span>
                    <span className="text-muted-foreground">
                      {(() => {
                        const completedSteps = steps?.filter(step => step.status === 'completed') || [];
                        const totalDuration = completedSteps.reduce((acc, step) => {
                          if (step.started_at && step.completed_at) {
                            return acc + (new Date(step.completed_at).getTime() - new Date(step.started_at).getTime());
                          }
                          return acc;
                        }, 0);
                        const minutes = Math.floor(totalDuration / (1000 * 60));
                        return `${minutes} min`;
                      })()}
                    </span>
                  </div>

                  <div className="h-px bg-border my-2" />

                  {/* Résultats */}
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">Plats</span>
                    <span className="text-muted-foreground">
                      {steps?.filter(step => step.step === 'menu_recipe' && step.output?.dishes?.length)
                        .reduce((acc, step) => acc + (step.output?.dishes?.length || 0), 0) || 0}
                    </span>

                    <span className="font-semibold text-foreground">Recettes</span>
                    <span className="text-muted-foreground">
                      {steps?.filter(step => 
                        step.step === 'menu_recipe' && 
                        step.output?.recipes?.length
                      ).reduce((acc, step) => acc + (step.output?.recipes?.length || 0), 0) || 0}
                    </span>

                    <span className="font-semibold text-foreground">Ingrédients</span>
                    <span className="text-muted-foreground">
                      {steps?.filter(step => 
                        step.step === 'menu_recipe' && 
                        step.output?.recipes?.some(recipe => recipe.ingredients?.length)
                      ).reduce((acc, step) => 
                        acc + (
                          step.output?.recipes?.reduce((recipeAcc, recipe) => 
                            recipeAcc + (recipe.ingredients?.length || 0), 0
                          ) || 0
                        ), 0) || 0}
                    </span>

                    <span className="font-semibold text-foreground">Score env.</span>
                    <span className="text-muted-foreground">
                      {(() => {
                        const impactSteps = steps?.filter(step => 
                          step.step === 'menu_environmental_impact' && 
                          step.output?.environmental_score
                        );
                        const avgScore = impactSteps?.length 
                          ? impactSteps.reduce((acc, step) => 
                              acc + (step.output?.environmental_score || 0), 0
                            ) / impactSteps.length
                          : 0;
                        return avgScore ? avgScore.toFixed(1) : '-';
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            <div className="p-6 pt-10">
              <Tabs defaultValue="analysis" className="w-full">
                <div className="flex justify-center mb-6">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger 
                      value="analysis" 
                      className="flex items-center gap-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground"
                    >
                      <BarChart3 className="h-4 w-4" />
                      {t('menus.tabs.analysis')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="recipes" 
                      className="flex items-center gap-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground"
                    >
                      <Utensils className="h-4 w-4" />
                      {t('menus.tabs.recipes')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ingredients" 
                      className="flex items-center gap-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground"
                    >
                      <Apple className="h-4 w-4" />
                      {t('menus.tabs.ingredients')}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="analysis">
                  <MenuSteps steps={steps} />
                </TabsContent>
                <TabsContent value="recipes">
                  <div className="text-center text-muted-foreground">
                    <p>Liste des recettes à venir</p>
                  </div>
                </TabsContent>
                <TabsContent value="ingredients">
                  <div className="text-center text-muted-foreground">
                    <p>Liste des ingrédients à venir</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>

        <DeleteMenuDialog 
          menu={activeMenu}
          open={isDeleteDialogOpen} 
          onOpenChange={setIsDeleteDialogOpen} 
          onDelete={() => {
            router.push('/menus');
          }}
        />
      </div>
    </LayoutNav>
  );
}
