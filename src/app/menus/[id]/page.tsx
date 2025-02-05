'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import supabaseClient from '@/lib/supabase-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LayoutNav from '@/components/layout-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Dropzone } from '@/components/ui/dropzone';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useActiveMenuStore } from '@/stores/use-active-menu-store';

export default function EditMenuPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations();
  const isNew = id === 'new';
  const currentUser = useCurrentUser();
  const setActiveMenuId = useActiveMenuStore(state => state.setActiveMenuId);

  useEffect(() => {
    if (!isNew && id) {
      // Fetch menu data if editing
      supabaseClient
        .from('menus')
        .select()
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setLabel(data.label);
          } else {
            // Redirect to menus list if menu not found
            router.push('/menus');
          }
        });
    }
  }, [id, isNew, router]);

  const mutation = useMutation({
    mutationFn: async (data: { id?: string; label: string; file?: File }) => {
      let filePath = null;

      if (!currentUser?.data?.id) {
        throw new Error('User not found');
      }

      if (data.file) {
        const fileExt = data.file.name.split('.').pop();
        const timestamp = Date.now();
        const fileName = `${timestamp}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabaseClient.storage
          .from('menu_files')
          .upload(`${currentUser?.data?.id}/${fileName}`, data.file);

        if (uploadError) {
          throw uploadError;
        }

        filePath = uploadData.path;
      }

      if (data.id && !isNew) {
        const { error } = await supabaseClient
          .from('menus')
          .update({ label: data.label })
          .eq('id', data.id);
        if (error) throw error;
        return { id: data.id };
      }

      const { data: menu, error } = await supabaseClient
        .from('menus')
        .insert([
          {
            label: data.label,
            file_bucket: 'menu_files',
            file_path: filePath,
          },
        ])
        .select('id')
        .single();

      console.log('menu', menu);

      if (error) {
        throw error;
      }

      if (!menu) {
        throw new Error('Failed to create menu');
      }

      return menu;
    },
    onSuccess: async data => {
      if (!data?.id) {
        return;
      }

      await supabaseClient.functions.invoke('trigger-menu-run', {
        body: {
          menu_id: data.id,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['menus'] });
      if (isNew) {
        setActiveMenuId(data.id);
        router.push('/');
      } else {
        router.push('/menus');
      }
    },
  });

  const handleSave = () => {
    mutation.mutate({ id: isNew ? undefined : id, label, file: selectedFile ?? undefined });
  };

  return (
    <LayoutNav>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>{isNew ? t('menus.createMenu') : t('menus.editMenu')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="label" className="text-sm font-medium">
                  {t('menus.label')}
                </label>
                <Input id="label" value={label} onChange={e => setLabel(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">{t('menus.image')}</label>
                <Dropzone
                  disabled={!isNew}
                  accept="image/*"
                  onFileDrop={files => {
                    if (files[0]) {
                      setSelectedFile(files[0]);
                    }
                  }}
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.push('/menus')}>
                  {t('actions.cancel')}
                </Button>
                <Button onClick={handleSave} disabled={mutation.isPending}>
                  {mutation.isPending ? t('actions.saving') : t('actions.save')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutNav>
  );
}
