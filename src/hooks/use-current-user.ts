import supabaseClient from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  const queryFn = async () => {
    const { data } = await supabaseClient.auth.getUser();
    return data.user;
  };

  return useQuery({
    queryKey: ['currentUser'],
    queryFn,
  });
}
