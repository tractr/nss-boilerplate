import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { indicatorColorClasses, useIndicator } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { IndicatorGeneralDetails } from '@/types/valvo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
interface ValvoCardProps {
  valvoId: string;
  valvo: IndicatorGeneralDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ValvoCard({ valvoId, valvo, open, onOpenChange }: ValvoCardProps) {
  const { translatedTitle, color, imageUrl } = useIndicator(
    valvo?.general_indicator || 1,
    valvo?.general_value || 1
  );
  if (!valvo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogHeader>
        <DialogTitle>
          <VisuallyHidden.Root>État de la valvo {valvo.location.name}</VisuallyHidden.Root>
        </DialogTitle>
      </DialogHeader>
      <DialogContent
        className={cn(
          'max-w-[425px] sm:max-w-[600px] absolute top-auto bottom-10 h-fit border-white border-2 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-row items-stretch justify-between gap-4 md:gap-8 p-0',
          indicatorColorClasses[color as keyof typeof indicatorColorClasses]
        )}
      >
        <div className="w-20 md:w-1/4 bg-black/10 backdrop-blur-md flex items-center p-2">
          <Image
            src={imageUrl}
            alt="Indicator"
            width={120}
            height={120}
            className="drop-shadow-xl"
          />
        </div>

        <div className="flex flex-col items-center justify-center md:w-1/3 py-4 md:py-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-base font-medium underline decoration-dotted">
                <span className="text-xl md:text-4xl font-bold">
                  {valvo.general_value?.toFixed(2) || 1}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Molluscan Water Indicateur</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-base md:text-2xl font-bold leading-tight">{translatedTitle}</span>
          <span className="text-xs md:text-lg leading-tight">
            {valvo.location.description || valvo.location.name}
          </span>
        </div>

        <div className="md:w-1/3 py-4 md:py-6 pr-4 md:pr-6 flex flex-col items-center justify-center">
          <Button>
            <Link href={`/valvo/${valvoId}`}>Voir les détails</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
