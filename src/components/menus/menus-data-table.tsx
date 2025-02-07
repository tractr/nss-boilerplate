'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tables } from '@/types/database';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import supabaseClient from '@/lib/supabase-client';
import { useCallback, useEffect, useState } from 'react';

type Menu = Tables<'menus'>;

interface MenusDataTableProps {
  menus: Menu[];
}

export function MenusDataTable({ menus }: MenusDataTableProps) {
  const t = useTranslations();
  const router = useRouter();
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('menus.table.columns.image')}</TableHead>
          <TableHead>{t('menus.table.columns.name')}</TableHead>
          <TableHead>{t('menus.table.columns.version')}</TableHead>
          <TableHead>{t('menus.table.columns.owner')}</TableHead>
          <TableHead>{t('menus.table.columns.createdAt')}</TableHead>
          <TableHead>{t('menus.table.columns.updatedAt')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menus.map(menu => {
          const imageUrl = menuImages[menu.id];
          const isLoading = loadingImages[menu.id];

          return (
            <TableRow
              key={menu.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => router.push(`/menus/${menu.id}`)}
            >
              <TableCell>
                <div className="block w-16 relative aspect-square">
                  {isLoading ? (
                    <Skeleton className="h-full w-full rounded-md" />
                  ) : imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt={menu.label}
                        fill
                        className="object-cover object-top rounded-md"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-md" />
                    </>
                  ) : (
                    <div className="h-full w-full bg-muted rounded-md" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span>{menu.label}</span>
              </TableCell>
              <TableCell>
                <span
                  className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: '#849F78', color: 'white' }}
                >
                  {t('menus.table.version', { number: menu.version })}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{menu.owner}</span>
              </TableCell>
              <TableCell>{format(new Date(menu.created_at), 'PPP', { locale: fr })}</TableCell>
              <TableCell>
                {menu.updated_date
                  ? format(new Date(menu.updated_date), 'PPP', { locale: fr })
                  : t('menus.table.noUpdate')}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
