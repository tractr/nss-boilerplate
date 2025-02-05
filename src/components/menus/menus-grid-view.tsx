'use client';

import { Tables } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import supabaseClient from '@/lib/supabase-client';
import { useCallback, useEffect, useState } from 'react';

type Menu = Tables<'menus'>;

interface MenusGridViewProps {
  menus: Menu[];
}

export function MenusGridView({ menus }: MenusGridViewProps) {
  const t = useTranslations();
  const [menuImages, setMenuImages] = useState<Record<string, string>>({});

  const getMenuImageUrl = useCallback(async (menu: Menu) => {
    if (!menu.file_bucket || !menu.file_path) return null;
    
    try {
      const { data, error } = await supabaseClient.storage
        .from(menu.file_bucket)
        .createSignedUrl(menu.file_path, 3600); // URL valide pendant 1 heure

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
      
      for (const menu of menus) {
        const url = await getMenuImageUrl(menu);
        if (url) {
          imageUrls[menu.id] = url;
        }
      }
      
      setMenuImages(imageUrls);
    };

    loadImages();
  }, [menus, getMenuImageUrl]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map(menu => {
        const imageUrl = menuImages[menu.id];
        
        return (
          <Link 
            key={menu.id} 
            href={`/menus/${menu.id}`}
            className={cn(
              "transition-transform hover:scale-[1.02]",
              "no-underline focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <Card className="h-full hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="line-clamp-2 flex items-center justify-between">
                  <span>{menu.label}</span>
                  <span className="text-sm font-normal text-muted-foreground">v{menu.version}</span>
                </CardTitle>
              </CardHeader>
              {imageUrl && (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={imageUrl}
                    alt={menu.label}
                    fill
                    className="object-cover rounded-md"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}
              <CardContent className={cn(imageUrl ? "pt-4" : "")}>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p>
                    {t('menus.createdAt')}: {format(new Date(menu.created_at), 'PPP', { locale: fr })}
                  </p>
                  {menu.updated_date && (
                    <p>
                      {t('menus.updatedAt')}: {format(new Date(menu.updated_date), 'PPP', { locale: fr })}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
