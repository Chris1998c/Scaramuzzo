import { getStripeClient } from "@/lib/stripe/client";
import { buildOrderRef } from "@/lib/stripe/buildOrderRef";
import { sanitizeAttributionForStripe } from "@/lib/tracking/attributionMetadata";
import type { ConsultationRow } from "@/lib/crm/fetchConsultations";

const MAX_DESCRIPTION = 200;
const MAX_AMOUNT = 50_000;
const MAX_SHIPPING = 1_000;
const MIN_AMOUNT_EUR = 0.5;
const MAX_EMAIL = 254;

const SHIPPING_COUNTRIES = ["IT", "FR", "DE", "ES", "PT", "BE", "NL", "AT"] as const;

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.scaramuzzo.green";
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasAtMostTwoDecimals(value: number): boolean {
  const cents = Math.round(value * 100);
  return Math.abs(value * 100 - cents) < 1e-6;
}

/** Converte euro in centesimi evitando errori di floating point comuni. */
export function eurosToCents(value: number): number {
  if (!hasAtMostTwoDecimals(value)) {
    throw new Error("Importo con più di 2 decimali.");
  }
  return Math.round(value * 100);
}

function validateEuroAmount(
  value: number,
  options: { min: number; max: number; label: string }
): string | null {
  if (!Number.isFinite(value)) {
    return `${options.label} non valido.`;
  }
  if (!hasAtMostTwoDecimals(value)) {
    return `${options.label}: massimo 2 decimali.`;
  }
  if (value < options.min) {
    return `${options.label} deve essere almeno € ${options.min.toFixed(2)}.`;
  }
  if (value > options.max) {
    return `${options.label} troppo elevato.`;
  }
  return null;
}

function attributionFromConsultationPayload(
  payload: Record<string, unknown>
): Partial<Record<string, string>> {
  const attribution = payload.attribution;
  if (!isPlainObject(attribution)) return {};

  const touch = isPlainObject(attribution.last_touch)
    ? attribution.last_touch
    : isPlainObject(attribution.first_touch)
      ? attribution.first_touch
      : null;

  if (!touch) return {};

  return sanitizeAttributionForStripe(touch);
}

export type ManualPaymentInput = {
  consultationId: string;
  description: string;
  amountEur: number;
  shippingEur?: number;
  customerEmail?: string;
};

export type ManualPaymentResult = {
  url: string;
  orderRef: string;
  sessionId: string;
};

export function validateManualPaymentInput(
  input: ManualPaymentInput
): string | null {
  const description = input.description.trim();
  if (description.length < 3) {
    return "La descrizione deve avere almeno 3 caratteri.";
  }
  if (description.length > MAX_DESCRIPTION) {
    return "Descrizione troppo lunga.";
  }

  const amountError = validateEuroAmount(input.amountEur, {
    min: MIN_AMOUNT_EUR,
    max: MAX_AMOUNT,
    label: "L'importo",
  });
  if (amountError) return amountError;

  const shipping = input.shippingEur ?? 0;
  const shippingError = validateEuroAmount(shipping, {
    min: 0,
    max: MAX_SHIPPING,
    label: "La spedizione",
  });
  if (shippingError) return shippingError;

  if (input.customerEmail) {
    const email = input.customerEmail.trim();
    if (email.length > MAX_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Email cliente non valida.";
    }
  }
  if (!input.consultationId.trim()) {
    return "Consulenza non valida.";
  }
  return null;
}

export async function createManualPaymentSession(
  consultation: ConsultationRow,
  input: ManualPaymentInput
): Promise<ManualPaymentResult> {
  const validationError = validateManualPaymentInput(input);
  if (validationError) {
    throw new Error(validationError);
  }

  const stripe = getStripeClient();
  const description = input.description.trim();
  const shippingEur = input.shippingEur ?? 0;
  const amountCents = eurosToCents(input.amountEur);
  const shippingCents = shippingEur > 0 ? eurosToCents(shippingEur) : 0;
  const orderRef = buildOrderRef();
  const payload = isPlainObject(consultation.payload) ? consultation.payload : {};

  const metadata: Record<string, string> = {
    source: "crm_manual",
    consultation_id: consultation.id,
    consultation_ref: consultation.public_ref,
    order_ref: orderRef,
  };

  Object.assign(metadata, attributionFromConsultationPayload(payload));

  const lineItems: Array<{
    price_data: {
      currency: string;
      product_data: { name: string };
      unit_amount: number;
    };
    quantity: number;
  }> = [
    {
      price_data: {
        currency: "eur",
        product_data: { name: description },
        unit_amount: amountCents,
      },
      quantity: 1,
    },
  ];

  if (shippingCents > 0) {
    lineItems.push({
      price_data: {
        currency: "eur",
        product_data: { name: "Spedizione" },
        unit_amount: shippingCents,
      },
      quantity: 1,
    });
  }

  const customerEmail = input.customerEmail?.trim();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata,
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: [...SHIPPING_COUNTRIES],
    },
    success_url: `${siteUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/checkout/cancel`,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
  });

  if (!session.url) {
    throw new Error("Stripe non ha restituito un URL checkout.");
  }

  return {
    url: session.url,
    orderRef,
    sessionId: session.id,
  };
}
