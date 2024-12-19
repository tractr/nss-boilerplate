import { useCities } from '@/lib/api/queries';
import { CityGeography } from '@/types/database';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CitySelectProps {
  onCityChange: (city: CityGeography) => void;
}

export function CitySelect({ onCityChange }: CitySelectProps) {
  const { data: cities } = useCities() as { data: CityGeography[] | undefined };

  if (!cities) return null;

  return (
    <div className="absolute top-8 right-4 z-10 bg-white rounded-md border border-gray-200 w-56 ">
      <Select
        onValueChange={cityId => {
          const selectedCity = cities.find(city => city.id === cityId);
          if (selectedCity) {
            onCityChange(selectedCity);
          }
        }}
      >
        <SelectTrigger className="text-black">
          <SelectValue placeholder="Sélectionner une ville" />
        </SelectTrigger>
        <SelectContent>
          {cities.map(city => (
            <SelectItem key={city.id} value={city.id}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
