const PENDING_PURCHASE_KEY = "scaramuzzo-pending-purchase";
const PENDING_PURCHASE_TTL_MS = 2 * 60 * 60 * 1000;

export type PendingPurchase = {
  order_ref: string;
  value: number;
  item_count: number;
  created_at: number;
};

export function savePendingPurchase(
  data: Omit<PendingPurchase, "created_at">
): void {
  if (typeof window === "undefined") return;

  const payload: PendingPurchase = {
    ...data,
    created_at: Date.now(),
  };

  sessionStorage.setItem(PENDING_PURCHASE_KEY, JSON.stringify(payload));
}

export function readPendingPurchase(): PendingPurchase | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(PENDING_PURCHASE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PendingPurchase;
    if (
      typeof parsed.order_ref !== "string" ||
      typeof parsed.value !== "number" ||
      typeof parsed.item_count !== "number" ||
      typeof parsed.created_at !== "number"
    ) {
      return null;
    }

    if (Date.now() - parsed.created_at > PENDING_PURCHASE_TTL_MS) {
      sessionStorage.removeItem(PENDING_PURCHASE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingPurchase(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_PURCHASE_KEY);
}

/** Guard secondaria: prova che il checkout sia partito da questo browser. */
export function hasValidPendingPurchase(): boolean {
  return readPendingPurchase() !== null;
}

export function pendingOrderRefMatches(orderRef: string): boolean {
  const pending = readPendingPurchase();
  if (!pending?.order_ref) return false;
  return pending.order_ref === orderRef;
}

export function cartFingerprint(
  items: Array<{ id: string; qty: number }>
): string {
  return items
    .map((item) => `${item.id}:${item.qty}`)
    .sort()
    .join("|");
}
