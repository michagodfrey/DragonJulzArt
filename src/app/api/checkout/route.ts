import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type CartItem = {
  id: string;
  title: string;
  price: number; // in major units (e.g., 12.34)
  quantity: number;
};

function assertEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function toAmountMinorUnits(amountMajorUnits: number): number {
  return Math.round(amountMajorUnits * 100);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { items: CartItem[] };

    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const stripeSecretKey = assertEnv("STRIPE_SECRET_KEY");
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    const currency = (process.env.STRIPE_CURRENCY || "AUD").toLowerCase();

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    const line_items = body.items.map((item) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency,
        product_data: {
          name: item.title,
          metadata: {
            item_id: item.id,
          },
        },
        unit_amount: toAmountMinorUnits(item.price),
      },
      // For unique artwork, prevent quantity changes on the hosted page
      adjustable_quantity: { enabled: false },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: siteUrl,
      billing_address_collection: "auto",
      shipping_address_collection: undefined,
      // Optional: send some metadata for reconciliation
      metadata: {
        source: "gallery",
      },
      allow_promotion_codes: false,
    });

    if (!session?.url) {
      return NextResponse.json(
        { error: "Failed to create Stripe Checkout Session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error", err);
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
