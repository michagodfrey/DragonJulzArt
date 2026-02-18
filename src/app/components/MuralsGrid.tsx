"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryCarousel from "./GalleryCarousel";

interface Mural {
  id: string;
  src: string;
  alt: string;
  image: {
    url: string;
  };
}

const muralsData: Mural[] = [
  {
    id: "1",
    src: "/murals/1_chook shed mural_ Kenilworth.jpg",
    alt: "Chook Shed Mural, Kenilworth",
    image: { url: "/murals/1_chook shed mural_ Kenilworth.jpg" },
  },
  {
    id: "2",
    src: "/murals/2_johnny Cash mural_ Kenilworth.jpg",
    alt: "Johnny Cash Mural, Kenilworth",
    image: { url: "/murals/2_johnny Cash mural_ Kenilworth.jpg" },
  },
  {
    id: "3",
    src: "/murals/3_who let the dogs out mural.jpg",
    alt: "Who Let The Dogs Out Mural",
    image: { url: "/murals/3_who let the dogs out mural.jpg" },
  },
  {
    id: "4",
    src: "/murals/4_mural Kilkivan.jpg",
    alt: "Mural, Kilkivan",
    image: { url: "/murals/4_mural Kilkivan.jpg" },
  },
  {
    id: "5",
    src: "/murals/5_small_Frog 2 mural.jpg",
    alt: "Frog Mural",
    image: { url: "/murals/5_small_Frog 2 mural.jpg" },
  },
  {
    id: "6",
    src: "/murals/6_frog rails mural.jpg",
    alt: "Frog Rails Mural",
    image: { url: "/murals/6_frog rails mural.jpg" },
  },
  {
    id: "7",
    src: "/murals/7_music _banner.jpg",
    alt: "Music Banner",
    image: { url: "/murals/7_music _banner.jpg" },
  },
  {
    id: "8",
    src: "/murals/8_Window mural_ aussie christmas.jpg",
    alt: "Aussie Christmas Window Mural",
    image: { url: "/murals/8_Window mural_ aussie christmas.jpg" },
  },
  {
    id: "9",
    src: "/murals/9_Kookie mural.jpg",
    alt: "Kookie Mural",
    image: { url: "/murals/9_Kookie mural.jpg" },
  },
  {
    id: "10",
    src: "/murals/10_Tawney mural.jpg",
    alt: "Tawney Mural",
    image: { url: "/murals/10_Tawney mural.jpg" },
  },
];

export default function MuralsGrid() {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {muralsData.map((mural: Mural, index: number) => (
          <div
            key={mural.id}
            className="group relative overflow-hidden rounded-xl bg-[var(--clr-surface)]/60 backdrop-blur-sm border border-[var(--clr-primary)]/20 shadow-lg hover:shadow-xl hover:border-[var(--clr-accent)]/40 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelectedIndex(index);
              setCarouselOpen(true);
            }}
          >
            <div className="aspect-square relative overflow-hidden">
              {mural.image?.url ? (
                <Image
                  src={mural.image.url}
                  alt={mural.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--clr-primary)]/20 to-[var(--clr-secondary)]/20 flex items-center justify-center">
                  <span className="text-[var(--clr-text-muted)] text-4xl">
                    🎨
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h4 className="font-display font-semibold text-[var(--clr-text)] text-lg">
                {mural.alt}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Modal */}
      <GalleryCarousel
        items={muralsData.map((mural: Mural) => ({
          id: mural.id,
          title: mural.alt,
          image: mural.image,
        }))}
        initialIndex={selectedIndex}
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
      />
    </>
  );
}
