"use client";

import { useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/client";
import { GET_MURALS } from "../graphql/queries";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import GalleryCarousel from "./GalleryCarousel";
import type { GalleryItem } from "./GalleryGrid";

const VISIBLE_COUNT = 4;

function MuralsContent() {
  const { loading, error, data } = useQuery(GET_MURALS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] rounded-2xl bg-[var(--clr-surface)]" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading murals: {error.message}</p>
      </div>
    );
  }

  const murals = data?.murals ?? [];
  if (murals.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--clr-text-muted)]">
        No murals to display.
      </div>
    );
  }

  const itemsAsGallery: GalleryItem[] = murals.map((m: { id: string; title: string; image: { url: string }; number?: number }) => ({
    id: m.id,
    title: m.title,
    image: m.image,
    number: m.number,
  }));

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-mural-card]") as HTMLElement | null;
    const cardWidth = card?.getBoundingClientRect().width ?? 0;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * (direction === "right" ? 1 : -1);
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        {/* Left arrow - show when there are more than 4 items */}
        {murals.length > VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 p-2 rounded-full bg-[var(--clr-surface)]/90 border border-[var(--clr-primary)]/20 shadow-lg hover:bg-[var(--clr-primary)]/20 transition-colors cursor-pointer"
            aria-label="Previous murals"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--clr-text)]" />
          </button>
        )}

        {/* Scrollable row: 4 visible, rest offscreen */}
        <div
          ref={scrollRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:thin]"
        >
          {murals.map((mural: { id: string; title: string; image: { url: string }; number?: number }, index: number) => (
            <figure
              key={mural.id}
              data-mural-card
              className="relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--clr-primary)]/20 snap-start cursor-pointer group"
              onClick={() => {
                setSelectedIndex(index);
                setCarouselOpen(true);
              }}
            >
              {mural.image?.url ? (
                <Image
                  src={mural.image.url}
                  alt={mural.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--clr-surface)] flex items-center justify-center">
                  <span className="text-[var(--clr-text-muted)] text-4xl">🖼️</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-display font-semibold text-sm truncate">{mural.title}</p>
              </div>
            </figure>
          ))}
        </div>

        {/* Right arrow */}
        {murals.length > VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 p-2 rounded-full bg-[var(--clr-surface)]/90 border border-[var(--clr-primary)]/20 shadow-lg hover:bg-[var(--clr-primary)]/20 transition-colors cursor-pointer"
            aria-label="Next murals"
          >
            <ChevronRight className="w-6 h-6 text-[var(--clr-text)]" />
          </button>
        )}
      </div>

      <GalleryCarousel
        items={itemsAsGallery}
        initialIndex={selectedIndex}
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
      />
    </>
  );
}

export default function MuralsSection() {
  return (
    <ApolloProvider client={client}>
      <MuralsContent />
    </ApolloProvider>
  );
}
