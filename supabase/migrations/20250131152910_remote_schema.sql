revoke delete on table "public"."config" from "anon";

revoke insert on table "public"."config" from "anon";

revoke references on table "public"."config" from "anon";

revoke select on table "public"."config" from "anon";

revoke trigger on table "public"."config" from "anon";

revoke truncate on table "public"."config" from "anon";

revoke update on table "public"."config" from "anon";

revoke delete on table "public"."config" from "authenticated";

revoke insert on table "public"."config" from "authenticated";

revoke references on table "public"."config" from "authenticated";

revoke select on table "public"."config" from "authenticated";

revoke trigger on table "public"."config" from "authenticated";

revoke truncate on table "public"."config" from "authenticated";

revoke update on table "public"."config" from "authenticated";

revoke delete on table "public"."config" from "service_role";

revoke insert on table "public"."config" from "service_role";

revoke references on table "public"."config" from "service_role";

revoke select on table "public"."config" from "service_role";

revoke trigger on table "public"."config" from "service_role";

revoke truncate on table "public"."config" from "service_role";

revoke update on table "public"."config" from "service_role";

revoke delete on table "public"."file" from "anon";

revoke insert on table "public"."file" from "anon";

revoke references on table "public"."file" from "anon";

revoke select on table "public"."file" from "anon";

revoke trigger on table "public"."file" from "anon";

revoke truncate on table "public"."file" from "anon";

revoke update on table "public"."file" from "anon";

revoke delete on table "public"."file" from "authenticated";

revoke insert on table "public"."file" from "authenticated";

revoke references on table "public"."file" from "authenticated";

revoke select on table "public"."file" from "authenticated";

revoke trigger on table "public"."file" from "authenticated";

revoke truncate on table "public"."file" from "authenticated";

revoke update on table "public"."file" from "authenticated";

revoke delete on table "public"."file" from "service_role";

revoke insert on table "public"."file" from "service_role";

revoke references on table "public"."file" from "service_role";

revoke select on table "public"."file" from "service_role";

revoke trigger on table "public"."file" from "service_role";

revoke truncate on table "public"."file" from "service_role";

revoke update on table "public"."file" from "service_role";

revoke delete on table "public"."menu" from "anon";

revoke insert on table "public"."menu" from "anon";

revoke references on table "public"."menu" from "anon";

revoke select on table "public"."menu" from "anon";

revoke trigger on table "public"."menu" from "anon";

revoke truncate on table "public"."menu" from "anon";

revoke update on table "public"."menu" from "anon";

revoke delete on table "public"."menu" from "authenticated";

revoke insert on table "public"."menu" from "authenticated";

revoke references on table "public"."menu" from "authenticated";

revoke select on table "public"."menu" from "authenticated";

revoke trigger on table "public"."menu" from "authenticated";

revoke truncate on table "public"."menu" from "authenticated";

revoke update on table "public"."menu" from "authenticated";

revoke delete on table "public"."menu" from "service_role";

revoke insert on table "public"."menu" from "service_role";

revoke references on table "public"."menu" from "service_role";

revoke select on table "public"."menu" from "service_role";

revoke trigger on table "public"."menu" from "service_role";

revoke truncate on table "public"."menu" from "service_role";

revoke update on table "public"."menu" from "service_role";

revoke delete on table "public"."sell" from "anon";

revoke insert on table "public"."sell" from "anon";

revoke references on table "public"."sell" from "anon";

revoke select on table "public"."sell" from "anon";

revoke trigger on table "public"."sell" from "anon";

revoke truncate on table "public"."sell" from "anon";

revoke update on table "public"."sell" from "anon";

revoke delete on table "public"."sell" from "authenticated";

revoke insert on table "public"."sell" from "authenticated";

revoke references on table "public"."sell" from "authenticated";

revoke select on table "public"."sell" from "authenticated";

revoke trigger on table "public"."sell" from "authenticated";

revoke truncate on table "public"."sell" from "authenticated";

revoke update on table "public"."sell" from "authenticated";

revoke delete on table "public"."sell" from "service_role";

revoke insert on table "public"."sell" from "service_role";

revoke references on table "public"."sell" from "service_role";

revoke select on table "public"."sell" from "service_role";

