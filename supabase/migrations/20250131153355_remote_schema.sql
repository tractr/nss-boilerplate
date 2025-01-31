drop policy "Allow users to read their own menu run context" on "public"."stream_ai_menu_run_context";

drop policy "Enable insert for authenticated users only" on "public"."stream_ai_run";

drop policy "Enable users to view their own data only" on "public"."stream_ai_run";

drop policy "Allow users to read their own run steps" on "public"."stream_ai_run_step";

drop policy "Enable insert for users based on run owner" on "public"."stream_ai_run_step";

drop policy "Enable users to view their own data only" on "public"."stream_ai_run_step";

revoke delete on table "public"."stream_ai_menu_run_context" from "anon";

revoke insert on table "public"."stream_ai_menu_run_context" from "anon";

revoke references on table "public"."stream_ai_menu_run_context" from "anon";

revoke select on table "public"."stream_ai_menu_run_context" from "anon";

revoke trigger on table "public"."stream_ai_menu_run_context" from "anon";

revoke truncate on table "public"."stream_ai_menu_run_context" from "anon";

revoke update on table "public"."stream_ai_menu_run_context" from "anon";

revoke delete on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke insert on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke references on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke select on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke trigger on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke truncate on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke update on table "public"."stream_ai_menu_run_context" from "authenticated";

revoke delete on table "public"."stream_ai_menu_run_context" from "service_role";

revoke insert on table "public"."stream_ai_menu_run_context" from "service_role";

revoke references on table "public"."stream_ai_menu_run_context" from "service_role";

revoke select on table "public"."stream_ai_menu_run_context" from "service_role";

revoke trigger on table "public"."stream_ai_menu_run_context" from "service_role";

revoke truncate on table "public"."stream_ai_menu_run_context" from "service_role";

revoke update on table "public"."stream_ai_menu_run_context" from "service_role";

revoke delete on table "public"."stream_ai_run" from "anon";

revoke insert on table "public"."stream_ai_run" from "anon";

revoke references on table "public"."stream_ai_run" from "anon";

revoke select on table "public"."stream_ai_run" from "anon";

revoke trigger on table "public"."stream_ai_run" from "anon";

revoke truncate on table "public"."stream_ai_run" from "anon";

revoke update on table "public"."stream_ai_run" from "anon";

revoke delete on table "public"."stream_ai_run" from "authenticated";

revoke insert on table "public"."stream_ai_run" from "authenticated";

revoke references on table "public"."stream_ai_run" from "authenticated";

revoke select on table "public"."stream_ai_run" from "authenticated";

revoke trigger on table "public"."stream_ai_run" from "authenticated";

revoke truncate on table "public"."stream_ai_run" from "authenticated";

revoke update on table "public"."stream_ai_run" from "authenticated";

revoke delete on table "public"."stream_ai_run" from "service_role";

revoke insert on table "public"."stream_ai_run" from "service_role";

revoke references on table "public"."stream_ai_run" from "service_role";

revoke select on table "public"."stream_ai_run" from "service_role";

revoke trigger on table "public"."stream_ai_run" from "service_role";

revoke truncate on table "public"."stream_ai_run" from "service_role";

revoke update on table "public"."stream_ai_run" from "service_role";

revoke delete on table "public"."stream_ai_run_step" from "anon";

revoke insert on table "public"."stream_ai_run_step" from "anon";

revoke references on table "public"."stream_ai_run_step" from "anon";

revoke select on table "public"."stream_ai_run_step" from "anon";

revoke trigger on table "public"."stream_ai_run_step" from "anon";

revoke truncate on table "public"."stream_ai_run_step" from "anon";

revoke update on table "public"."stream_ai_run_step" from "anon";

revoke delete on table "public"."stream_ai_run_step" from "authenticated";

revoke insert on table "public"."stream_ai_run_step" from "authenticated";

revoke references on table "public"."stream_ai_run_step" from "authenticated";

revoke select on table "public"."stream_ai_run_step" from "authenticated";

revoke trigger on table "public"."stream_ai_run_step" from "authenticated";

revoke truncate on table "public"."stream_ai_run_step" from "authenticated";

revoke update on table "public"."stream_ai_run_step" from "authenticated";

revoke delete on table "public"."stream_ai_run_step" from "service_role";

revoke insert on table "public"."stream_ai_run_step" from "service_role";

revoke references on table "public"."stream_ai_run_step" from "service_role";

revoke select on table "public"."stream_ai_run_step" from "service_role";

revoke trigger on table "public"."stream_ai_run_step" from "service_role";

revoke truncate on table "public"."stream_ai_run_step" from "service_role";

revoke update on table "public"."stream_ai_run_step" from "service_role";

revoke delete on table "public"."stream_ai_sell_run_context" from "anon";

revoke insert on table "public"."stream_ai_sell_run_context" from "anon";

revoke references on table "public"."stream_ai_sell_run_context" from "anon";

