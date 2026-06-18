-- Grant service_role su schema e tabelle ordini (autosufficiente)

GRANT USAGE ON SCHEMA public TO service_role;

GRANT ALL PRIVILEGES ON TABLE public.orders TO service_role;
GRANT ALL PRIVILEGES ON TABLE public.order_items TO service_role;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO service_role;
