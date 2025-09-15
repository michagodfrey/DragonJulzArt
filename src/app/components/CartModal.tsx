"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartModal() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, total } =
    useCart();

  if (!isOpen) return null;

  const checkout = async () => {
    if (items.length === 0) return;
    const payload = {
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      })),
    };
    const resp = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      alert("Checkout failed. Please try again.");
      return;
    }
    const data = await resp.json();
    if (data?.url) window.location.href = data.url;
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--clr-surface)] text-[var(--clr-text)] shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-[var(--clr-text-muted)] hover:text-[var(--clr-text)]"
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
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500 hover:underline"
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
              className="w-full bg-[var(--clr-accent)] text-[var(--clr-surface)] py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium uppercase tracking-wider"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
