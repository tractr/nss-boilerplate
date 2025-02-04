import { Tables } from '@/types/database';
import supabaseClient from './supabase-client';

type Menu = Tables<'menus'>;

export async function downloadMenuImage(menu: Menu) {
  if (!menu.file_bucket || !menu.file_path) {
    throw new Error('No file associated with this menu');
  }

  const { data, error } = await supabaseClient.storage
    .from(menu.file_bucket)
    .download(menu.file_path);

  if (error) {
    throw error;
  }

  // Créer un URL pour le blob et déclencher le téléchargement
  const url = window.URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `menu-${menu.label}.${menu.file_path.split('.').pop()}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
