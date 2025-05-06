import { createBrowserClient } from "@supabase/ssr";
import { env } from "../../lib/env";
import { Database } from "../../types/database";

export function createClient() {
  return createBrowserClient<Database>(
    env().SUPABASE_URL,
    env().SUPABASE_BASE_KEY,
  );
}
