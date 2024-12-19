import { indicatorColorClasses, getIndicatorState } from '@/hooks/use-indicator';
import { ValvoHistoryEntry } from '@/lib/api/queries';
import { cn } from '@/lib/utils';
import { Waves, Wind } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';

interface WeatherHistoryProps {
  weatherHistory: ValvoHistoryEntry[];
}

export function WeatherHistory({ weatherHistory }: WeatherHistoryProps) {
  return (
    <div className="container max-w-4xl mx-auto relative p-4 py-10">
      <h2 className="text-xl font-bold text-center mb-4 uppercase">Météo des 7 derniers jours</h2>
      <div className="bg-white rounded-lg p-2 border border-gray-200">
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-6 md:gap-4 min-w-min md:min-w-0 md:justify-between">
            {weatherHistory.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-3 min-w-[120px] md:min-w-0 md:w-full"
              >
                <span className="font-bold text-base uppercase">{day.dayName.slice(0, 3)}</span>
                <div
                  className={cn(
                    'flex justify-center items-center rounded px-2 py-3 w-full',
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
                    {day.waterTemp ? `${day.waterTemp}°C` : `n/d`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
