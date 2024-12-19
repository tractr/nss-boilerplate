import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { indicatorColorClasses, useIndicator } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { IndicatorGeneralDetails } from '@/types/valvo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ValvoCardProps {
  valvoId: string;
  valvo: IndicatorGeneralDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ValvoCard({ valvoId, valvo, open, onOpenChange }: ValvoCardProps) {
  const router = useRouter();
  const { translatedTitle, color, imageUrl } = useIndicator(
    valvo?.general_indicator || 1,
    valvo?.general_value || 1
  );

  if (!valvo) return null;

  const handleClick = () => {
    router.push(`/valvo/${valvoId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogHeader>
        <DialogTitle>
          <VisuallyHidden.Root>État de la valvo {valvo.location.name}</VisuallyHidden.Root>
        </DialogTitle>
      </DialogHeader>
      <DialogContent
        onClick={handleClick}
        className={cn(
          'max-w-[calc(100%-2rem)] w-[425px] sm:w-[600px] absolute top-auto bottom-10 left-1/2 -translate-x-1/2 h-fit border-white border-2 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-row items-stretch gap-4 md:gap-8 p-0 cursor-pointer hover:scale-[1.02] transition-transform',
          indicatorColorClasses[color as keyof typeof indicatorColorClasses]
        )}
      >
        <div className="w-20 md:w-1/3 bg-black/10 backdrop-blur-md flex items-center justify-center p-2">
          <Image
            src={imageUrl}
            alt="Indicator"
            width={120}
            height={120}
            className="drop-shadow-xl"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-6 pr-4 md:pr-6">
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
          <span className="text-base md:text-2xl font-bold leading-tight text-center">
            {translatedTitle}
          </span>
          <span className="text-xs md:text-lg leading-tight text-center">
            {valvo.location.description || valvo.location.name}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
