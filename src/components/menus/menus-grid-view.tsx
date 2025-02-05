'use client';

import { Tables } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type Menu = Tables<'menus'>;

interface MenusGridViewProps {
  menus: Menu[];
}

export function MenusGridView({ menus }: MenusGridViewProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map(menu => (
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
              <CardTitle className="line-clamp-2">{menu.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('menus.createdAt', {
                  date: format(new Date(menu.created_at), 'PPP', { locale: fr }),
                })}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
