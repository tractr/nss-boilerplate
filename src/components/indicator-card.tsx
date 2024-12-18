import { Card } from '@/components/ui/card';
import { indicatorColorClasses, getIndicatorState } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { CircleHelp } from 'lucide-react';

interface IndicatorData {
  value: number;
  indicator: number;
}

function useIndicatorColor(data?: IndicatorData | null) {
  return useMemo(() => {
    if (!data) return 'unknown';
    return getIndicatorState(data.indicator as 0 | 1 | 2 | 3 | 4 | 5, data.value);
  }, [data]);
}

interface IndicatorCardProps {
  value?: number;
  label?: string;
  tooltip?: string;
  unit?: string;
  indicator?: number;
  reason?: string;
}

export function IndicatorCard({
  value,
  label,
  tooltip,
  unit,
  indicator,
  reason,
}: IndicatorCardProps) {
  const color = useIndicatorColor(
    value === undefined || indicator === undefined ? null : { value, indicator }
  );

  if (reason) return null;

  return (
    <Card className="flex items-center gap-4 p-2 pl-4 relative overflow-hidden shadow-none">
      <div
        className={cn(
          'w-2 h-full absolute top-0 left-0',
          indicatorColorClasses[color as keyof typeof indicatorColorClasses]
        )}
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <span className="text-sm text-black">{label}</span>
                <CircleHelp className="w-3 h-3 text-black" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xl font-bold">{(value || 0).toFixed(2)}</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
    </Card>
  );
}
