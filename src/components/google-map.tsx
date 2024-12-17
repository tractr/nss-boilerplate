import { useValvosGeography, useValvoWithIndicator } from '@/lib/api/queries';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useMemo, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CitySelect } from './city-select';
import { CityGeography, ValvoGeography } from '@/types/database';
import { ValvoCard } from './valvo-card';
import { env } from '@/lib/env';

const GoogleMapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env().NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const { data: valvos } = useValvosGeography() as { data: ValvoGeography[] | undefined };
  const [selectedCity, setSelectedCity] = useState<CityGeography | null>(null);
  const [selectedValvoId, setSelectedValvoId] = useState<string | null>(null);
  const [isValvoCardOpen, setIsValvoCardOpen] = useState(false);
  const { data: selectedValvoWithIndicator } = useValvoWithIndicator(selectedValvoId);

  const center = useMemo(() => {
    if (selectedCity) {
      return { lat: selectedCity.latitude, lng: selectedCity.longitude };
    }
    if (valvos && valvos.length > 0) {
      return { lat: valvos[0].latitude, lng: valvos[0].longitude };
    }
    return { lat: 43.4, lng: 3.7 }; // Valeurs par défaut
  }, [selectedCity, valvos]);

  // Ouvrir automatiquement la première valvo au chargement
  useEffect(() => {
    if (valvos && valvos.length > 0 && !selectedValvoId) {
      setSelectedValvoId(valvos[0].id);
      setIsValvoCardOpen(true);
    }
  }, [valvos, selectedValvoId]);

  if (!isLoaded) return <div>Chargement...</div>;

  const handleMapClick = () => {
    setIsValvoCardOpen(false);
  };

  const handleMarkerClick = (valvo: ValvoGeography) => {
    setSelectedValvoId(valvo.id);
    setIsValvoCardOpen(true);
  };

  return (
    <div className="relative">
      {isLoaded && <Skeleton className="absolute inset-0" />}
      <CitySelect onCityChange={setSelectedCity} />
      <GoogleMap
        zoom={10}
        options={{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }}
        mapTypeId="satellite"
        center={center}
        mapContainerClassName="map-container"
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        onClick={handleMapClick}
      >
        {valvos?.map((valvo, index) => (
          <Marker
            key={index}
            position={{ lat: valvo.latitude, lng: valvo.longitude }}
            title={valvo.id}
            onClick={() => handleMarkerClick(valvo)}
          />
        ))}
      </GoogleMap>
      <ValvoCard
        valvoId={selectedValvoId || ''}
        valvo={selectedValvoWithIndicator || null}
        open={isValvoCardOpen}
        onOpenChange={setIsValvoCardOpen}
      />
    </div>
  );
};

export default GoogleMapComponent;
