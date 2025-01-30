import { useQuery } from '@tanstack/react-query';
import supabaseClient from '@/lib/supabase-client';
import { Tables } from '@/types/database';

type MenuStep = Tables<'stream_ai_run_step'>;

export function useMenuSteps(menuId?: string) {
  return useQuery<MenuStep[]>({
    queryKey: ['menu-steps', menuId],
    queryFn: async () => {
      if (!menuId) throw new Error('Menu ID is required');

      const { data, error } = await supabaseClient
        .from('stream_ai_menu_run_context')
        .select('run(stream_ai_run_step(*))')
        .eq('menu', menuId)
        .single();

      const run = data?.run as unknown as Tables<'stream_ai_run'> & {
        stream_ai_run_step: Tables<'stream_ai_run_step'>[];
      };

      if (error) throw error;
      return run.stream_ai_run_step;
    },
    enabled: !!menuId,
  });
}
