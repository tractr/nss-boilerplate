'use client';

import { Tables } from '@/types/database';
import supabaseClient from '@/lib/supabase-client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';

type Menu = Tables<'Menu'>;

interface MenuViewerProps {
  menu: Menu;
}

export function MenuViewer({ menu }: MenuViewerProps) {
  const t = useTranslations();
  const currentUser = useCurrentUser();

  const handleDownload = async () => {
    if (!menu.image_url || !currentUser?.data?.id) return;
    const path = `${currentUser?.data?.id}/${menu.image_url}`;

    const { data } = await supabaseClient.storage.from('menu-images').download(path);

    if (!data) return;

    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = menu.image_url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!menu.image_url) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <p className="text-muted-foreground">{t('menus.noImage')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleDownload} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        {t('menus.download')}
      </Button>
    </div>
  );
}
