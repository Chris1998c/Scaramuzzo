/** Spedizione e-commerce standard (non manual payment CRM). */
export const SHIPPING_FLAT_EUR = 4.99;
export const FREE_SHIPPING_THRESHOLD_EUR = 49;

export function getShippingEur(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD_EUR ? 0 : SHIPPING_FLAT_EUR;
}

export function shippingFlatCents(): number {
  return Math.round(SHIPPING_FLAT_EUR * 100);
}
