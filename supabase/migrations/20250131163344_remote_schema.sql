set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_stream_ai_menu_context(menu uuid)
 RETURNS TABLE(run_id uuid, context_id uuid)
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_run_id uuid;
BEGIN
    -- Create a new run and get the generated UUID
    new_run_id := create_stream_ai_run('menu');

    -- Insert into stream_ai_menu_run_contexts and get the context ID
    INSERT INTO public."stream_ai_menu_run_contexts" (menu, run)
    VALUES (menu, new_run_id)
    RETURNING id INTO context_id;

    -- Return both the run ID and the context ID
    RETURN QUERY SELECT new_run_id, context_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_stream_ai_run(type stream_ai_type)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_id uuid;
BEGIN
    INSERT INTO public."stream_ai_runs" (type)
    VALUES (type)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_create_stream_ai_menu_context()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check if the operation is an insert or update
    IF (TG_OP = 'INSERT' AND NEW.file_path IS NOT NULL) OR 
       (TG_OP = 'UPDATE' AND NEW.file_path IS NOT NULL AND NEW.file_path <> OLD.file_path) THEN
        -- Call the create_stream_ai_menu_context function with the menu UUID
        PERFORM create_stream_ai_menu_context(NEW.id);
    END IF;

    RETURN NEW; -- Return the new record
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_post_api_call()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    api_url text;
BEGIN
    -- Construct the API URL with the specified UUID from the run field
    api_url := 'http://host.docker.internal:8000/stream-ai/' || NEW.run || '/process';

    -- Make the POST request to the API
    PERFORM net.http_post(
        url:=api_url,
        body:='{}'::jsonb
    );

    RETURN NEW; -- Return the new record
END;
$function$
;

create policy "Enable users to insert only their own data only"
on "public"."stream_ai_menu_run_contexts"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = ( SELECT get_run_owner(stream_ai_menu_run_contexts.run) AS get_run_owner)));


CREATE TRIGGER create_stream_ai_menu_trigger AFTER INSERT OR UPDATE ON public.menus FOR EACH ROW EXECUTE FUNCTION trigger_create_stream_ai_menu_context();

CREATE TRIGGER post_api_call_trigger AFTER INSERT ON public.stream_ai_menu_run_contexts FOR EACH ROW EXECUTE FUNCTION trigger_post_api_call();


