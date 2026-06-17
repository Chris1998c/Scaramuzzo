import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  isValidCheckoutSessionId,
  verifyCheckoutSessionForTracking,
} from "@/lib/stripe/verifyCheckoutSession";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId || !isValidCheckoutSessionId(sessionId)) {
    return NextResponse.json({ error: "Invalid session_id" }, { status: 400 });
  }

  try {
    const verified = await verifyCheckoutSessionForTracking(stripe, sessionId);

    if (!verified) {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    return NextResponse.json(verified);
  } catch {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
