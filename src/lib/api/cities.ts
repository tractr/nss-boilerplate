import supabaseClient from '@/lib/supabase-client';

export async function getCities({ done }: { done?: boolean } = {}) {
  let query = supabaseClient.rpc('get_city_geography');

  if (done !== undefined) {
    query = query.eq('done', done);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
