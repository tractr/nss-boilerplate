export interface WeatherData {
  avgtemp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  maxwind_kph: number;
  avghumidity: number;
}

export interface Location {
  lat: number;
  lng: number;
}
