-- Tighten RLS: customizations should NOT be world-readable.
-- All API routes use getSupabaseAdmin() (service role) so they bypass RLS.

-- developer_customizations: drop public read, allow only owner
drop policy "Public read customizations" on developer_customizations;

create policy "Owner reads own customizations" on developer_customizations
  for select using (
    auth.uid() is not null
    and developer_id in (
      select id from developers where claimed_by = auth.uid()
    )
  );
