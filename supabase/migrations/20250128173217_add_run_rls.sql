alter table "public"."stream_ai_run" add column "owner" uuid not null default auth.uid();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_run_owner(run uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    run_owner uuid;
BEGIN
    SELECT owner FROM public."stream_ai_runs" WHERE id = run INTO run_owner;

    RETURN run_owner;
END;
$function$
;

create policy "Enable insert for authenticated users only"
on "public"."stream_ai_run"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable users to view their own data only"
on "public"."stream_ai_run"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = owner));


create policy "Enable insert for users based on run owner"
on "public"."stream_ai_run_step"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = ( SELECT get_run_owner(stream_ai_run_step.run) AS get_run_owner)));


create policy "Enable users to view their own data only"
on "public"."stream_ai_run_step"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = ( SELECT get_run_owner(stream_ai_run_step.run) AS get_run_owner)));



