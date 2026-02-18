"use client";

import Image from "next/image";
import { useState } from "react";
import GalleryCarousel from "./GalleryCarousel";
import { useCart } from "../context/CartContext";

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
  number?: number;
  image: {
    url: string;
  };
}

interface GalleryGridProps {
  items: GalleryItem[];
  categoryTitle?: string;
}

export default function GalleryGrid({ items: galleries, categoryTitle }: GalleryGridProps) {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { addItem } = useCart();

  if (galleries.length === 0) {
    return null;
  }

  return (
    <>
      {categoryTitle && (
        <h4 className="text-2xl font-display font-semibold text-[var(--clr-text)] mb-8">
          {categoryTitle}
        </h4>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((item: GalleryItem, index: number) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl bg-[var(--clr-surface)]/60 backdrop-blur-sm border border-[var(--clr-primary)]/20 shadow-lg hover:shadow-xl hover:border-[var(--clr-accent)]/40 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelectedIndex(index);
              setCarouselOpen(true);
            }}
          >
            <div className="aspect-square relative overflow-hidden">
              {item.image?.url ? (
                <Image
                  src={item.image.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--clr-primary)]/20 to-[var(--clr-secondary)]/20 flex items-center justify-center">
                  <span className="text-[var(--clr-text-muted)] text-4xl">
                    🖼️
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h4 className="font-display font-semibold text-[var(--clr-text)] mb-2 text-lg">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-[var(--clr-text-muted)] text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}

              <div className="flex justify-end items-center">
                {item.price != null && (
                  <div className="text-lg font-semibold text-[var(--clr-accent)]">
                    ${item.price.toLocaleString()}
                  </div>
                )}
              </div>

              {item.price != null && (
                <button
                  className="w-full mt-4 bg-[var(--clr-accent)] text-[var(--clr-surface)] py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium uppercase tracking-wider cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(
                      {
                        id: item.id,
                        title: item.title,
                        price: item.price!,
                        imageUrl: item.image?.url,
                      },
                      1,
                    );
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Modal */}
      <GalleryCarousel
        items={galleries}
        initialIndex={selectedIndex}
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
      />
    </>
  );
}
