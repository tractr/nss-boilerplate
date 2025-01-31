create policy "Give users authenticated access to folder 1xeu3kn_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'menu_files'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1xeu3kn_1"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'menu_files'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1xeu3kn_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'menu_files'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1xeu3kn_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'menu_files'::text) AND (auth.role() = 'authenticated'::text)));



