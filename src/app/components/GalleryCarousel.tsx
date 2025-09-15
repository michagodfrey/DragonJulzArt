"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  datePainted: number;
  slug: string;
  image: {
    url: string;
  };
}

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

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

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
  }, [isOpen, currentIndex, onClose]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--clr-bg)]/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] bg-[var(--clr-surface)]/90 backdrop-blur-sm rounded-2xl border border-[var(--clr-primary)]/20 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[var(--clr-primary)]/20">
          <div>
            <h3 className="text-xl font-display font-semibold text-[var(--clr-text)]">
              {currentItem.title}
            </h3>
            <p className="text-[var(--clr-text-muted)] text-sm">
              {currentIndex + 1} of {items.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--clr-primary)]/20 rounded-lg transition-colors cursor-pointer"
            title="Close carousel"
          >
            <X className="w-6 h-6 text-[var(--clr-text)]" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 min-h-0">
          <div className="relative w-full h-[60vh]">
            {currentItem.image?.url ? (
              <Image
                src={currentItem.image.url}
                alt={currentItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--clr-primary)]/20 to-[var(--clr-secondary)]/20 flex items-center justify-center">
                <span className="text-[var(--clr-text-muted)] text-6xl">
                  🖼️
                </span>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[var(--clr-surface)]/80 backdrop-blur-sm rounded-full border border-[var(--clr-primary)]/20 hover:bg-[var(--clr-primary)]/20 transition-colors cursor-pointer"
            title="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--clr-text)]" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[var(--clr-surface)]/80 backdrop-blur-sm rounded-full border border-[var(--clr-primary)]/20 hover:bg-[var(--clr-primary)]/20 transition-colors cursor-pointer"
            title="Next image"
          >
            <ChevronRight className="w-6 h-6 text-[var(--clr-text)]" />
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--clr-primary)]/20">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-[var(--clr-text-muted)] text-sm mb-3">
                {currentItem.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-[var(--clr-text-muted)]">
                  Painted {currentItem.datePainted}
                </div>
                {currentItem.available && (
                  <div className="text-lg font-semibold text-[var(--clr-accent)]">
                    ${currentItem.price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {currentItem.available && (
              <button className="ml-6 bg-[var(--clr-accent)] text-[var(--clr-surface)] py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors font-medium uppercase tracking-wider cursor-pointer">
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {items.length > 1 && (
          <div className="p-4 border-t border-[var(--clr-primary)]/20">
            <div className="flex space-x-2 overflow-x-auto">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? "border-[var(--clr-accent)]"
                      : "border-[var(--clr-primary)]/20 hover:border-[var(--clr-primary)]/40"
                  }`}
                >
                  {item.image?.url ? (
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--clr-primary)]/20 to-[var(--clr-secondary)]/20 flex items-center justify-center">
                      <span className="text-[var(--clr-text-muted)] text-sm">
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
