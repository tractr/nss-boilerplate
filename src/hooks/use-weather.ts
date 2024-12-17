import { env } from '@/lib/env';
import { WeatherData, Location } from '@/types/weather';
import { useEffect, useState } from 'react';

export function useWeather(location: Location) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/history.json?key=${env().NEXT_PUBLIC_WEATHER_API_KEY}&q=${
            location.lat
          },${location.lng}&dt=${new Date().toISOString()}&lang=fr`
        );
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération de la météo');
        }
        const data = await res.json();
        setWeather(data.forecast.forecastday[0].day);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setIsLoading(false);
      }
    };

    if (location.lat && location.lng) {
      fetchWeather();
    }
  }, [location]);

  return { weather, isLoading, error };
}
