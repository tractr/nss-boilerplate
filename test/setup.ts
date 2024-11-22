import dotenv from "dotenv";
import { env, reloadEnv } from "../src/lib/env";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.test" });
dotenv.config();

reloadEnv();

const client = createClient(
    env().SUPABASE_URL,
    env().SUPABASE_ANON_KEY,
);
await client.auth.signInWithPassword({
    email: String(process.env.SUPABASE_USER_EMAIL),
    password: String(process.env.SUPABASE_USER_PASSWORD),
});

const { data: { session } } = await client.auth.getSession();

process.env.SUPABASE_BASE_KEY = String(session?.access_token);

reloadEnv();

expect(env().SUPABASE_BASE_KEY).toBeDefined();
expect(env().SUPABASE_BASE_KEY).not.toBe(env().SUPABASE_ANON_KEY);
