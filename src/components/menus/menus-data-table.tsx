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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
