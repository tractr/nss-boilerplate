const envRef = {
    current: {
        SUPABASE_URL: "",
        SUPABASE_ANON_KEY: "",
        SUPABASE_BASE_KEY: "",
    },
};

export const reloadEnv = () => {
    envRef.current = {
        SUPABASE_URL: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
        SUPABASE_ANON_KEY: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        SUPABASE_BASE_KEY: String(
            process.env.SUPABASE_BASE_KEY ||
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        ),
    };
};

reloadEnv();

export const env = () => envRef.current;
