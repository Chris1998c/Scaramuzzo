export const ORDER_STATUSES = [
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function isValidOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

export type OrderAddressJson = {
  name?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

export type OrderRow = {
  id: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  order_ref: string;
  source: string | null;
  customer_email: string | null;
  currency: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  payment_status: string | null;
  stripe_status: string | null;
  shipping_name: string | null;
  shipping_address: OrderAddressJson | null;
  billing_address: OrderAddressJson | null;
  tracking_code: string | null;
  tracking_url: string | null;
  internal_notes: string | null;
  metadata: Record<string, unknown>;
  paid_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  catalog_id: string | null;
  name: string;
  quantity: number;
  unit_amount: number;
  total: number;
  metadata: Record<string, unknown>;
  created_at: string;
};