revoke trigger on table "public"."sell" from "service_role";

revoke truncate on table "public"."sell" from "service_role";

revoke update on table "public"."sell" from "service_role";

alter table "public"."file" drop constraint "file_file_bucket_file_path_fkey";

alter table "public"."menu" drop constraint "menu_file_fkey";

alter table "public"."menu" drop constraint "menu_owner_fkey";

alter table "public"."sell" drop constraint "sell_file_fkey";

alter table "public"."sell" drop constraint "sell_owner_fkey";

alter table "public"."stream_ai_menu_run_context" drop constraint "stream_ai_menu_run_context_menu_fkey";

alter table "public"."stream_ai_sell_run_context" drop constraint "stream_ai_sell_run_context_sell_fkey";

alter table "public"."config" drop constraint "config_pkey";

alter table "public"."file" drop constraint "file_pkey";

alter table "public"."menu" drop constraint "menu_pkey";

alter table "public"."sell" drop constraint "sell_pkey";

drop index if exists "public"."file_pkey";

drop index if exists "public"."config_pkey";

drop index if exists "public"."menu_pkey";

drop index if exists "public"."sell_pkey";

drop table "public"."config";

drop table "public"."file";

drop table "public"."menu";

drop table "public"."sell";

alter type "public"."stream_ai_type" rename to "stream_ai_type__old_version_to_be_dropped";

create type "public"."stream_ai_type" as enum ('menu', 'sell');

create table "public"."configs" (
    "key" text not null,
    "value" text not null
);


alter table "public"."configs" enable row level security;

create table "public"."menus" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_date" timestamp with time zone,
    "label" text not null,
    "version" integer not null default 1,
    "owner" uuid not null default auth.uid(),
    "file_bucket" text default ''::text,
    "file_path" text default ''::text
);


alter table "public"."menus" enable row level security;

create table "public"."sales" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_date" timestamp with time zone,
    "label" text not null,
    "version" integer not null default 1,
    "owner" uuid not null,
    "file_bucket" text,
    "file_path" text
);


alter table "public"."sales" enable row level security;

alter table "public"."stream_ai_run" alter column type type "public"."stream_ai_type" using type::text::"public"."stream_ai_type";

drop type "public"."stream_ai_type__old_version_to_be_dropped";

alter table "public"."stream_ai_run_step" add column "status" stream_ai_process_status not null default 'created'::stream_ai_process_status;

CREATE UNIQUE INDEX config_pkey ON public.configs USING btree (key);

CREATE UNIQUE INDEX menu_pkey ON public.menus USING btree (id);

CREATE UNIQUE INDEX sell_pkey ON public.sales USING btree (id);

alter table "public"."configs" add constraint "config_pkey" PRIMARY KEY using index "config_pkey";

alter table "public"."menus" add constraint "menu_pkey" PRIMARY KEY using index "menu_pkey";

alter table "public"."sales" add constraint "sell_pkey" PRIMARY KEY using index "sell_pkey";

alter table "public"."menus" add constraint "menu_file_bucket_file_path_fkey" FOREIGN KEY (file_bucket, file_path) REFERENCES storage.objects(bucket_id, name) not valid;

alter table "public"."menus" validate constraint "menu_file_bucket_file_path_fkey";

alter table "public"."menus" add constraint "menu_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."menus" validate constraint "menu_owner_fkey";

alter table "public"."sales" add constraint "sell_file_bucket_file_path_fkey" FOREIGN KEY (file_bucket, file_path) REFERENCES storage.objects(bucket_id, name) not valid;

alter table "public"."sales" validate constraint "sell_file_bucket_file_path_fkey";

alter table "public"."sales" add constraint "sell_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."sales" validate constraint "sell_owner_fkey";

alter table "public"."stream_ai_menu_run_context" add constraint "stream_ai_menu_run_context_menu_fkey" FOREIGN KEY (menu) REFERENCES menus(id) ON DELETE CASCADE not valid;

alter table "public"."stream_ai_menu_run_context" validate constraint "stream_ai_menu_run_context_menu_fkey";

alter table "public"."stream_ai_sell_run_context" add constraint "stream_ai_sell_run_context_sell_fkey" FOREIGN KEY (sell) REFERENCES sales(id) ON DELETE CASCADE not valid;

