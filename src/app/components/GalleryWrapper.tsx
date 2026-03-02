"use client";

import { useEffect, useState } from "react";
import GalleryGrid, { GalleryItem } from "./GalleryGrid";
import type { StripeProduct } from "../api/products/route";

function mapToGalleryItems(products: StripeProduct[]): GalleryItem[] {
  return products.map((p) => ({
    id: p.id,
    title: p.name,
    description: p.description ?? undefined,
    price: p.price ?? undefined,
    image: { url: p.imageUrl ?? "" },
  }));
}

export default function GalleryWrapper() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error ?? `HTTP ${res.status}`);
        }
        return res.json() as Promise<StripeProduct[]>;
      })
      .then((data) => {
        setItems(mapToGalleryItems(data));
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load gallery");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-[var(--clr-surface)] rounded-xl mb-4" />
            <div className="h-4 bg-[var(--clr-surface)] rounded mb-2" />
            <div className="h-3 bg-[var(--clr-surface)] rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading gallery: {error}</p>
        <p className="text-[var(--clr-text-muted)]">
          Please check your Stripe configuration and try again.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--clr-text-muted)]">
          No paintings found. Please check your active Stripe products.
        </p>
      </div>
    );
  }

  return <GalleryGrid items={items} />;
}
