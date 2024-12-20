'use client';

import { useIndicator } from '@/hooks/use-indicator';
import {
  useValvoWithIndicator,
  useWeatherHistory,
  useValvoIndicatorHistory,
  useValvoImages,
  useValvoGeographyDetails,
} from '@/lib/api/queries';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { IndicatorHeader } from '@/components/indicator-header';
import { WeatherHistory } from '@/components/weather-history';
import { IndicatorGrid } from '@/components/indicator-grid';
import { Statistics } from '@/components/Statistics';
import { ValvoImages } from '@/components/valvo-images';
import { Calendar } from '@/components/ui/calendar';
import { fr } from 'date-fns/locale';
import format from 'date-fns/format';
import { isToday as dateFnsIsToday } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ValvoPage() {
  const { id } = useParams();
  const [period, setPeriod] = useState<'30' | '90' | '180'>('30');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const isToday = dateFnsIsToday(selectedDate);

  const { data: valvo, isLoading, error } = useValvoWithIndicator(id as string, selectedDate, 1);

  const {
    data: valvoGeo,
    isLoading: isLoadingGeo,
    error: geoError,
  } = useValvoGeographyDetails(id as string);

  const { translatedTitle, color, imageUrl, bgImageLeftUrl, bgImageRightUrl, bgImagePatternUrl } =
    useIndicator(valvo?.general_indicator || 1, valvo?.general_value || 1);

  const { data: weatherHistory, isLoading: isLoadingWeather } = useWeatherHistory(
    isToday ? (id as string) : null,
    selectedDate,
    7
  );
  const { data: indicatorHistory, isLoading: isLoadingIndicator } = useValvoIndicatorHistory(
    id as string,
    selectedDate,
    parseInt(period)
  );
  const { data: valvoImages, isLoading: isLoadingImages } = useValvoImages(id as string);

  if (isLoading || isLoadingGeo)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  if (error || geoError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error: {error?.message || geoError?.message}</p>
      </div>
    );
  if (!valvo || !valvoGeo)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Valvo non trouvé</p>
      </div>
    );

  const currentWeather = weatherHistory?.[weatherHistory.length - 1]?.weather;

  return (
    <>
      <div className="container max-w-4xl mx-auto pt-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {valvo.location.description || valvo.location.name}
            </h1>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, 'PPP', { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={date => date && setSelectedDate(date)}
                disabled={date => date > new Date()}
                locale={fr}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <IndicatorHeader
        value={valvo.general_value || 0}
        color={color}
        imageUrl={imageUrl}
        bgImageLeftUrl={bgImageLeftUrl}
        bgImageRightUrl={bgImageRightUrl}
        bgImagePatternUrl={bgImagePatternUrl}
        translatedTitle={translatedTitle}
        currentWeather={isToday ? currentWeather : undefined}
        waterTemperature={valvo.water_temperature?.water_temperature_max || undefined}
      />

      {isToday &&
        (isLoadingWeather ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <WeatherHistory weatherHistory={weatherHistory || []} />
        ))}

      <IndicatorGrid indicators={valvo} />

      <div className="container max-w-4xl mx-auto relative mb-8 mt-10 p-4">
        {isLoadingIndicator ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Statistics data={indicatorHistory || []} period={period} onPeriodChange={setPeriod} />
        )}
      </div>

      {valvoImages && valvoImages.length > 0 && (
        <ValvoImages images={valvoImages || []} isLoading={isLoadingImages} />
      )}
    </>
  );
}
