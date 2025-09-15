"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartModal() {
  const { isOpen, closeCart, items, removeItem, total } = useCart();
  const [comingSoon, setComingSoon] = useState(false);

  if (!isOpen) return null;

  const checkout = async () => {
    // Temporarily disable checkout and show coming soon message
    setComingSoon(true);
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

            <button
              onClick={checkout}
              className="cursor-pointer w-full bg-[var(--clr-accent)] text-[var(--clr-surface)] py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium uppercase tracking-wider"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      {comingSoon && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setComingSoon(false)}
          />
          <div className="relative z-10 bg-[var(--clr-surface)] text-[var(--clr-text)] p-6 rounded-xl border border-[var(--clr-primary)]/20 max-w-sm w-full mx-4 text-center">
            <h3 className="text-xl font-display font-semibold mb-2">
              Shop coming soon
            </h3>
            <p className="text-[var(--clr-text-muted)] mb-4">
              To purchase, please email{" "}
              <a
                href="mailto:dragonjulzart@gmail.com"
                className="text-[var(--clr-primary)] underline"
              >
                dragonjulzart@gmail.com
              </a>
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="mailto:dragonjulzart@gmail.com"
                className="bg-[var(--clr-accent)] text-[var(--clr-surface)] px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors"
              >
                Contact
              </a>
              <button
                onClick={() => setComingSoon(false)}
                className="px-4 py-2 border rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
