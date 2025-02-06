'use client';

import { Tables } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import supabaseClient from '@/lib/supabase-client';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type Menu = Tables<'menus'>;

interface MenusGridViewProps {
  menus: Menu[];
}

export function MenusGridView({ menus }: MenusGridViewProps) {
  const t = useTranslations();
  const [menuImages, setMenuImages] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const getMenuImageUrl = useCallback(async (menu: Menu) => {
    if (!menu.file_bucket || !menu.file_path) return null;
    
    try {
      const { data, error } = await supabaseClient.storage
        .from(menu.file_bucket)
        .createSignedUrl(menu.file_path, 3600);

      if (error) {
        console.error('Error getting signed URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls: Record<string, string> = {};
      const loadingStates: Record<string, boolean> = {};
      
      for (const menu of menus) {
        loadingStates[menu.id] = true;
        const url = await getMenuImageUrl(menu);
        if (url) {
          imageUrls[menu.id] = url;
        }
        loadingStates[menu.id] = false;
      }
      
      setMenuImages(imageUrls);
      setLoadingImages(loadingStates);
    };

    loadImages();
  }, [menus, getMenuImageUrl]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {menus.map(menu => {
        const imageUrl = menuImages[menu.id];
        const isLoading = loadingImages[menu.id];
        
        return (
          <Link 
            key={menu.id} 
            href={`/menus/${menu.id}`}
            className={cn(
              "no-underline focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-muted">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : imageUrl ? (
                  <>
                    <Image
                      src={imageUrl}
                      alt={menu.label}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    {t('menus.noImage')}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium line-clamp-1">{menu.label}</h3>
                    <span 
                      className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                      style={{ backgroundColor: '#849F78', color: 'white' }}
                    >
                      v{menu.version}
                    </span>
                  </div>
                  <div className="pt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <span>{t('menus.owner')}:</span>
                      <span className="text-foreground max-w-[150px] truncate">{menu.owner}</span>
                    </p>
                    <p>
                      {t('menus.createdAt')}: <span className="text-foreground">{format(new Date(menu.created_at), 'PPP', { locale: fr })}</span>
                    </p>
                    {menu.updated_date && (
                      <p>
                        {t('menus.updatedAt')}: <span className="text-foreground">{format(new Date(menu.updated_date), 'PPP', { locale: fr })}</span>
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
