import supabaseClient from '@/lib/supabase-client';

export function getPublicImageUrl(path: string, bucket: string): string | null {
  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);

  console.log(data);

  if (!data.publicUrl) {
    console.error("Erreur lors de la récupération de l'image");
    return null;
  }

  return data.publicUrl;
}
