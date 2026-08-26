DROP POLICY IF EXISTS "Anyone can add a visitor" ON public.visitors;
DROP POLICY IF EXISTS "Anyone can update visitor progress" ON public.visitors;
DROP POLICY IF EXISTS "Anyone can view visitors" ON public.visitors;

REVOKE ALL ON public.visitors FROM anon;
REVOKE ALL ON public.visitors FROM authenticated;
GRANT ALL ON public.visitors TO service_role;

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;