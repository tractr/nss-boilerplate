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

export default function EditMenuPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (id) {
      // Fetch menu data
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
            router.push('/');
          }
        });
    }
  }, [id, router]);

  const mutation = useMutation({
    mutationFn: async (data: { id: string; label: string; file?: File }) => {
      if (!currentUser?.data?.id) {
        throw new Error('User not authenticated');
      }

      let filePath = null;

      if (data.file) {
        const fileExt = data.file.name.split('.').pop();
        filePath = `${currentUser.data.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabaseClient.storage
          .from('menu_files')
          .upload(filePath, data.file);

        if (uploadError) {
          throw uploadError;
        }
      }

      const { data: menu, error } = await supabaseClient
        .from('menus')
        .update({
          label: data.label,
          ...(filePath ? { file_path: filePath } : {}),
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { ...menu, trigger: data.file };
    },
    onSuccess: async data => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });

      if (data.trigger) {
        await supabaseClient.functions.invoke('trigger-menu-run', {
          body: {
            menu_id: data.id,
          },
        });
      }

      router.push(`/menus/${data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !label) {
      return;
    }

    mutation.mutate({ id, label, file: selectedFile ?? undefined });
  };

  return (
    <LayoutNav>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('menus.editMenu')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder={t('menus.labelPlaceholder')}
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  required
                />
              </div>
              <div>
                <Dropzone
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
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  {t('actions.cancel')}
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? t('actions.saving') : t('actions.save')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </LayoutNav>
  );
}
