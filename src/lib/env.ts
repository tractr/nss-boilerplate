const envRef = {
  current: {
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: '',
    SUPABASE_BASE_KEY: '',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: '',
    NEXT_PUBLIC_WEATHER_API_KEY: '',
  },
};

export const reloadEnv = () => {
  envRef.current = {
    SUPABASE_URL: String(process.env.SUPABASE_URL),
    SUPABASE_ANON_KEY: String(process.env.SUPABASE_ANON_KEY),
    SUPABASE_BASE_KEY: String(process.env.SUPABASE_BASE_KEY || process.env.SUPABASE_ANON_KEY),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
    NEXT_PUBLIC_WEATHER_API_KEY: String(process.env.NEXT_PUBLIC_WEATHER_API_KEY),
  };
};

reloadEnv();

export const env = () => envRef.current;
