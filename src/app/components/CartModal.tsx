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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--clr-surface)] text-[var(--clr-text)] shadow-2xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] cursor-pointer text-sm"
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
                className="flex gap-3 items-center border border-[var(--clr-border)] rounded-xl p-3"
              >
                {item.imageUrl ? (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-[var(--clr-bg)] rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[var(--clr-text)] truncate">
                    {item.title}
                  </div>
                  <div className="text-[var(--clr-text-muted)] text-sm">
                    ${item.price.toLocaleString()}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-xs text-[var(--clr-text-soft)]">
                      Qty 1 (unique artwork)
                    </span>
                    <button
                      className="text-xs text-red-400 hover:underline cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-[var(--clr-border)] pt-4">
              <span className="font-medium text-[var(--clr-text)]">Total</span>
              <span className="text-lg font-semibold text-[var(--clr-text)]">
                ${total.toLocaleString()}
              </span>
            </div>

            {error && (
              <div className="text-red-300 text-sm mt-2 p-3 bg-red-950/40 rounded-lg border border-red-800">
                {error}
              </div>
            )}

            <button
              onClick={checkout}
              disabled={loading}
              className="cursor-pointer w-full bg-[var(--clr-button)] text-white py-3.5 rounded-full hover:bg-[var(--clr-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Processing…" : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
