-- Scaramuzzo — ordini interni (Stripe → Supabase)

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
CREATE TABLE orders (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id        TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  order_ref                TEXT NOT NULL UNIQUE,
  source                   TEXT,
  customer_email           TEXT,
  currency                 TEXT NOT NULL DEFAULT 'eur',
  subtotal                 INTEGER NOT NULL DEFAULT 0,
  shipping                 INTEGER NOT NULL DEFAULT 0,
  discount                 INTEGER NOT NULL DEFAULT 0,
  total                    INTEGER NOT NULL DEFAULT 0,
  status                   TEXT NOT NULL DEFAULT 'paid' CHECK (
    status IN (
      'paid',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    )
  ),
  payment_status             TEXT,
  stripe_status              TEXT,
  shipping_name              TEXT,
  shipping_address           JSONB,
  billing_address            JSONB,
  tracking_code              TEXT,
  tracking_url               TEXT,
  internal_notes             TEXT,
  metadata                   JSONB NOT NULL DEFAULT '{}'::jsonb,
  paid_at                    TIMESTAMPTZ,
  shipped_at                 TIMESTAMPTZ,
  delivered_at               TIMESTAMPTZ,
  created_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                 TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX idx_orders_order_ref ON orders (order_ref);
CREATE INDEX idx_orders_status ON orders (status, created_at DESC);
CREATE INDEX idx_orders_customer_email ON orders (customer_email);

-- ---------------------------------------------------------------------------
-- order_items
-- line_item_id: chiave stabile per upsert idempotente (Stripe li_*, catalog:index, fallback)
-- ---------------------------------------------------------------------------
CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  line_item_id  TEXT NOT NULL,
  catalog_id    TEXT,
  name          TEXT NOT NULL,
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  unit_amount   INTEGER NOT NULL CHECK (unit_amount >= 0),
  total         INTEGER NOT NULL CHECK (total >= 0),
  metadata      JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (order_id, line_item_id)
);

CREATE INDEX idx_order_items_order_id ON order_items (order_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger (reuses set_updated_at from 001)
-- ---------------------------------------------------------------------------
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — no public policies
-- ---------------------------------------------------------------------------
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
