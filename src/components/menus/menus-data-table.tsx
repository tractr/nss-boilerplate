'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tables } from '@/types/database';
import supabaseClient from '@/lib/supabase-client';
import { Button } from '../ui/button';
import { DeleteMenuDialog } from './delete-menu-dialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Menu = Tables<'Menu'>;

export function MenusDataTable() {
  const [deletingMenu, setDeletingMenu] = useState<Menu | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations();

  const { data: menus = [] } = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('Menu')
        .select('*')
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('menus.label')}</TableHead>
            <TableHead>{t('menus.version')}</TableHead>
            <TableHead>{t('menus.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map(menu => (
            <TableRow key={menu.id}>
              <TableCell>{menu.label}</TableCell>
              <TableCell>{menu.version}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/menus/${menu.id}`}>{t('actions.edit')}</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeletingMenu(menu)}>
                    {t('actions.delete')}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteMenuDialog
        menu={deletingMenu}
        open={!!deletingMenu}
        onOpenChange={open => !open && setDeletingMenu(null)}
        onDelete={() => {
          queryClient.invalidateQueries({ queryKey: ['menus'] });
          setDeletingMenu(null);
        }}
      />
    </>
  );
}
