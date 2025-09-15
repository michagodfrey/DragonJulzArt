import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Client, Environment, type Money } from "square";

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

function toMoney(amountMajorUnits: number): Money {
  const upper = (process.env.SQUARE_CURRENCY || "AUD").toUpperCase();
  const currency = (
    /^[A-Z]{3}$/.test(upper)
      ? (upper as Money["currency"])
      : ("AUD" as Money["currency"])
  ) as Money["currency"];
  return {
    amount: BigInt(Math.round(amountMajorUnits * 100)),
    currency,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { items: CartItem[] };

    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const accessToken = assertEnv("SQUARE_ACCESS_TOKEN");
    const locationId = assertEnv("SQUARE_LOCATION_ID");
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    const client = new Client({
      accessToken,
      environment:
        (process.env.SQUARE_ENVIRONMENT || "production").toLowerCase() ===
        "sandbox"
          ? Environment.Sandbox
          : Environment.Production,
    });

    const lineItems = body.items.map((item) => ({
      name: item.title,
      quantity: String(item.quantity || 1),
      basePriceMoney: toMoney(item.price),
      note: item.id,
    }));

    const { result } = await client.checkoutApi.createPaymentLink({
      idempotencyKey: randomUUID(),
      quickPay: undefined,
      order: {
        locationId,
        lineItems,
      },
      checkoutOptions: {
        redirectUrl: `${siteUrl}/success`,
        askForShippingAddress: false,
      },
    });

    const url = result?.paymentLink?.url;
    if (!url) {
      return NextResponse.json(
        { error: "Failed to create payment link" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (err: unknown) {
    console.error("Square checkout error", err);
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
