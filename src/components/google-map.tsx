import { useValvosGeography, useValvoWithIndicator } from '@/lib/api/queries';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useMemo, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CitySelect } from './city-select';
import { CityGeography, ValvoGeography } from '@/types/database';
import { ValvoCard } from './valvo-card';
import { env } from '@/lib/env';
import { ValvoWithIndicator } from '@/types/valvo';

const GoogleMapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env().NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const { data: valvos } = useValvosGeography();
  console.log(valvos);
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

  const createMarkerLabel = (valvo: ValvoWithIndicator) => {
    const canvas = document.createElement('canvas');
    const width = 50;
    const height = 30;
    const radius = 8;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Dessiner le cercle
      switch (valvo.generalIndicator?.general_indicator) {
        case 1:
          if (valvo.generalIndicator?.general?.reason) {
            ctx.fillStyle = '#F5F5F5';
          } else {
            ctx.fillStyle = '#E11E05';
          }
          break;
        case 2:
          ctx.fillStyle = '#ED7926';
          break;
        case 3:
          ctx.fillStyle = '#F9CE2E';
          break;
        case 4:
          ctx.fillStyle = '#6BB828';
          break;
        case 5:
          ctx.fillStyle = '#1271BF';
          break;
        default:
          ctx.fillStyle = '#F5F5F5';
      }
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Dessiner le texte
      ctx.fillStyle =
        valvo.generalIndicator?.general_value && !!!valvo.generalIndicator?.general?.reason
          ? 'white'
          : 'black';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        valvo.generalIndicator?.general_value?.toFixed(2) || 'N/A',
        width / 2,
        height / 2 + 2
      );
    }

    return canvas.toDataURL();
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
            icon={createMarkerLabel(valvo)}
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
