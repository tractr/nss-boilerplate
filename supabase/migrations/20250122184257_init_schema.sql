

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."stream_ai_process_status" AS ENUM (
    'created',
    'processing',
    'step_finished',
    'fully_finished',
    'error'
);


ALTER TYPE "public"."stream_ai_process_status" OWNER TO "postgres";


CREATE TYPE "public"."stream_ai_step" AS ENUM (
    'menu_ocr',
    'menu_recipe',
    'menu_environmental_impact',
    'menu_summary'
);


ALTER TYPE "public"."stream_ai_step" OWNER TO "postgres";


CREATE TYPE "public"."stream_ai_type" AS ENUM (
    'menu',
    'sell'
);


ALTER TYPE "public"."stream_ai_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."config" (
    "key" "text" NOT NULL,
    "value" "text" NOT NULL
);


ALTER TABLE "public"."config" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."file" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "file_bucket" "text" NOT NULL,
    "file_path" "text" NOT NULL
);


ALTER TABLE "public"."file" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."menu" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_date" timestamp with time zone,
    "label" "text" NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "file" "uuid",
    "owner" "uuid" NOT NULL
);


ALTER TABLE "public"."menu" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sell" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_date" timestamp with time zone,
    "label" "text" NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "file" "uuid",
    "owner" "uuid" NOT NULL
);


ALTER TABLE "public"."sell" OWNER TO "postgres";


COMMENT ON TABLE "public"."sell" IS 'This is a duplicate of menu';



CREATE TABLE IF NOT EXISTS "public"."stream_ai_menu_run_context" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "menu" "uuid" NOT NULL,
    "run" "uuid" NOT NULL
);


ALTER TABLE "public"."stream_ai_menu_run_context" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stream_ai_run" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "status" "public"."stream_ai_process_status" DEFAULT 'created'::"public"."stream_ai_process_status" NOT NULL,
    "error_message" "text",
    "current_step" "public"."stream_ai_step",
    "type" "public"."stream_ai_type" NOT NULL
);


ALTER TABLE "public"."stream_ai_run" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stream_ai_run_step" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "run" "uuid" NOT NULL,
    "input" "jsonb" NOT NULL,
    "output" "jsonb",
    "finished_at" timestamp with time zone,
    "step" "public"."stream_ai_step" NOT NULL,
    "error_message" "text"
);


ALTER TABLE "public"."stream_ai_run_step" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stream_ai_sell_run_context" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "sell" "uuid" NOT NULL,
    "run" "uuid" NOT NULL
);


ALTER TABLE "public"."stream_ai_sell_run_context" OWNER TO "postgres";


ALTER TABLE ONLY "public"."config"
    ADD CONSTRAINT "config_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."file"
    ADD CONSTRAINT "file_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stream_ai_menu_run_context"
    ADD CONSTRAINT "stream_ai_menu_run_context_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."menu"
    ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sell"
    ADD CONSTRAINT "sell_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stream_ai_run_step"
    ADD CONSTRAINT "stream_ai_run_step_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stream_ai_run"
    ADD CONSTRAINT "stream_ai_run_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stream_ai_sell_run_context"
    ADD CONSTRAINT "stream_ai_sell_run_context_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."file"
    ADD CONSTRAINT "file_file_bucket_file_path_fkey" FOREIGN KEY ("file_bucket", "file_path") REFERENCES "storage"."objects"("bucket_id", "name") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stream_ai_menu_run_context"
    ADD CONSTRAINT "stream_ai_menu_run_context_menu_fkey" FOREIGN KEY ("menu") REFERENCES "public"."menu"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."menu"
    ADD CONSTRAINT "menu_file_fkey" FOREIGN KEY ("file") REFERENCES "public"."file"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."menu"
    ADD CONSTRAINT "menu_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sell"
    ADD CONSTRAINT "sell_file_fkey" FOREIGN KEY ("file") REFERENCES "public"."file"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."sell"
    ADD CONSTRAINT "sell_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stream_ai_run_step"
    ADD CONSTRAINT "stream_ai_run_step_run_fkey" FOREIGN KEY ("run") REFERENCES "public"."stream_ai_run"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stream_ai_menu_run_context"
    ADD CONSTRAINT "stream_ai_menu_run_context_run_fkey" FOREIGN KEY ("run") REFERENCES "public"."stream_ai_run"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stream_ai_sell_run_context"
    ADD CONSTRAINT "stream_ai_sell_run_context_sell_fkey" FOREIGN KEY ("sell") REFERENCES "public"."sell"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stream_ai_sell_run_context"
    ADD CONSTRAINT "stream_ai_sell_run_context_run_fkey" FOREIGN KEY ("run") REFERENCES "public"."stream_ai_run"("id") ON DELETE CASCADE;



ALTER TABLE "public"."config" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."file" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."menu" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sell" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stream_ai_menu_run_context" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stream_ai_run" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stream_ai_run_step" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stream_ai_sell_run_context" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";









































































































































































































GRANT ALL ON TABLE "public"."config" TO "anon";
GRANT ALL ON TABLE "public"."config" TO "authenticated";
GRANT ALL ON TABLE "public"."config" TO "service_role";



GRANT ALL ON TABLE "public"."file" TO "anon";
GRANT ALL ON TABLE "public"."file" TO "authenticated";
GRANT ALL ON TABLE "public"."file" TO "service_role";



GRANT ALL ON TABLE "public"."menu" TO "anon";
GRANT ALL ON TABLE "public"."menu" TO "authenticated";
GRANT ALL ON TABLE "public"."menu" TO "service_role";



GRANT ALL ON TABLE "public"."sell" TO "anon";
GRANT ALL ON TABLE "public"."sell" TO "authenticated";
GRANT ALL ON TABLE "public"."sell" TO "service_role";



GRANT ALL ON TABLE "public"."stream_ai_menu_run_context" TO "anon";
GRANT ALL ON TABLE "public"."stream_ai_menu_run_context" TO "authenticated";
GRANT ALL ON TABLE "public"."stream_ai_menu_run_context" TO "service_role";



GRANT ALL ON TABLE "public"."stream_ai_run" TO "anon";
GRANT ALL ON TABLE "public"."stream_ai_run" TO "authenticated";
GRANT ALL ON TABLE "public"."stream_ai_run" TO "service_role";



GRANT ALL ON TABLE "public"."stream_ai_run_step" TO "anon";
GRANT ALL ON TABLE "public"."stream_ai_run_step" TO "authenticated";
GRANT ALL ON TABLE "public"."stream_ai_run_step" TO "service_role";



GRANT ALL ON TABLE "public"."stream_ai_sell_run_context" TO "anon";
GRANT ALL ON TABLE "public"."stream_ai_sell_run_context" TO "authenticated";
GRANT ALL ON TABLE "public"."stream_ai_sell_run_context" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
