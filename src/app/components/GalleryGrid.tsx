"use client";

import { useQuery } from "@apollo/client";
import { GET_ALL_GALLERY_DATA } from "../graphql/queries";
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

export default function GalleryGrid() {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { addItem } = useCart();

  const { loading, error, data } = useQuery(GET_ALL_GALLERY_DATA);

  const rawGalleries = [
    ...(data?.charcoalAndPastels ?? []),
    ...(data?.softPastels ?? []),
    ...(data?.tShirts ?? []),
  ];
  const galleries: GalleryItem[] = rawGalleries.map(
    (g: {
      id: string;
      title: string;
      description?: string;
      price?: number;
      number?: number;
      image: { url: string };
    }) => ({
      id: g.id,
      title: g.title,
      description: g.description,
      price: g.price,
      number: g.number,
      image: g.image,
    }),
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-[var(--clr-surface)] rounded-xl mb-4"></div>
            <div className="h-4 bg-[var(--clr-surface)] rounded mb-2"></div>
            <div className="h-3 bg-[var(--clr-surface)] rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">
          Error loading gallery: {error.message}
        </p>
        <p className="text-[var(--clr-text-muted)] mb-4">
          Please check your Hygraph configuration and try again.
        </p>
        <div className="text-left max-w-md mx-auto bg-[var(--clr-surface)]/60 backdrop-blur-sm p-4 rounded-lg text-sm border border-[var(--clr-primary)]/20">
          <p className="font-semibold mb-2 text-[var(--clr-text)]">
            Debug Info:
          </p>
          <p className="text-[var(--clr-text-muted)]">Error: {error.message}</p>
          {error.graphQLErrors && error.graphQLErrors.length > 0 && (
            <p className="text-[var(--clr-text-muted)]">
              GraphQL Errors:{" "}
              {error.graphQLErrors.map((e) => e.message).join(", ")}
            </p>
          )}
          {error.networkError && (
            <p className="text-[var(--clr-text-muted)]">
              Network Error: {error.networkError.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (galleries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--clr-text-muted)]">
          No gallery items found. Please add some items to your Hygraph CMS.
        </p>
        <div className="text-left max-w-md mx-auto bg-[var(--clr-surface)]/60 backdrop-blur-sm p-4 rounded-lg text-sm mt-4 border border-[var(--clr-primary)]/20">
          <p className="font-semibold mb-2 text-[var(--clr-text)]">
            Debug Info:
          </p>
          <p className="text-[var(--clr-text-muted)]">
            Data received: {JSON.stringify(data, null, 2)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
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

              <div className="flex justify-between items-center">
                {item.number != null && (
                  <div className="text-sm text-[var(--clr-text-muted)]">
                    #{item.number}
                  </div>
                )}
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
