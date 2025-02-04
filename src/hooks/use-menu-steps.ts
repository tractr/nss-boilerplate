import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabaseClient from '@/lib/supabase-client';
import { Tables } from '@/types/database';

type MenuStep = Tables<'stream_ai_run_steps'>;

export function useMenuSteps(menuId?: string) {
  const {
    data: steps,
    refetch,
    ...rest
  } = useQuery<MenuStep[]>({
    queryKey: ['menu-steps', menuId],
    queryFn: async () => {
      if (!menuId) throw new Error('Menu ID is required');

      const { data, error } = await supabaseClient
        .from('stream_ai_menu_run_contexts')
        .select('run(stream_ai_run_steps(*))')
        .eq('menu', menuId)
        .single();

      const run = data?.run as unknown as Tables<'stream_ai_runs'> & {
        stream_ai_run_steps: Tables<'stream_ai_run_steps'>[];
      };

      if (error) throw error;
      return run.stream_ai_run_steps;
    },
    enabled: !!menuId,
  });

  useEffect(() => {
    if (!menuId) return;

    console.log('Iyuiouyio');

    // Subscribe to changes in the run steps table
    const channel = supabaseClient
      .channel(`menu-steps-${menuId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'stream_ai_run_steps',
        },
        () => {
          // Refetch data when changes occur
          refetch();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [menuId, refetch]);

  return { data: steps, ...rest };
}
