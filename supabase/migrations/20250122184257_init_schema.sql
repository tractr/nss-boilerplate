

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






CREATE TYPE "public"."StreamAIProcessStatus" AS ENUM (
    'created',
    'processing',
    'step-finished',
    'fully-finished',
    'error'
);


ALTER TYPE "public"."StreamAIProcessStatus" OWNER TO "postgres";


CREATE TYPE "public"."StreamAIStep" AS ENUM (
    'menu_ocr',
    'menu_recipe',
    'menu_environmental_impact',
    'menu_summary'
);


ALTER TYPE "public"."StreamAIStep" OWNER TO "postgres";


CREATE TYPE "public"."StreamAIType" AS ENUM (
    'menu',
    'sell'
);


ALTER TYPE "public"."StreamAIType" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Config" (
    "key" "text" NOT NULL,
    "value" "text" NOT NULL
);


ALTER TABLE "public"."Config" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."File" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "file_bucket" "text" NOT NULL,
    "file_path" "text" NOT NULL
);


ALTER TABLE "public"."File" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Menu" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_date" timestamp with time zone,
    "label" "text" NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "file" "uuid",
    "owner" "uuid" NOT NULL
);


ALTER TABLE "public"."Menu" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Sell" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_date" timestamp with time zone,
    "label" "text" NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "file" "uuid",
    "owner" "uuid" NOT NULL
);


ALTER TABLE "public"."Sell" OWNER TO "postgres";


COMMENT ON TABLE "public"."Sell" IS 'This is a duplicate of Menu';



CREATE TABLE IF NOT EXISTS "public"."StreamAIMenuRunContext" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "menu" "uuid" NOT NULL,
    "run" "uuid" NOT NULL
);


ALTER TABLE "public"."StreamAIMenuRunContext" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."StreamAIRun" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "status" "public"."StreamAIProcessStatus" DEFAULT 'created'::"public"."StreamAIProcessStatus" NOT NULL,
    "error_message" "text",
    "current_step" "public"."StreamAIStep",
    "type" "public"."StreamAIType" NOT NULL
);


ALTER TABLE "public"."StreamAIRun" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."StreamAIRunStep" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "run" "uuid" NOT NULL,
    "input" "jsonb" NOT NULL,
    "output" "jsonb",
    "finished_at" timestamp with time zone,
    "step" "public"."StreamAIStep" NOT NULL,
    "error_message" "text"
);


ALTER TABLE "public"."StreamAIRunStep" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."StreamAISellRunContext" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "sell" "uuid" NOT NULL,
    "run" "uuid" NOT NULL
);


ALTER TABLE "public"."StreamAISellRunContext" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Config"
    ADD CONSTRAINT "Config_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."StreamAIMenuRunContext"
    ADD CONSTRAINT "MenuProcessState_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Menu"
    ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Sell"
    ADD CONSTRAINT "Sell_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."StreamAIRunStep"
    ADD CONSTRAINT "StreamAIHistory_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."StreamAIRun"
    ADD CONSTRAINT "StreamAIProcessState_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."StreamAISellRunContext"
    ADD CONSTRAINT "StreamAISellState_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."File"
    ADD CONSTRAINT "File_file_bucket_file_path_fkey" FOREIGN KEY ("file_bucket", "file_path") REFERENCES "storage"."objects"("bucket_id", "name") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."StreamAIMenuRunContext"
    ADD CONSTRAINT "MenuProcessState_menu_fkey" FOREIGN KEY ("menu") REFERENCES "public"."Menu"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Menu"
    ADD CONSTRAINT "Menu_file_fkey" FOREIGN KEY ("file") REFERENCES "public"."File"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Menu"
    ADD CONSTRAINT "Menu_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Sell"
    ADD CONSTRAINT "Sell_file_fkey" FOREIGN KEY ("file") REFERENCES "public"."File"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Sell"
    ADD CONSTRAINT "Sell_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."StreamAIRunStep"
    ADD CONSTRAINT "StreamAIHistory_state_fkey" FOREIGN KEY ("run") REFERENCES "public"."StreamAIRun"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."StreamAIMenuRunContext"
    ADD CONSTRAINT "StreamAIMenuState_state_fkey" FOREIGN KEY ("run") REFERENCES "public"."StreamAIRun"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."StreamAISellRunContext"
    ADD CONSTRAINT "StreamAISellState_sell_fkey" FOREIGN KEY ("sell") REFERENCES "public"."Sell"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."StreamAISellRunContext"
    ADD CONSTRAINT "StreamAISellState_state_fkey" FOREIGN KEY ("run") REFERENCES "public"."StreamAIRun"("id") ON DELETE CASCADE;



ALTER TABLE "public"."Config" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."File" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Menu" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Sell" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."StreamAIMenuRunContext" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."StreamAIRun" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."StreamAIRunStep" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."StreamAISellRunContext" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";









































































































































































































GRANT ALL ON TABLE "public"."Config" TO "anon";
GRANT ALL ON TABLE "public"."Config" TO "authenticated";
GRANT ALL ON TABLE "public"."Config" TO "service_role";



GRANT ALL ON TABLE "public"."File" TO "anon";
GRANT ALL ON TABLE "public"."File" TO "authenticated";
GRANT ALL ON TABLE "public"."File" TO "service_role";



GRANT ALL ON TABLE "public"."Menu" TO "anon";
GRANT ALL ON TABLE "public"."Menu" TO "authenticated";
GRANT ALL ON TABLE "public"."Menu" TO "service_role";



GRANT ALL ON TABLE "public"."Sell" TO "anon";
GRANT ALL ON TABLE "public"."Sell" TO "authenticated";
GRANT ALL ON TABLE "public"."Sell" TO "service_role";



GRANT ALL ON TABLE "public"."StreamAIMenuRunContext" TO "anon";
GRANT ALL ON TABLE "public"."StreamAIMenuRunContext" TO "authenticated";
GRANT ALL ON TABLE "public"."StreamAIMenuRunContext" TO "service_role";



GRANT ALL ON TABLE "public"."StreamAIRun" TO "anon";
GRANT ALL ON TABLE "public"."StreamAIRun" TO "authenticated";
GRANT ALL ON TABLE "public"."StreamAIRun" TO "service_role";



GRANT ALL ON TABLE "public"."StreamAIRunStep" TO "anon";
GRANT ALL ON TABLE "public"."StreamAIRunStep" TO "authenticated";
GRANT ALL ON TABLE "public"."StreamAIRunStep" TO "service_role";



GRANT ALL ON TABLE "public"."StreamAISellRunContext" TO "anon";
GRANT ALL ON TABLE "public"."StreamAISellRunContext" TO "authenticated";
GRANT ALL ON TABLE "public"."StreamAISellRunContext" TO "service_role";



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
