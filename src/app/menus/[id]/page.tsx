'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import supabaseClient from '@/lib/supabase-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LayoutSidebar from '@/components/layout-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Dropzone } from '@/components/ui/dropzone';

export default function EditMenuPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations();
  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew && id) {
      // Fetch menu data if editing
      supabaseClient
        .from('Menu')
        .select()
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setLabel(data.label);
          }
        });
    }
  }, [id, isNew]);

  const mutation = useMutation({
    mutationFn: async (data: { id?: string; label: string; file?: File }) => {
      let imagePath = null;

      if (data.file) {
        const fileExt = data.file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabaseClient.storage
          .from('menu-images')
          .upload(fileName, data.file);

        if (uploadError) {
          throw uploadError;
        }

        imagePath = fileName;
      }

      if (data.id && !isNew) {
        return supabaseClient.from('Menu').update({ label: data.label }).eq('id', data.id);
      }

      return supabaseClient.from('Menu').insert([
        {
          label: data.label,
          image_url: imagePath,
        },
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      router.push('/menus');
    },
  });

  const handleSave = () => {
    mutation.mutate({ id: isNew ? undefined : id, label, file: selectedFile ?? undefined });
  };

  return (
    <LayoutSidebar>
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
    </LayoutSidebar>
  );
}
