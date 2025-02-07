'use client';

import LayoutNav from '@/components/layout-nav';
import { MenuSteps } from '@/components/menus/menu-steps';
import { DeleteMenuDialog } from '@/components/menus/delete-menu-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Download,
  Pencil,
  Trash2,
  ArrowLeft,
  FileText,
  Settings2,
  Utensils,
  Apple,
  BarChart3,
  ChevronDown,
  History,
} from 'lucide-react';
import { useMenus } from '@/hooks/use-menus';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { downloadMenuImage } from '@/lib/download-menu';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useMenuSteps } from '@/hooks/use-menu-steps';
import Image from 'next/image';
import supabaseClient from '@/lib/supabase-client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ImageModal } from '@/components/menus/image-modal';
import { MenuRecipeOutput } from '@/interfaces/steps/menu_recipe.interface';
import { MenuEnvironmentalImpactOutput } from '@/interfaces/steps/menu_environmental_impact.interfaces';

export default function MenuPage() {
  const params = useParams();
  const menuId = typeof params.id === 'string' ? params.id : undefined;
  const { menus, activeMenuId, setActiveMenuId, isLoading: menuLoading } = useMenus();
  const activeMenu = menus?.find(menu => menu.id === menuId);
  const { data: steps } = useMenuSteps(menuId);
  const t = useTranslations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuImageUrl, setMenuImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const router = useRouter();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
        <div className="container max-w-7xl mx-auto py-4">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-9 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          <Card className="shadow-lg border-0 p-12">
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-[400px] rounded-lg" />
              <div className="flex flex-col gap-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="mt-8">
              <div className="flex justify-center mb-6 relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border" />
                <div className="bg-gray-100 p-1 shadow-inner relative z-10 rounded-lg flex gap-2">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-8 w-32 rounded" />
                  ))}
                </div>
              </div>

              {/* Steps Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-white">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-1/4 mb-2" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </LayoutNav>
    );
  }

  // Calculer les statistiques d'analyse
  const completedSteps = steps?.filter(step => step.status === 'fully_finished')?.length ?? 0;
  const totalSteps = 4;
  const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const calculateDuration = () => {
    const totalDuration = (steps || []).reduce((acc, step, index) => {
      console.log(`step ${index}`, step.created_at, step.finished_at);
      if (step.created_at && step.finished_at) {
        console.log(
          `step ${index} delta `,
          new Date(step.finished_at).getTime() - new Date(step.created_at).getTime()
        );
        return acc + (new Date(step.finished_at).getTime() - new Date(step.created_at).getTime());
      }
      return acc;
    }, 0);
    const minutes = Math.floor(totalDuration / (1000 * 60));
    return minutes;
  };

  return (
    <LayoutNav containerClassName="bg-muted/50">
      <div className="container max-w-7xl mx-auto py-4">
        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('menus.actions.back')}
          </Button>

          <div className="flex items-center gap-2">
            {/* Version */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-32">
                  <History className="mr-1 h-4 w-4" />
                  {t('menus.version.title', { number: activeMenu.version })}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <History className="mr-1 h-4 w-4" />
                  {t('menus.version.title', { number: activeMenu.version })}
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
                <DropdownMenuItem onClick={() => router.push(`/menus/${activeMenu.id}/edit`)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>{t('menus.actions.edit')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDownload}
                  disabled={!activeMenu.file_bucket || !activeMenu.file_path}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>{t('menus.actions.download')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>{t('menus.actions.delete')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Hero Section - Image and Info */}
        <Card className="shadow-lg border-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mobile title only */}
            <div className="md:hidden mb-4">
              <h1 className="text-3xl font-bold">{activeMenu.label}</h1>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-l-lg h-full">
              {loadingImage ? (
                <Skeleton className="h-full w-full" />
              ) : menuImageUrl ? (
                <>
                  <button
                    onClick={() => setIsImageModalOpen(true)}
                    className="relative w-full h-full min-h-[400px]"
                  >
                    <Image
                      src={menuImageUrl}
                      alt={activeMenu.label}
                      className="object-cover object-top rounded-lg"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </button>
                  <ImageModal
                    isOpen={isImageModalOpen}
                    onOpenChange={setIsImageModalOpen}
                    imageUrl={menuImageUrl}
                    alt={t('menus.image.expanded', { label: activeMenu.label })}
                  />
                </>
              ) : (
                <div className="flex flex-col h-full min-h-[400px] items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                  <span className="mt-2 text-muted-foreground">{t('menus.image.noImage')}</span>
                </div>
              )}
            </div>

            {/* Menu Info */}
            <div className="py-6">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight mb-5 hidden md:block">
                  {activeMenu.label}
                </h1>

                <div className="space-y-4">
                  {/* Basic Information */}
                  <h2 className="text-lg font-semibold">{t('menus.details.basicInfo')}</h2>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">
                      {t('menus.stats.version')}
                    </span>
                    <span className="text-muted-foreground">{activeMenu.version}</span>

                    <span className="font-semibold text-foreground">
                      {t('menus.stats.createdAt')}
                    </span>
                    <span className="text-muted-foreground">
                      {format(new Date(activeMenu.created_at), 'PPP', { locale: fr })}
                    </span>

                    {activeMenu.updated_date && (
                      <>
                        <span className="font-semibold text-foreground">
                          {t('menus.stats.updatedAt')}
                        </span>
                        <span className="text-muted-foreground">
                          {format(new Date(activeMenu.updated_date), 'PPP', { locale: fr })}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col my-2">
                    <div className="h-px bg-gray-200" />
                    <div className="h-px bg-gray-50" />
                  </div>

                  {/* System Information */}
                  <h2 className="text-lg font-semibold">{t('menus.details.systemInfo')}</h2>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">
                      {t('menus.stats.progress')}
                    </span>
                    <span className="text-muted-foreground">
                      {t('menus.details.status.progress', { progress })}
                    </span>

                    <span className="font-semibold text-foreground">
                      {t('menus.stats.duration')}
                    </span>
                    <span className="text-muted-foreground">
                      {t('menus.details.status.duration', { minutes: calculateDuration() })}
                    </span>
                  </div>

                  <div className="flex flex-col my-2">
                    <div className="h-px bg-gray-200" />
                    <div className="h-px bg-gray-50" />
                  </div>

                  {/* Results */}
                  <h2 className="text-lg font-semibold">{t('menus.details.results')}</h2>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">{t('menus.stats.dishes')}</span>
                    <span className="text-muted-foreground">
                      {steps
                        ?.filter(
                          step =>
                            step.step === 'menu_recipe' &&
                            (step.output as unknown as MenuRecipeOutput)?.dishes?.length
                        )
                        .reduce(
                          (acc, step) =>
                            acc +
                            ((step.output as unknown as MenuRecipeOutput)?.dishes?.length || 0),
                          0
                        ) || 0}
                    </span>

                    <span className="font-semibold text-foreground">
                      {t('menus.stats.ingredients')}
                    </span>
                    <span className="text-muted-foreground">
                      {steps
                        ?.filter(
                          step =>
                            step.step === 'menu_recipe' &&
                            (step.output as unknown as MenuRecipeOutput)?.dishes?.some(
                              dish => dish.ingredients?.length
                            )
                        )
                        .reduce(
                          (acc, step) =>
                            acc +
                              (step.output as unknown as MenuRecipeOutput)?.dishes?.reduce(
                                (recipeAcc, recipe) =>
                                  recipeAcc + (recipe.ingredients?.length || 0),
                                0
                              ) || 0,
                          0
                        ) || 0}
                    </span>

                    <span className="font-semibold text-foreground">
                      {t('menus.stats.environmentalScore')}
                    </span>
                    <span className="text-muted-foreground">
                      {(() => {
                        const impactSteps = steps?.filter(
                          step =>
                            step.step === 'menu_environmental_impact' &&
                            (step.output as unknown as MenuEnvironmentalImpactOutput)
                              ?.environmental_score
                        );
                        const avgScore = impactSteps?.length
                          ? impactSteps.reduce(
                              (acc, step) =>
                                acc +
                                ((step.output as unknown as MenuEnvironmentalImpactOutput)
                                  ?.environmental_score || 0),
                              0
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
          <div className="mt-8 md:mt-12">
            <div>
              <Tabs defaultValue="analysis" className="w-full">
                <div className="flex justify-center mb-6 relative">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border" />
                  <TabsList className="bg-gray-100 p-1 shadow-inner relative z-10">
                    <TabsTrigger
                      value="analysis"
                      className="flex items-center gap-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground data-[state=active]:shadow text-sm px-5 py-1"
                    >
                      <BarChart3 className="h-4 w-4" />
                      {t('menus.tabs.analysis')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="recipes"
                      className="flex items-center gap-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground data-[state=active]:shadow text-sm px-5 py-1"
                    >
                      <Utensils className="h-4 w-4" />
                      {t('menus.tabs.recipes')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="ingredients"
                      className="flex items-center gap-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground data-[state=active]:shadow text-sm px-5 py-1"
                    >
                      <Apple className="h-4 w-4" />
                      {t('menus.tabs.ingredients')}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="analysis">
                  <MenuSteps menuId={menuId as string} />
                </TabsContent>
                <TabsContent value="recipes">
                  <div className="text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
                    <p>{t('menus.stats.comingSoon.recipes')}</p>
                  </div>
                </TabsContent>
                <TabsContent value="ingredients">
                  <div className="text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
                    <p>{t('menus.stats.comingSoon.ingredients')}</p>
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
