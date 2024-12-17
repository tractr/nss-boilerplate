import { indicatorColorClasses, getIndicatorState } from '@/hooks/use-indicator';
import { ValvoHistoryEntry } from '@/lib/api/queries';
import { cn } from '@/lib/utils';
import { Ban, Waves, Wind } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';

interface WeatherHistoryProps {
  weatherHistory: ValvoHistoryEntry[];
}

export function WeatherHistory({ weatherHistory }: WeatherHistoryProps) {
  return (
    <div className="container max-w-4xl mx-auto relative">
      <div className="grid grid-cols-4 gap-y-8 md:grid-cols-7 gap-4 bg-white rounded-lg p-4 shadow-sm">
        {weatherHistory.map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <span className="font-bold text-base uppercase">{day.dayName.slice(0, 3)}</span>
            <div
              className={cn(
                'flex justify-center items-center rounded px-1 py-2',
                indicatorColorClasses[
                  getIndicatorState(
                    day.indicator as 0 | 1 | 2 | 3 | 4 | 5,
                    day.general_value
                  ) as keyof typeof indicatorColorClasses
                ]
              )}
            >
              <span className="text-lg">{day.general_value.toFixed(2)}</span>
            </div>
            <Separator className="w-1/2" />
            <Image
              src={`https:${day.weather?.condition.icon}`}
              alt={day.weather?.condition.text || ''}
              width={32}
              height={32}
            />
            <span className="text-sm font-medium">{day.weather?.avgtemp_c}°C</span>
            <Separator className="w-1/2" />
            <div className="flex flex-col items-center gap-1">
              <Wind className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium">{day.weather?.maxwind_kph}</span>
            </div>
            <Separator className="w-1/2" />
            <div className="flex flex-col items-center gap-1">
              <Waves className="w-6 h-6 text-cyan-500" />
              <span className="text-sm font-medium">
                {day.waterTemp ? `${day.waterTemp}°C` : <Ban className="w-8 h-8 text-red-500" />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