revoke select on table "public"."stream_ai_sell_run_context" from "anon";

revoke trigger on table "public"."stream_ai_sell_run_context" from "anon";

revoke truncate on table "public"."stream_ai_sell_run_context" from "anon";

revoke update on table "public"."stream_ai_sell_run_context" from "anon";

revoke delete on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke insert on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke references on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke select on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke trigger on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke truncate on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke update on table "public"."stream_ai_sell_run_context" from "authenticated";

revoke delete on table "public"."stream_ai_sell_run_context" from "service_role";

revoke insert on table "public"."stream_ai_sell_run_context" from "service_role";

revoke references on table "public"."stream_ai_sell_run_context" from "service_role";

revoke select on table "public"."stream_ai_sell_run_context" from "service_role";

revoke trigger on table "public"."stream_ai_sell_run_context" from "service_role";

revoke truncate on table "public"."stream_ai_sell_run_context" from "service_role";

revoke update on table "public"."stream_ai_sell_run_context" from "service_role";

alter table "public"."stream_ai_menu_run_context" drop constraint "stream_ai_menu_run_context_menu_fkey";

alter table "public"."stream_ai_menu_run_context" drop constraint "stream_ai_menu_run_context_run_fkey";

alter table "public"."stream_ai_run_step" drop constraint "stream_ai_run_step_run_fkey";

alter table "public"."stream_ai_sell_run_context" drop constraint "stream_ai_sell_run_context_run_fkey";

alter table "public"."stream_ai_sell_run_context" drop constraint "stream_ai_sell_run_context_sell_fkey";

alter table "public"."stream_ai_menu_run_context" drop constraint "stream_ai_menu_run_context_pkey";

alter table "public"."stream_ai_run" drop constraint "stream_ai_run_pkey";

alter table "public"."stream_ai_run_step" drop constraint "stream_ai_run_step_pkey";

alter table "public"."stream_ai_sell_run_context" drop constraint "stream_ai_sell_run_context_pkey";

drop index if exists "public"."stream_ai_sell_run_context_pkey";

drop index if exists "public"."stream_ai_menu_run_context_pkey";

drop index if exists "public"."stream_ai_run_pkey";

drop index if exists "public"."stream_ai_run_step_pkey";

drop table "public"."stream_ai_menu_run_context";

drop table "public"."stream_ai_run";

drop table "public"."stream_ai_run_step";

drop table "public"."stream_ai_sell_run_context";

create table "public"."stream_ai_menu_run_contexts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "menu" uuid not null,
    "run" uuid not null
);


alter table "public"."stream_ai_menu_run_contexts" enable row level security;

create table "public"."stream_ai_run_steps" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "run" uuid not null,
    "input" jsonb not null,
    "output" jsonb,
    "finished_at" timestamp with time zone,
    "step" stream_ai_step not null,
    "error_message" text,
    "status" stream_ai_process_status not null default 'created'::stream_ai_process_status
);


alter table "public"."stream_ai_run_steps" enable row level security;

create table "public"."stream_ai_runs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "status" stream_ai_process_status not null default 'created'::stream_ai_process_status,
    "error_message" text,
    "current_step" stream_ai_step,
    "type" stream_ai_type not null,
    "owner" uuid not null default auth.uid()
);


alter table "public"."stream_ai_runs" enable row level security;

CREATE UNIQUE INDEX stream_ai_menu_run_context_pkey ON public.stream_ai_menu_run_contexts USING btree (id);

CREATE UNIQUE INDEX stream_ai_run_pkey ON public.stream_ai_runs USING btree (id);

CREATE UNIQUE INDEX stream_ai_run_step_pkey ON public.stream_ai_run_steps USING btree (id);

alter table "public"."stream_ai_menu_run_contexts" add constraint "stream_ai_menu_run_context_pkey" PRIMARY KEY using index "stream_ai_menu_run_context_pkey";

alter table "public"."stream_ai_run_steps" add constraint "stream_ai_run_step_pkey" PRIMARY KEY using index "stream_ai_run_step_pkey";

alter table "public"."stream_ai_runs" add constraint "stream_ai_run_pkey" PRIMARY KEY using index "stream_ai_run_pkey";

alter table "public"."stream_ai_menu_run_contexts" add constraint "stream_ai_menu_run_context_menu_fkey" FOREIGN KEY (menu) REFERENCES menus(id) ON DELETE CASCADE not valid;

alter table "public"."stream_ai_menu_run_contexts" validate constraint "stream_ai_menu_run_context_menu_fkey";

alter table "public"."stream_ai_menu_run_contexts" add constraint "stream_ai_menu_run_context_run_fkey" FOREIGN KEY (run) REFERENCES stream_ai_runs(id) ON DELETE CASCADE not valid;

alter table "public"."stream_ai_menu_run_contexts" validate constraint "stream_ai_menu_run_context_run_fkey";

