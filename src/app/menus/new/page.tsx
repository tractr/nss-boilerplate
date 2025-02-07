'use client';

import LayoutNav from '@/components/layout-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dropzone } from '@/components/ui/dropzone';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabaseClient from '@/lib/supabase-client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useActiveMenuStore } from '@/stores/use-active-menu-store';

export default function NewMenuPage() {
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations();
  const currentUser = useCurrentUser();
  const setActiveMenuId = useActiveMenuStore(state => state.setActiveMenuId);

  const mutation = useMutation({
    mutationFn: async (data: { label: string; file?: File }) => {
      let filePath = null;

      if (!currentUser?.data?.id) {
        throw new Error('User not authenticated');
      }

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
        .insert({
          label: data.label,
          file_bucket: 'menu_files',
          file_path: filePath,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { ...menu, trigger: data.file };
    },
    onSuccess: async data => {
      if (!data?.id) {
        return;
      }

      if (data.trigger) {
        await supabaseClient.functions.invoke('trigger-menu-run', {
          body: {
            menu_id: data.id,
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: ['menus'] });
      setActiveMenuId(data.id);
      router.push(`/menus/${data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!label) {
      return;
    }

    mutation.mutate({ label, file: selectedFile ?? undefined });
  };

  return (
    <LayoutNav>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('menus.createMenu')}</CardTitle>
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
