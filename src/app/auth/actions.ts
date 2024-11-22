"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import createClient from "@/lib/supabase/server";

export async function login(data: {
    email: string;
    password: string;
}) {
    const supabase = await createClient();

    const headersList = await headers();
    const referer = new URL(headersList.get("referer") || "/");

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        throw error;
    }

    revalidatePath("/", "layout");

    const next = referer.searchParams.get("next");
    if (next) {
        redirect(next);
    }

    redirect("/");
}
