-- Example: enable the "pg_net" extension.
create extension pg_net;
-- Note: The extension creates its own schema/namespace named "net" to avoid naming conflicts.

-- Example: disable the "pg_net" extension
drop extension if exists pg_net;
drop schema net;


CREATE OR REPLACE FUNCTION create_stream_ai_menu(menu uuid)
RETURNS TABLE(run_id uuid, context_id uuid) AS $$
DECLARE
    new_run_id uuid;
BEGIN
    -- Create a new run and get the generated UUID
    new_run_id := create_stream_ai_run('menus');

    -- Insert into stream_ai_menu_run_context and get the context ID
    INSERT INTO public.stream_ai_menu_run_context (menu, run)
    VALUES (menu, new_run_id)
    RETURNING id INTO context_id;

    -- Return both the run ID and the context ID
    RETURN QUERY SELECT new_run_id, context_id;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;





CREATE OR REPLACE FUNCTION create_stream_ai_run(type public.stream_ai_type)
RETURNS uuid AS $$
DECLARE
    new_id uuid;
BEGIN
    INSERT INTO public.stream_ai_run (type, owner)
    VALUES (type, auth.uid())
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;




-- Create the trigger function
CREATE OR REPLACE FUNCTION trigger_create_stream_ai_menu()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the operation is an insert or update
    IF (TG_OP = 'INSERT' AND NEW.file IS NOT NULL) OR
       (TG_OP = 'UPDATE' AND NEW.file IS NOT NULL AND NEW.file <> OLD.file) THEN
        -- Call the create_stream_ai_menu function with the menu UUID
        PERFORM create_stream_ai_menu(NEW.id);
    END IF;

    RETURN NEW; -- Return the new record
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- Create the trigger on the Menu table
DROP TRIGGER IF EXISTS create_stream_ai_menu_trigger ON public."menu";
CREATE TRIGGER create_stream_ai_menu_trigger
AFTER INSERT OR UPDATE ON public.menu
FOR EACH ROW
EXECUTE FUNCTION trigger_create_stream_ai_menu();






-- Create the trigger function
CREATE OR REPLACE FUNCTION trigger_post_api_call()
RETURNS TRIGGER AS $$
DECLARE
    api_url text;
BEGIN
    -- Construct the API URL with the specified UUID from the run field
    api_url := 'http://host.docker.internal:8000/stream-ai/' || NEW.run || '/process';

    -- Make the POST request to the API using the correct schema
    PERFORM extensions.http_post(
        url:=api_url,
        body:='{}'::jsonb
    );

    RETURN NEW; -- Return the new record
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- Create the trigger on the stream_ai_menu_run_context table
DROP TRIGGER IF EXISTS post_api_call_trigger ON public.stream_ai_menu_run_context;
CREATE TRIGGER post_api_call_trigger
AFTER INSERT ON public.stream_ai_menu_run_context
FOR EACH ROW
EXECUTE FUNCTION trigger_post_api_call();





CREATE OR REPLACE FUNCTION get_run_owner(run uuid)
RETURNS uuid AS $$
DECLARE
    run_owner uuid;
BEGIN
    SELECT owner FROM public."stream_ai_run" WHERE id = run INTO run_owner;

    RETURN run_owner;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

SELECT * FROM get_run_owner('b2147c5b-777b-4c87-bbb1-eda92a98b8ed');