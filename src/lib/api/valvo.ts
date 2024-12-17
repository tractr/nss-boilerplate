import supabaseClient from '@/lib/supabase-client';
import { GeneralIndicator, Tables, ValvoGeography } from '@/types/database';

export type Valvo = Tables<'valvo'>;
export type ValvoImage = Tables<'valvo_image'> & { url: string | null };

export async function getValvosGeography({ done }: { done?: boolean } = {}): Promise<
  ValvoGeography[]
> {
  let query = supabaseClient.rpc('get_valvo_geography');

  if (done !== undefined) {
    query = query.eq('done', done);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getValvo({
  valvo_id,
  done,
}: {
  valvo_id: string;
  done?: boolean;
}): Promise<Valvo | null> {
  let query = supabaseClient.from('valvo').select('*').eq('id', valvo_id);

  if (done !== undefined) {
    query = query.eq('done', done);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data[0];
}

export async function getGeneralIndicator({
  params,
  done,
}: {
  params: { valvo_id: string; period_of_time: number; start_date: Date };
  done?: boolean;
}): Promise<GeneralIndicator | null> {
  let query = supabaseClient.rpc('get_general_indicator', {
    valvo_id: params.valvo_id,
    period_of_time: params.period_of_time,
    start_date: params.start_date.toISOString(),
  });

  if (done !== undefined) {
    query = query.eq('done', done);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data[0];
}

export async function getImagesValvo({
  valvo_id,
  done,
}: {
  valvo_id: string;
  done?: boolean;
}): Promise<ValvoImage[]> {
  let query = supabaseClient.from('valvo_image').select('*').eq('valvo', valvo_id);

  if (done !== undefined) {
    query = query.eq('done', done);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getIndicatorHistory({
  params,
  done,
}: {
  params: { valvo_id: string; period_of_time?: number; start_date?: Date };
  done?: boolean;
}): Promise<GeneralIndicator[] | null> {
  let query = supabaseClient.rpc('get_general_indicator', {
    valvo_id: params.valvo_id,
    period_of_time: params.period_of_time || 1,
    start_date: params.start_date?.toISOString() || new Date().toISOString(),
  });

  if (done !== undefined) {
    query = query.eq('done', done);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
