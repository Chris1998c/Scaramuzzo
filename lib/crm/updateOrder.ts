import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isValidOrderStatus, type OrderStatus } from "@/lib/crm/orderTypes";

export type UpdateOrderInput = {
  status: OrderStatus;
  trackingCode?: string;
  trackingUrl?: string;
  internalNotes?: string;
};

export async function updateOrderById(
  orderId: string,
  input: UpdateOrderInput
): Promise<void> {
  if (!isValidOrderStatus(input.status)) {
    throw new Error("ORDER_INVALID_STATUS");
  }

  const supabase = getSupabaseAdmin();

  const { data: existing, error: existingError } = await supabase
    .from("orders")
    .select("shipped_at, delivered_at")
    .eq("id", orderId)
    .maybeSingle();

  if (existingError) {
    throw new Error(`ORDER_LOOKUP_FAILED: ${existingError.message}`);
  }

  if (!existing) {
    throw new Error("ORDER_NOT_FOUND");
  }

  const payload: Record<string, unknown> = {
    status: input.status,
    tracking_code: input.trackingCode?.trim() || null,
    tracking_url: input.trackingUrl?.trim() || null,
    internal_notes: input.internalNotes?.trim() || null,
  };

  if (input.status === "shipped" && !existing.shipped_at) {
    payload.shipped_at = new Date().toISOString();
  }

  if (input.status === "delivered" && !existing.delivered_at) {
    payload.delivered_at = new Date().toISOString();
  }

  const { error } = await supabase.from("orders").update(payload).eq("id", orderId);

  if (error) {
    throw new Error(`ORDER_UPDATE_FAILED: ${error.message}`);
  }
}
