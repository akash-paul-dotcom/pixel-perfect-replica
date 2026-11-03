CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date,
  time_slot text NOT NULL,
  message text,
  consent boolean NOT NULL DEFAULT false,
  source text,
  utm jsonb NOT NULL DEFAULT '{}'::jsonb,
  ip_hash text,
  user_agent text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.booking_requests TO service_role;

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_booking_requests_created_at ON public.booking_requests (created_at DESC);
CREATE INDEX idx_booking_requests_ip_hash ON public.booking_requests (ip_hash, created_at);