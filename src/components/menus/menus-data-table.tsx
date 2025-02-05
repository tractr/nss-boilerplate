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
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Menu = Tables<'menus'>;

interface MenusDataTableProps {
  menus: Menu[];
}

export function MenusDataTable({ menus }: MenusDataTableProps) {
  const t = useTranslations();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('menus.label')}</TableHead>
          <TableHead>{t('menus.version')}</TableHead>
          <TableHead>{t('menus.createdAt')}</TableHead>
          <TableHead>{t('menus.updatedAt')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menus.map(menu => (
          <TableRow key={menu.id}>
            <TableCell>
              <Link 
                href={`/menus/${menu.id}`}
                className={cn(
                  "block w-full py-2 hover:text-primary transition-colors",
                  "cursor-pointer"
                )}
              >
                {menu.label}
              </Link>
            </TableCell>
            <TableCell>v{menu.version}</TableCell>
            <TableCell>
              {format(new Date(menu.created_at), 'PPP', { locale: fr })}
            </TableCell>
            <TableCell>
              {menu.updated_date 
                ? format(new Date(menu.updated_date), 'PPP', { locale: fr })
                : '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
