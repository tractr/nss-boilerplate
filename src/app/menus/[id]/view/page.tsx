'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import supabaseClient from '@/lib/supabase-client';
import { Tables } from '@/types/database';
import { MenuViewer } from '@/components/menus/menu-viewer';
import LayoutSidebar from '@/components/layout-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Menu = Tables<'menus'>;

export default function ViewMenuPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;

  const { data: menu } = useQuery<Menu>({
    queryKey: ['menus', id],
    queryFn: async () => {
      if (!id) throw new Error('Menu ID is required');

      const { data, error } = await supabaseClient.from('menus').select('*').eq('id', id).single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <LayoutSidebar>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>{menu?.label}</CardTitle>
          </CardHeader>
          <CardContent>{menu && <MenuViewer menu={menu} />}</CardContent>
        </Card>
      </div>
    </LayoutSidebar>
  );
}
