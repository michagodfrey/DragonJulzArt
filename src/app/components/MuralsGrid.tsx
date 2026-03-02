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
    src: "/artist/1_chook shed mural_ Kenilworth.webp",
    alt: "Chook Shed Mural, Kenilworth",
    image: { url: "/artist/1_chook shed mural_ Kenilworth.webp" },
  },
  {
    id: "2",
    src: "/artist/2_johnny Cash mural_ Kenilworth.webp",
    alt: "Johnny Cash Mural, Kenilworth",
    image: { url: "/artist/2_johnny Cash mural_ Kenilworth.webp" },
  },
  {
    id: "3",
    src: "/artist/3_who let the dogs out mural.webp",
    alt: "Who Let The Dogs Out Mural",
    image: { url: "/artist/3_who let the dogs out mural.webp" },
  },
  {
    id: "4",
    src: "/artist/4_mural Kilkivan.webp",
    alt: "Mural, Kilkivan",
    image: { url: "/artist/4_mural Kilkivan.webp" },
  },
  {
    id: "5",
    src: "/artist/5_small_Frog 2 mural.webp",
    alt: "Frog Mural",
    image: { url: "/artist/5_small_Frog 2 mural.webp" },
  },
  {
    id: "6",
    src: "/artist/6_frog rails mural.webp",
    alt: "Frog Rails Mural",
    image: { url: "/artist/6_frog rails mural.webp" },
  },
  {
    id: "7",
    src: "/artist/7_music _banner.webp",
    alt: "Music Banner",
    image: { url: "/artist/7_music _banner.webp" },
  },
  {
    id: "8",
    src: "/artist/8_Window mural_ aussie christmas.webp",
    alt: "Aussie Christmas Window Mural",
    image: { url: "/artist/8_Window mural_ aussie christmas.webp" },
  },
  {
    id: "9",
    src: "/artist/9_Kookie mural.webp",
    alt: "Kookie Mural",
    image: { url: "/artist/9_Kookie mural.webp" },
  },
  {
    id: "10",
    src: "/artist/10_Tawney mural.webp",
    alt: "Tawney Mural",
    image: { url: "/artist/10_Tawney mural.webp" },
  },
];

export default function MuralsGrid() {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {muralsData.map((mural: Mural, index: number) => {
          let visibilityClass = "";
          if (!showAll) {
            if (index === 3) {
              visibilityClass = "md:hidden";
            } else if (index > 3) {
              visibilityClass = "hidden";
            }
          }

          return (
            <figure
              key={mural.id}
              className={`group cursor-pointer ${visibilityClass}`}
              onClick={() => {
                setSelectedIndex(index);
                setCarouselOpen(true);
              }}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-[var(--clr-primary)]/25 shadow-lg">
                {mural.image?.url ? (
                  <Image
                    src={mural.image.url}
                    alt={mural.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--clr-primary)]/20 to-[var(--clr-secondary)]/20 flex items-center justify-center">
                    <span className="text-[var(--clr-text-muted)] text-4xl">
                      🎨
                    </span>
                  </div>
                )}
              </div>
            </figure>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-[var(--clr-accent)] text-[var(--clr-surface)] px-8 py-3 rounded-lg hover:bg-yellow-400 font-medium inline-flex items-center uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
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
