"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Award } from "lucide-react";
import type { GalleryItem } from "./GalleryGrid";
import { useCart } from "../context/CartContext";

interface GalleryCarouselProps {
  items: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryCarousel({
  items,
  initialIndex,
  isOpen,
  onClose,
}: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const { addItem } = useCart();

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrevious]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-[var(--clr-surface)] rounded-2xl border border-[var(--clr-border)] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-[var(--clr-border)]">
          <div>
            <h3 className="text-xl font-display font-semibold text-[var(--clr-text)]">
              {currentItem.title}
            </h3>
            <p className="text-[var(--clr-text-soft)] text-xs mt-0.5">
              {currentIndex + 1} of {items.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--clr-bg)] rounded-lg transition-colors cursor-pointer"
            title="Close carousel"
          >
            <X className="w-5 h-5 text-[var(--clr-text)]" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 min-h-0 bg-[var(--clr-bg)]">
          <div className="relative w-full h-[55vh]">
            {currentItem.image?.url ? (
              <Image
                src={currentItem.image.url}
                alt={currentItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--clr-accent)]/10 to-[var(--clr-secondary)]/10 flex items-center justify-center">
                <span className="text-[var(--clr-text-soft)] text-6xl">
                  🖼️
                </span>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--clr-surface)]/90 backdrop-blur-sm rounded-full border border-[var(--clr-border)] shadow-sm hover:bg-[var(--clr-surface)] transition-colors cursor-pointer"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--clr-text)]" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--clr-surface)]/90 backdrop-blur-sm rounded-full border border-[var(--clr-border)] shadow-sm hover:bg-[var(--clr-surface)] transition-colors cursor-pointer"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5 text-[var(--clr-text)]" />
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-[var(--clr-border)]">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 min-w-0">
              {currentItem.award && (
                <p className="inline-flex items-center gap-1 text-[var(--clr-secondary)] text-xs font-semibold uppercase tracking-wide mb-2">
                  <Award className="w-3.5 h-3.5" />
                  {currentItem.award}
                </p>
              )}
              {currentItem.description && (
                <p className="text-[var(--clr-text-muted)] text-sm mb-2">
                  {currentItem.description}
                </p>
              )}
              {currentItem.price != null && (
                <div className="text-sm text-[var(--clr-text-soft)]">
                  ${currentItem.price.toLocaleString()}
                </div>
              )}
            </div>

            {currentItem.price != null && (
              <button
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--clr-secondary)] hover:underline cursor-pointer"
                onClick={() =>
                  addItem(
                    {
                      id: currentItem.id,
                      title: currentItem.title,
                      price: currentItem.price!,
                      imageUrl: currentItem.image?.url,
                    },
                    1,
                  )
                }
              >
                <ShoppingBag className="w-4 h-4" />
                Add to cart
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {items.length > 1 && (
          <div className="p-4 border-t border-[var(--clr-border)] bg-[var(--clr-bg)]">
            <div className="flex space-x-2 overflow-x-auto">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    index === currentIndex
                      ? "border-[var(--clr-secondary)]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {item.image?.url ? (
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--clr-accent)]/10 to-[var(--clr-secondary)]/10 flex items-center justify-center">
                      <span className="text-[var(--clr-text-soft)] text-sm">
                        🖼️
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
