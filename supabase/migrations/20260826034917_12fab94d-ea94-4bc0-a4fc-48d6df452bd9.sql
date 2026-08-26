CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  accuracy DOUBLE PRECISION,
  maps_url TEXT,
  device TEXT,
  browser TEXT,
  user_agent TEXT,
  unlocked_count INTEGER NOT NULL DEFAULT 0,
  total_cards INTEGER NOT NULL DEFAULT 52,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.visitors TO anon;
GRANT SELECT, INSERT, UPDATE ON public.visitors TO authenticated;
GRANT ALL ON public.visitors TO service_role;

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visitors" ON public.visitors FOR SELECT USING (true);
CREATE POLICY "Anyone can add a visitor" ON public.visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update visitor progress" ON public.visitors FOR UPDATE USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.visitors;