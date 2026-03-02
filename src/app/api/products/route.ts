import { NextResponse } from "next/server";
import Stripe from "stripe";

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  price: number | null; // major units (e.g. 150.00 AUD)
  imageUrl: string | null;
}

function assertEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export async function GET() {
  try {
    const stripe = new Stripe(assertEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2025-08-27.basil",
    });

    // Fetch all active products, expanding default_price
    const { data: products } = await stripe.products.list({
      active: true,
      limit: 100,
      expand: ["data.default_price"],
    });

    // Fetch all active prices so we can find a price even if default_price is not set
    const { data: allPrices } = await stripe.prices.list({
      active: true,
      limit: 100,
    });

    // Build a map: product id → first active price found
    const priceByProduct = new Map<string, Stripe.Price>();
    for (const price of allPrices) {
      const productId =
        typeof price.product === "string" ? price.product : price.product?.id;
      if (productId && !priceByProduct.has(productId)) {
        priceByProduct.set(productId, price);
      }
    }

    const items: StripeProduct[] = products
      .map((p) => {
        // Prefer the explicit default_price, fall back to any active price
        const defaultPrice = p.default_price as Stripe.Price | null;
        const fallbackPrice = priceByProduct.get(p.id) ?? null;
        const price = defaultPrice ?? fallbackPrice;

        const unitAmount =
          price?.unit_amount != null ? price.unit_amount / 100 : null;

        return {
          id: p.id,
          name: p.name,
          description: p.description ?? null,
          price: unitAmount,
          imageUrl: p.images?.[0] ?? null,
        };
      })
      // Sort alphabetically by name
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(items);
  } catch (err: unknown) {
    console.error("Stripe products fetch error", err);
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
