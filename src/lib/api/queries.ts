import { useQuery } from '@tanstack/react-query';
import {
  getValvosGeography,
  getValvo,
  getGeneralIndicator,
  getIndicatorHistory,
  getImagesValvo,
} from './valvo';
import { getCities } from './cities';
import { IndicatorGeneralDetails } from '@/types/valvo';
import { WeatherData } from '@/types/weather';
import { getPublicImageUrl } from '../supabase/storage';
import { env } from '../env';

export interface ValvoHistoryEntry {
  date: Date;
  dayName: string;
  general_value: number;
  indicator: number;
  weather: WeatherData | null;
  waterTemp: number | null;
}

async function fetchWeatherForDate(
  location: { lat: number; lng: number },
  date: Date
): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${env().NEXT_PUBLIC_WEATHER_API_KEY}&q=${
        location.lat
      },${location.lng}&dt=${date.toISOString().split('T')[0]}&lang=fr`
    );
    if (!res.ok) {
      throw new Error('Erreur lors de la récupération de la météo');
    }
    const data = await res.json();
    return data.forecast.forecastday[0].day;
  } catch (err) {
    console.error('Erreur météo:', err);
    return null;
  }
}

export function useValvosGeography({ done }: { done?: boolean } = {}) {
  return useQuery({
    queryKey: ['valvosGeography', { done }],
    queryFn: () => getValvosGeography({ done }),
  });
}

export function useValvoImages(valvoId: string | null, done?: boolean) {
  return useQuery({
    queryKey: ['valvoImages', valvoId, { done }],
    queryFn: async () => {
      const images = await getImagesValvo({ valvo_id: valvoId!, done });
      const imagesWithUrls = await Promise.all(
        images.map(async image => ({
          ...image,
          url: await getPublicImageUrl(image.image_path, image.image_bucket),
        }))
      );
      return imagesWithUrls;
    },
    enabled: !!valvoId,
  });
}

export function useValvoWithIndicator(valvoId: string | null, periodOfTime?: number) {
  return useQuery<IndicatorGeneralDetails | null>({
    queryKey: ['valvoWithIndicator', valvoId],
    queryFn: async () => {
      if (!valvoId) return null;
      const [valvoDetails, generalIndicator] = await Promise.all([
        getValvo({ valvo_id: valvoId }),
        getGeneralIndicator({
          params: {
            valvo_id: valvoId,
            period_of_time: periodOfTime || 1,
            start_date: new Date(),
          },
        }),
      ]);

      if (!valvoDetails || !generalIndicator) return null;

      return {
        ...generalIndicator,
        location: {
          name: valvoDetails.name,
          city: valvoDetails.city || '',
        },
      };
    },
    enabled: !!valvoId,
  });
}

export function useCities({ done }: { done?: boolean } = {}) {
  return useQuery({
    queryKey: ['cities', { done }],
    queryFn: () => getCities({ done }),
  });
}

export function useValvoGeography(valvoId: string | null) {
  return useQuery({
    queryKey: ['valvoGeography', valvoId],
    queryFn: async () => {
      if (!valvoId) return null;
      const valvos = await getValvosGeography();
      return valvos.find(valvo => valvo.id === valvoId) || null;
    },
    enabled: !!valvoId,
  });
}

export function useWeatherHistory(valvoId: string | null, daysCount: number = 5) {
  const { data: valvoGeo } = useValvoGeography(valvoId);

  return useQuery<ValvoHistoryEntry[]>({
    queryKey: ['valvoHistory', valvoId, daysCount],
    queryFn: async () => {
      if (!valvoId || !valvoGeo) return [];

      // Créer un tableau des X derniers jours
      const dates = Array.from({ length: daysCount }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (daysCount - 1 - i));
        return date;
      });

      // Récupérer en parallèle les indicateurs et la météo pour chaque jour
      const [indicators, weatherData] = await Promise.all([
        Promise.all(
          dates.map(date =>
            getGeneralIndicator({
              params: {
                valvo_id: valvoId,
                period_of_time: 1,
                start_date: date,
              },
            })
          )
        ),
        Promise.all(
          dates.map(date =>
            fetchWeatherForDate({ lat: valvoGeo.latitude, lng: valvoGeo.longitude }, date)
          )
        ),
      ]);

      // Combiner les résultats
      return dates.map((date, index) => ({
        date,
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'long' }),
        general_value: indicators[index]?.general_value ?? 1,
        indicator: indicators[index]?.general_indicator ?? 1,
        weather: weatherData[index],
        waterTemp: indicators[index]?.water_temperature?.water_temperature_max ?? null,
      }));
    },
    enabled: !!valvoId && !!valvoGeo,
  });
}

export function useValvoIndicatorHistory(valvoId: string | null, periodInDays: number = 30) {
  return useQuery({
    queryKey: ['valvoIndicatorHistory', valvoId, periodInDays],
    queryFn: () =>
      getIndicatorHistory({
        params: {
          valvo_id: valvoId!,
          period_of_time: periodInDays,
        },
      }),
    enabled: !!valvoId,
  });
}
