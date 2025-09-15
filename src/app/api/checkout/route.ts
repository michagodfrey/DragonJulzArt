import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Client, Environment } from "@square/square";

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

function toMoney(amountMajorUnits: number) {
  return {
    amount: BigInt(Math.round(amountMajorUnits * 100)),
    currency: (process.env.SQUARE_CURRENCY || "AUD") as any,
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

    const { result } = await client.checkout.createPaymentLink({
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
  } catch (err: any) {
    console.error("Square checkout error", err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
