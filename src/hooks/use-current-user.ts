import supabaseClient from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
    const queryFn = async () => {
        const { data: sessionData, error: sessionError } = await supabaseClient
            .auth.getSession();
        if (sessionError || !sessionData?.session) {
            return null;
        }

        const { data, error } = await supabaseClient.auth.getUser();
        if (error) {
            throw error;
        }

        return data.user;
    };

    return useQuery({
        queryKey: ["currentUser"],
        queryFn,
    });
}
