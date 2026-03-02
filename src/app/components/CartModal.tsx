"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartModal() {
  const { isOpen, closeCart, items, removeItem, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const checkout = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--clr-surface)] text-[var(--clr-text)] shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] cursor-pointer"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-[var(--clr-text-muted)]">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center border border-[var(--clr-primary)]/20 rounded-lg p-3 bg-[var(--clr-bg)]/40"
              >
                {item.imageUrl ? (
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-[var(--clr-surface)] rounded" />
                )}
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-[var(--clr-text-muted)]">
                    ${item.price.toLocaleString()}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-[var(--clr-text-muted)]">
                      Qty 1 (unique artwork)
                    </span>
                    <button
                      className="text-red-500 hover:underline cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-[var(--clr-primary)]/20 pt-4">
              <span className="font-medium">Total</span>
              <span className="text-lg font-semibold text-[var(--clr-accent)]">
                ${total.toLocaleString()}
              </span>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 p-2 bg-red-100/10 rounded border border-red-500/20">
                {error}
              </div>
            )}

            <button
              onClick={checkout}
              disabled={loading}
              className="cursor-pointer w-full bg-[var(--clr-accent)] text-[var(--clr-surface)] py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium uppercase tracking-wider"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