alter table "public"."stream_ai_sell_run_context" validate constraint "stream_ai_sell_run_context_sell_fkey";

grant delete on table "public"."configs" to "anon";

grant insert on table "public"."configs" to "anon";

grant references on table "public"."configs" to "anon";

grant select on table "public"."configs" to "anon";

grant trigger on table "public"."configs" to "anon";

grant truncate on table "public"."configs" to "anon";

grant update on table "public"."configs" to "anon";

grant delete on table "public"."configs" to "authenticated";

grant insert on table "public"."configs" to "authenticated";

grant references on table "public"."configs" to "authenticated";

grant select on table "public"."configs" to "authenticated";

grant trigger on table "public"."configs" to "authenticated";

grant truncate on table "public"."configs" to "authenticated";

grant update on table "public"."configs" to "authenticated";

grant delete on table "public"."configs" to "service_role";

grant insert on table "public"."configs" to "service_role";

grant references on table "public"."configs" to "service_role";

grant select on table "public"."configs" to "service_role";

grant trigger on table "public"."configs" to "service_role";

grant truncate on table "public"."configs" to "service_role";

grant update on table "public"."configs" to "service_role";

grant delete on table "public"."menus" to "anon";

grant insert on table "public"."menus" to "anon";

grant references on table "public"."menus" to "anon";

grant select on table "public"."menus" to "anon";

grant trigger on table "public"."menus" to "anon";

grant truncate on table "public"."menus" to "anon";

grant update on table "public"."menus" to "anon";

grant delete on table "public"."menus" to "authenticated";

grant insert on table "public"."menus" to "authenticated";

grant references on table "public"."menus" to "authenticated";

grant select on table "public"."menus" to "authenticated";

grant trigger on table "public"."menus" to "authenticated";

grant truncate on table "public"."menus" to "authenticated";

grant update on table "public"."menus" to "authenticated";

grant delete on table "public"."menus" to "service_role";

grant insert on table "public"."menus" to "service_role";

grant references on table "public"."menus" to "service_role";

grant select on table "public"."menus" to "service_role";

grant trigger on table "public"."menus" to "service_role";

grant truncate on table "public"."menus" to "service_role";

grant update on table "public"."menus" to "service_role";

grant delete on table "public"."sales" to "anon";

grant insert on table "public"."sales" to "anon";

grant references on table "public"."sales" to "anon";

grant select on table "public"."sales" to "anon";

grant trigger on table "public"."sales" to "anon";

grant truncate on table "public"."sales" to "anon";

grant update on table "public"."sales" to "anon";

grant delete on table "public"."sales" to "authenticated";

grant insert on table "public"."sales" to "authenticated";

grant references on table "public"."sales" to "authenticated";

grant select on table "public"."sales" to "authenticated";

grant trigger on table "public"."sales" to "authenticated";

grant truncate on table "public"."sales" to "authenticated";

grant update on table "public"."sales" to "authenticated";

grant delete on table "public"."sales" to "service_role";

grant insert on table "public"."sales" to "service_role";

grant references on table "public"."sales" to "service_role";

grant select on table "public"."sales" to "service_role";

grant trigger on table "public"."sales" to "service_role";

grant truncate on table "public"."sales" to "service_role";

grant update on table "public"."sales" to "service_role";

create policy "Allow delete own menus"
on "public"."menus"
as permissive
for delete
to public
using ((auth.uid() = owner));


create policy "Allow insert own menu"
on "public"."menus"
as permissive
for insert
to public
with check ((auth.uid() = owner));


create policy "Allow select own menus"
on "public"."menus"
as permissive
for select
to public
using ((auth.uid() = owner));


create policy "Allow update own menus"
on "public"."menus"
as permissive
for update
to public
using ((auth.uid() = owner));


create policy "Allow users to read their own menu run context"
on "public"."stream_ai_menu_run_context"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM menus
  WHERE ((menus.id = stream_ai_menu_run_context.menu) AND (menus.owner = auth.uid())))));


create policy "Allow users to read their own run steps"
on "public"."stream_ai_run_step"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM stream_ai_run
  WHERE ((stream_ai_run.id = stream_ai_run_step.run) AND (stream_ai_run.owner = auth.uid())))));



