'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/database';
import supabaseClient from '@/lib/supabase-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Menu = Tables<'Menu'>;

interface DeleteMenuDialogProps {
  menu: Menu | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export function DeleteMenuDialog({ menu, open, onOpenChange, onDelete }: DeleteMenuDialogProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return supabaseClient.from('Menu').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      onDelete();
    },
  });

  const handleDelete = () => {
    if (menu?.id) {
      mutation.mutate(menu.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Menu</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this menu? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={mutation.isPending}>
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
