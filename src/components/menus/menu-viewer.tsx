'use client';

import { Tables } from '@/types/database';
import supabaseClient from '@/lib/supabase-client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';

type Menu = Tables<'menus'>;

interface MenuViewerProps {
  menu: Menu;
}

export function MenuViewer({ menu }: MenuViewerProps) {
  const t = useTranslations();
  const currentUser = useCurrentUser();

  const handleDownload = async () => {
    if (!menu.file_path || !menu.file_bucket || !currentUser?.data?.id) return;
    const { data } = await supabaseClient.storage.from(menu.file_bucket).download(menu.file_path);

    if (!data) return;

    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = menu.label;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleDownload} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        {t('menus.download')}
      </Button>
    </div>
  );
}
