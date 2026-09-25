"use client";

import Image from "next/image";
import { useState } from "react";
import { Award, ShoppingBag } from "lucide-react";
import GalleryCarousel from "./GalleryCarousel";
import { useCart } from "../context/CartContext";

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
  number?: number;
  award?: string;
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
            className="group relative overflow-hidden rounded-2xl bg-[var(--clr-surface)] border border-[var(--clr-border)] shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--clr-accent)]/10 to-[var(--clr-secondary)]/10 flex items-center justify-center">
                  <span className="text-[var(--clr-text-soft)] text-4xl">
                    🖼️
                  </span>
                </div>
              )}
              {item.award && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[var(--clr-bg)]/85 backdrop-blur-sm text-[var(--clr-secondary)] text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-sm">
                  <Award className="w-3 h-3" />
                  Award
                </span>
              )}
            </div>

            <div className="p-5">
              <h4 className="font-semibold text-[var(--clr-text)] mb-1 text-base">
                {item.title}
              </h4>
              {item.award && (
                <p className="text-[var(--clr-secondary)] text-xs font-medium mb-1.5">
                  {item.award}
                </p>
              )}
              {item.description && (
                <p className="text-[var(--clr-text-muted)] text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}

              {item.price != null && (
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-[var(--clr-border)]">
                  <span className="text-sm text-[var(--clr-text-soft)]">
                    ${item.price.toLocaleString()}
                  </span>
                  <button
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--clr-secondary)] opacity-80 hover:opacity-100 hover:underline transition-opacity cursor-pointer"
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
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to cart
                  </button>
                </div>
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
