import { trackEvent } from "./trackEvent";
import { trackEventOnce } from "./trackEventOnce";

const VIEW_CART_DEBOUNCE_MS = 1000;
export const ECOMMERCE_CURRENCY = "EUR";

export type EcommerceTrackingItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  category?: string;
};

export function getProductCategory(id: string): string {
  if (id.startsWith("shampoo")) return "shampoo";
  if (id.startsWith("maschera")) return "mask";
  if (id.startsWith("styling")) return "styling";
  if (["crema", "lozione"].some((key) => id.includes(key))) return "treatment";
  return "other";
}

export function sumCartQty(items: Array<{ qty: number }>): number {
  return items.reduce((acc, item) => acc + item.qty, 0);
}

export function mapCartItemsToTracking(
  items: Array<{ id: string; name: string; price: number; qty: number }>
): EcommerceTrackingItem[] {
  return items.map((item) => ({
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    quantity: item.qty,
    category: getProductCategory(item.id),
  }));
}

export type ViewItemInput = {
  itemId: string;
  itemName: string;
  price: number;
  category: string;
};

export function trackViewItem(input: ViewItemInput): void {
  trackEventOnce(`track-view-item-${input.itemId}`, "view_item", {
    item_id: input.itemId,
    item_name: input.itemName,
    price: input.price,
    category: input.category,
    currency: ECOMMERCE_CURRENCY,
    items: [
      {
        item_id: input.itemId,
        item_name: input.itemName,
        price: input.price,
        quantity: 1,
        category: input.category,
      },
    ],
  });
}

export type AddToCartInput = {
  itemId: string;
  itemName: string;
  price: number;
  quantity?: number;
  category?: string;
};

export function trackAddToCart(input: AddToCartInput): void {
  const quantity = input.quantity ?? 1;
  const category = input.category ?? getProductCategory(input.itemId);

  trackEvent("add_to_cart", {
    item_id: input.itemId,
    item_name: input.itemName,
    price: input.price,
    quantity,
    currency: ECOMMERCE_CURRENCY,
    items: [
      {
        item_id: input.itemId,
        item_name: input.itemName,
        price: input.price,
        quantity,
        category,
      },
    ],
  });
}

export type ViewCartInput = {
  itemCount: number;
  value: number;
  source: "drawer" | "page";
  items: EcommerceTrackingItem[];
};

function shouldTrackViewCart(source: ViewCartInput["source"]): boolean {
  if (typeof window === "undefined") return false;

  const key = `track-view-cart-last-${source}`;
  const last = sessionStorage.getItem(key);
  const now = Date.now();

  if (last && now - Number(last) < VIEW_CART_DEBOUNCE_MS) {
    return false;
  }

  sessionStorage.setItem(key, String(now));
  return true;
}

export function trackViewCart(input: ViewCartInput): void {
  if (input.itemCount <= 0) return;

  const payload = {
    item_count: input.itemCount,
    value: input.value,
    currency: ECOMMERCE_CURRENCY,
    items: input.items,
  };

  if (input.source === "page") {
    if (!shouldTrackViewCart("page")) return;
    trackEvent("view_cart", payload);
    return;
  }

  if (!shouldTrackViewCart("drawer")) return;

  trackEvent("view_cart", payload);
}

export type BeginCheckoutInput = {
  fingerprint: string;
  itemCount: number;
  value: number;
  items: EcommerceTrackingItem[];
};

export function trackBeginCheckout(input: BeginCheckoutInput): void {
  trackEventOnce(`track-begin-checkout-${input.fingerprint}`, "begin_checkout", {
    item_count: input.itemCount,
    value: input.value,
    currency: ECOMMERCE_CURRENCY,
    items: input.items,
  });
}

export type VerifiedPurchaseResponse = {
  order_ref: string;
  value: number;
  currency: string;
  item_count: number;
  items: EcommerceTrackingItem[];
};

export async function fetchVerifiedCheckoutSession(
  sessionId: string
): Promise<VerifiedPurchaseResponse | null> {
  const response = await fetch(
    `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`
  );

  if (!response.ok) return null;

  const data = (await response.json()) as VerifiedPurchaseResponse;

  if (
    typeof data.order_ref !== "string" ||
    typeof data.value !== "number" ||
    typeof data.currency !== "string" ||
    typeof data.item_count !== "number" ||
    !Array.isArray(data.items)
  ) {
    return null;
  }

  return data;
}

export type PurchaseInput = {
  storageKey: string;
  orderRef: string;
  value: number;
  itemCount: number;
  currency: string;
  items: EcommerceTrackingItem[];
};

export function trackPurchase(input: PurchaseInput): void {
  trackEventOnce(input.storageKey, "purchase", {
    order_ref: input.orderRef,
    value: input.value,
    item_count: input.itemCount,
    currency: input.currency,
    items: input.items,
  });
}
