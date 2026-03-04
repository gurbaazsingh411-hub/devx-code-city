-- Items catalog (cosmetic building effects — all free in showcase mode)
create table items (
  id              text primary key,
  category        text not null,           -- 'effect' | 'structure' | 'identity'
  name            text not null,
  description     text,
  price_usd_cents int not null default 0,
  price_brl_cents int not null default 0,
  is_active       boolean default true,
  metadata        jsonb default '{}',
  created_at      timestamptz default now()
);

-- Developer customizations (config per item, e.g. color choice)
create table developer_customizations (
  id            uuid primary key default gen_random_uuid(),
  developer_id  bigint not null references developers(id),
  item_id       text not null references items(id),
  config        jsonb not null default '{}',
  updated_at    timestamptz default now(),
  unique (developer_id, item_id)
);

-- RLS
alter table items enable row level security;
alter table developer_customizations enable row level security;

create policy "Public read items" on items for select using (true);
create policy "Public read customizations" on developer_customizations for select using (true);

-- Seed: item catalog (all free for showcase)
insert into items (id, category, name, description, price_usd_cents, price_brl_cents, metadata) values
  ('neon_outline',    'effect',    'Neon Outline',    'Glowing outline on building edges',         0, 0, '{}'),
  ('particle_aura',   'effect',    'Particle Aura',   'Floating particles around the building',    0, 0, '{}'),
  ('spotlight',       'effect',    'Spotlight',        'Spotlight beam pointing to the sky',        0, 0, '{}'),
  ('rooftop_fire',    'effect',    'Rooftop Fire',    'Stylized flames on the rooftop',            0, 0, '{}'),
  ('helipad',         'structure', 'Helipad',         'Helicopter landing pad on top',             0, 0, '{}'),
  ('antenna_array',   'structure', 'Antenna Array',   'Multiple antennas on the rooftop',          0, 0, '{}'),
  ('rooftop_garden',  'structure', 'Rooftop Garden',  'Green rooftop with trees',                  0, 0, '{}'),
  ('spire',           'structure', 'Spire',           'Empire State-style spire on top',           0, 0, '{}'),
  ('custom_color',    'identity',  'Custom Color',    'Choose your building color',                0, 0, '{"default_color": "#c8e64a"}'),
  ('billboard',       'identity',  'Billboard',       'Logo or image on the building side',        0, 0, '{}'),
  ('flag',            'identity',  'Flag',            'Custom flag on the rooftop',                0, 0, '{}');
