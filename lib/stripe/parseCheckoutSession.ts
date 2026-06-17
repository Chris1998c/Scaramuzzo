import Stripe from "stripe";
import { productTranslations } from "@/app/products/data";
import type { OrderItem } from "@/lib/email/sendOrderEmail";

export type ParsedOrder = {
  orderId: string;
  orderRef: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  billingAddress?: string;
  shippingAddress?: string;
};

const SHIPPING_LABELS = new Set(["Spedizione", "Shipping"]);

function formatAddress(
  address: Stripe.Address | null | undefined,
  name?: string | null
): string | undefined {
  if (!address) return undefined;

  const parts = [
    name,
    [address.line1, address.line2].filter(Boolean).join(", "),
    [address.postal_code, address.city, address.state].filter(Boolean).join(" "),
    address.country,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join("\n") : undefined;
}

function resolveImage(catalogId: string | undefined): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.scaramuzzo.green";
  const fallback = `${siteUrl}/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp`;

  if (!catalogId) return fallback;

  const catalogProduct = productTranslations.it.products.find((p) => p.id === catalogId);
  if (!catalogProduct?.image) return fallback;

  return catalogProduct.image.startsWith("http")
    ? catalogProduct.image
    : `${siteUrl}${catalogProduct.image}`;
}

function lineItemName(lineItem: Stripe.LineItem): string {
  if (lineItem.description) return lineItem.description;

  const product = lineItem.price?.product;
  if (product && typeof product === "object" && "name" in product && product.name) {
    return product.name;
  }

  return "Prodotto";
}

function catalogIdFromLineItem(lineItem: Stripe.LineItem): string | undefined {
  const product = lineItem.price?.product;
  if (product && typeof product === "object" && "metadata" in product) {
    const id = product.metadata?.catalog_id;
    if (typeof id === "string" && id.length > 0) return id;
  }
  return undefined;
}

function shippingDetailsFromSession(session: Stripe.Checkout.Session) {
  const extended = session as Stripe.Checkout.Session & {
    shipping_details?: {
      name?: string | null;
      address?: Stripe.Address | null;
    } | null;
  };

  return extended.shipping_details ?? null;
}

export async function parseCheckoutSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<ParsedOrder> {
  const lineItemsRes = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  const items: OrderItem[] = [];
  let productsSubtotalCents = 0;

  for (const lineItem of lineItemsRes.data) {
    const name = lineItemName(lineItem);
    if (SHIPPING_LABELS.has(name)) continue;

    const quantity = lineItem.quantity ?? 1;
    const lineTotalCents = lineItem.amount_total ?? 0;
    productsSubtotalCents += lineTotalCents;

    const catalogId = catalogIdFromLineItem(lineItem);

    items.push({
      id: catalogId ?? lineItem.id,
      name,
      price: quantity > 0 ? lineTotalCents / 100 / quantity : 0,
      quantity,
      image: resolveImage(catalogId),
    });
  }

  const total = (session.amount_total ?? 0) / 100;
  const discount = (session.total_details?.amount_discount ?? 0) / 100;
  const shipping = (session.total_details?.amount_shipping ?? 0) / 100;
  const subtotal = productsSubtotalCents / 100;

  const shippingDetails = shippingDetailsFromSession(session);

  return {
    orderId: session.id,
    orderRef: session.metadata?.order_ref ?? session.id,
    customerEmail: session.customer_details?.email ?? "",
    items,
    subtotal,
    shipping,
    discount,
    total,
    billingAddress: formatAddress(
      session.customer_details?.address,
      session.customer_details?.name
    ),
    shippingAddress: formatAddress(
      shippingDetails?.address,
      shippingDetails?.name ?? session.customer_details?.name
    ),
  };
}