alter table "public"."stream_ai_run_steps" add constraint "stream_ai_run_step_run_fkey" FOREIGN KEY (run) REFERENCES stream_ai_runs(id) ON DELETE CASCADE not valid;

alter table "public"."stream_ai_run_steps" validate constraint "stream_ai_run_step_run_fkey";

grant delete on table "public"."stream_ai_menu_run_contexts" to "anon";

grant insert on table "public"."stream_ai_menu_run_contexts" to "anon";

grant references on table "public"."stream_ai_menu_run_contexts" to "anon";

grant select on table "public"."stream_ai_menu_run_contexts" to "anon";

grant trigger on table "public"."stream_ai_menu_run_contexts" to "anon";

grant truncate on table "public"."stream_ai_menu_run_contexts" to "anon";

grant update on table "public"."stream_ai_menu_run_contexts" to "anon";

grant delete on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant insert on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant references on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant select on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant trigger on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant truncate on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant update on table "public"."stream_ai_menu_run_contexts" to "authenticated";

grant delete on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant insert on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant references on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant select on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant trigger on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant truncate on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant update on table "public"."stream_ai_menu_run_contexts" to "service_role";

grant delete on table "public"."stream_ai_run_steps" to "anon";

grant insert on table "public"."stream_ai_run_steps" to "anon";

grant references on table "public"."stream_ai_run_steps" to "anon";

grant select on table "public"."stream_ai_run_steps" to "anon";

grant trigger on table "public"."stream_ai_run_steps" to "anon";

grant truncate on table "public"."stream_ai_run_steps" to "anon";

grant update on table "public"."stream_ai_run_steps" to "anon";

grant delete on table "public"."stream_ai_run_steps" to "authenticated";

grant insert on table "public"."stream_ai_run_steps" to "authenticated";

grant references on table "public"."stream_ai_run_steps" to "authenticated";

grant select on table "public"."stream_ai_run_steps" to "authenticated";

grant trigger on table "public"."stream_ai_run_steps" to "authenticated";

grant truncate on table "public"."stream_ai_run_steps" to "authenticated";

grant update on table "public"."stream_ai_run_steps" to "authenticated";

grant delete on table "public"."stream_ai_run_steps" to "service_role";

grant insert on table "public"."stream_ai_run_steps" to "service_role";

grant references on table "public"."stream_ai_run_steps" to "service_role";

grant select on table "public"."stream_ai_run_steps" to "service_role";

grant trigger on table "public"."stream_ai_run_steps" to "service_role";

grant truncate on table "public"."stream_ai_run_steps" to "service_role";

grant update on table "public"."stream_ai_run_steps" to "service_role";

grant delete on table "public"."stream_ai_runs" to "anon";

grant insert on table "public"."stream_ai_runs" to "anon";

grant references on table "public"."stream_ai_runs" to "anon";

grant select on table "public"."stream_ai_runs" to "anon";

grant trigger on table "public"."stream_ai_runs" to "anon";

grant truncate on table "public"."stream_ai_runs" to "anon";

grant update on table "public"."stream_ai_runs" to "anon";

grant delete on table "public"."stream_ai_runs" to "authenticated";

grant insert on table "public"."stream_ai_runs" to "authenticated";

grant references on table "public"."stream_ai_runs" to "authenticated";

grant select on table "public"."stream_ai_runs" to "authenticated";

grant trigger on table "public"."stream_ai_runs" to "authenticated";

grant truncate on table "public"."stream_ai_runs" to "authenticated";

grant update on table "public"."stream_ai_runs" to "authenticated";

grant delete on table "public"."stream_ai_runs" to "service_role";

grant insert on table "public"."stream_ai_runs" to "service_role";

grant references on table "public"."stream_ai_runs" to "service_role";

grant select on table "public"."stream_ai_runs" to "service_role";

grant trigger on table "public"."stream_ai_runs" to "service_role";

grant truncate on table "public"."stream_ai_runs" to "service_role";

grant update on table "public"."stream_ai_runs" to "service_role";

create policy "Allow users to read their own menu run context"
on "public"."stream_ai_menu_run_contexts"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM menus
  WHERE ((menus.id = stream_ai_menu_run_contexts.menu) AND (menus.owner = auth.uid())))));


create policy "Allow users to read their own run steps"
on "public"."stream_ai_run_steps"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM stream_ai_runs
  WHERE ((stream_ai_runs.id = stream_ai_run_steps.run) AND (stream_ai_runs.owner = auth.uid())))));


create policy "Enable insert for users based on run owner"
on "public"."stream_ai_run_steps"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = ( SELECT get_run_owner(stream_ai_run_steps.run) AS get_run_owner)));


create policy "Enable users to view their own data only"
on "public"."stream_ai_run_steps"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = ( SELECT get_run_owner(stream_ai_run_steps.run) AS get_run_owner)));


create policy "Enable insert for authenticated users only"
on "public"."stream_ai_runs"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable users to view their own data only"
on "public"."stream_ai_runs"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = owner));



