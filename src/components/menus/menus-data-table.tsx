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
import { useRouter } from 'next/navigation';
import { useActiveMenuStore } from '@/stores/use-active-menu-store';
import { LineChart, Download, Pencil, Trash2 } from 'lucide-react';
import { downloadMenuImage } from '@/lib/download-menu';

type Menu = Tables<'menus'>;

export function MenusDataTable() {
  const [deletingMenu, setDeletingMenu] = useState<Menu | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations();
  const router = useRouter();
  const setActiveMenuId = useActiveMenuStore(state => state.setActiveMenuId);

  const { data: menus = [] } = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('menus')
        .select('*')
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  const handleAnalyze = (menu: Menu) => {
    setActiveMenuId(menu.id);
    router.push('/');
  };

  const handleDownload = async (menu: Menu) => {
    if (menu.file_bucket && menu.file_path) {
      await downloadMenuImage(menu);
    }
  };

  return (
    <>
      <Table className="w-full table-fixed">
        <colgroup>
          <col className="w-[30%]" />
          <col className="w-[70%]" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>{t('menus.label')}</TableHead>
            <TableHead>{t('menus.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map(menu => (
            <TableRow key={menu.id}>
              <TableCell>{menu.label}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAnalyze(menu)}>
                    <LineChart className="w-4 h-4 mr-2" />
                    {t('menus.analyze')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(menu)}
                    disabled={!menu.file_bucket || !menu.file_path}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('menus.download')}
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/menus/${menu.id}`}>
                      <Pencil className="w-4 h-4 mr-2" />
                      {t('actions.edit')}
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeletingMenu(menu)}>
                    <Trash2 className="w-4 h-4 mr-2" />
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
