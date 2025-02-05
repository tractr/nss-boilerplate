create table "public"."agribalyse" (
    "id" uuid not null default gen_random_uuid(),
    "Code AGB" text,
    "Code CIQUAL" text,
    "Groupe d'aliment" text,
    "Sous-groupe d'aliment" text,
    "Nom du Produit en Français" text,
    "LCI Name" text,
    "code saison" integer,
    "code avion" integer,
    "Livraison" text,
    "Approche emballage" text,
    "Préparation" text,
    "DQR - Note de qualité de la donnée" double precision,
    "Score unique EF 3.1" double precision,
    "Changement climatique" double precision,
    "Appauvrissement de la couche d'ozone" double precision,
    "Rayonnements ionisants" double precision,
    "Formation photochimique d'ozone" double precision,
    "Particules fines" double precision,
    "Effets toxicologiques non-cancérogènes" double precision,
    "Effets toxicologiques substances cancérogènes" double precision,
    "Acidification terrestre et eaux douces" double precision,
    "Eutrophisation eaux douces" double precision,
    "Eutrophisation marine" double precision,
    "Eutrophisation terrestre" double precision,
    "Écotoxicité pour écosystèmes aquatiques d'eau douce" double precision,
    "Utilisation du sol" double precision,
    "Épuisement des ressources eau" double precision,
    "Épuisement des ressources énergétiques" double precision,
    "Épuisement des ressources minéraux" double precision,
    "Changement climatique - émissions biogéniques" double precision,
    "Changement climatique - émissions fossiles" double precision,
    "Changement climatique - liées à l'affectation des sols" double precision
);


CREATE UNIQUE INDEX agribalyse_pkey ON public.agribalyse USING btree (id);

alter table "public"."agribalyse" add constraint "agribalyse_pkey" PRIMARY KEY using index "agribalyse_pkey";

grant delete on table "public"."agribalyse" to "anon";

grant insert on table "public"."agribalyse" to "anon";

grant references on table "public"."agribalyse" to "anon";

grant select on table "public"."agribalyse" to "anon";

grant trigger on table "public"."agribalyse" to "anon";

grant truncate on table "public"."agribalyse" to "anon";

grant update on table "public"."agribalyse" to "anon";

grant delete on table "public"."agribalyse" to "authenticated";

grant insert on table "public"."agribalyse" to "authenticated";

grant references on table "public"."agribalyse" to "authenticated";

grant select on table "public"."agribalyse" to "authenticated";

grant trigger on table "public"."agribalyse" to "authenticated";

grant truncate on table "public"."agribalyse" to "authenticated";

grant update on table "public"."agribalyse" to "authenticated";

grant delete on table "public"."agribalyse" to "service_role";

grant insert on table "public"."agribalyse" to "service_role";

grant references on table "public"."agribalyse" to "service_role";

grant select on table "public"."agribalyse" to "service_role";

grant trigger on table "public"."agribalyse" to "service_role";

grant truncate on table "public"."agribalyse" to "service_role";

grant update on table "public"."agribalyse" to "service_role";

create policy "allow users to update their own steps"
on "public"."stream_ai_run_steps"
as permissive
for update
to public
using (true)
with check ((( SELECT auth.uid() AS uid) = ( SELECT get_run_owner(stream_ai_run_steps.run) AS get_run_owner)));



