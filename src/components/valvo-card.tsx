import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { indicatorColorClasses, useIndicator } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { IndicatorGeneralDetails } from '@/types/valvo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ValvoCardProps {
  valvoId: string;
  valvo: IndicatorGeneralDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ValvoCard({ valvoId, valvo, open, onOpenChange }: ValvoCardProps) {
  const router = useRouter();
  const { translatedTitle, color } = useIndicator(
    valvo?.general_indicator || 1,
    valvo?.general_value || 1
  );
  if (!valvo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        className={cn(
          'sm:max-w-[425px] absolute top-auto bottom-10 h-fit',
          indicatorColorClasses[color as keyof typeof indicatorColorClasses]
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Valvo {valvo.location.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">{translatedTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {' '}
              {valvo.location.name} - {valvo.location.city}
            </p>
          </div>
          <Button variant="secondary" onClick={() => router.push(`/valvo/${valvoId}`)}>
            Voir les détails
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
