"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryCarousel from "./GalleryCarousel";

interface Mural {
  id: string;
  title: string;
  category: string;
  alt: string;
  image: {
    url: string;
  };
}

const muralsData: Mural[] = [
  {
    id: "1",
    title: "Chook Shed Mural",
    category: "Mural — Kenilworth",
    alt: "Chook shed mural, Kenilworth",
    image: { url: "/artist/1_chook shed mural_ Kenilworth.webp" },
  },
  {
    id: "2",
    title: "Johnny Cash Mural",
    category: "Mural — Kenilworth",
    alt: "Johnny Cash mural, Kenilworth",
    image: { url: "/artist/2_johnny Cash mural_ Kenilworth.webp" },
  },
  {
    id: "3",
    title: "Who Let the Dogs Out",
    category: "Mural",
    alt: "Who Let The Dogs Out mural",
    image: { url: "/artist/3_who let the dogs out mural.webp" },
  },
  {
    id: "4",
    title: "Kilkivan Mural",
    category: "Mural — Kilkivan",
    alt: "Mural, Kilkivan",
    image: { url: "/artist/4_mural Kilkivan.webp" },
  },
  {
    id: "5",
    title: "Frog Mural",
    category: "Mural",
    alt: "Frog mural",
    image: { url: "/artist/5_small_Frog 2 mural.webp" },
  },
  {
    id: "6",
    title: "Frog Rails Mural",
    category: "Mural",
    alt: "Frog rails mural",
    image: { url: "/artist/6_frog rails mural.webp" },
  },
  {
    id: "7",
    title: "Music Banner",
    category: "Mural",
    alt: "Music banner mural",
    image: { url: "/artist/7_music _banner.webp" },
  },
  {
    id: "8",
    title: "Aussie Christmas",
    category: "Mural — Window",
    alt: "Aussie Christmas window mural",
    image: { url: "/artist/8_Window mural_ aussie christmas.webp" },
  },
  {
    id: "9",
    title: "Kookie Mural",
    category: "Mural",
    alt: "Kookie mural",
    image: { url: "/artist/9_Kookie mural.webp" },
  },
  {
    id: "10",
    title: "Tawney Mural",
    category: "Mural",
    alt: "Tawney mural",
    image: { url: "/artist/10_Tawney mural.webp" },
  },
  {
    id: "11",
    title: "Cassowary",
    category: "Charcoal & Pastel",
    alt: "Cassowary, charcoal and pastel portrait",
    image: { url: "/artist/11_cassowary_charcoal_pastel.webp" },
  },
  {
    id: "12",
    title: "Blue Eagle",
    category: "Charcoal & Pastel",
    alt: "Blue eagle, charcoal and pastel portrait",
    image: { url: "/artist/12_blue_eagle_charcoal_pastel.webp" },
  },
  {
    id: "13",
    title: "I See You",
    category: "Charcoal & Pastel",
    alt: "I See You, charcoal and pastel portrait",
    image: { url: "/artist/13_i_see_you_charcoal_pastel.webp" },
  },
  {
    id: "14",
    title: "Pet Portrait",
    category: "Pastel Commission",
    alt: "Pet portrait in soft pastel",
    image: { url: "/artist/14_pet_portrait_pastel.webp" },
  },
  {
    id: "15",
    title: "Pet Portrait",
    category: "Charcoal Commission",
    alt: "Pet portrait in charcoal",
    image: { url: "/artist/15_pet_portrait_charcoal.webp" },
  },
  {
    id: "16",
    title: "Portrait Commission",
    category: "Charcoal Commission",
    alt: "Charcoal portrait commission",
    image: { url: "/artist/16_portrait_commission_charcoal.webp" },
  },
];

const INITIAL_COUNT = 6;

export default function MuralsGrid() {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? muralsData : muralsData.slice(0, INITIAL_COUNT);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {visible.map((mural, index) => (
          <figure
            key={mural.id}
            className="group cursor-pointer"
            onClick={() => {
              setSelectedIndex(index);
              setCarouselOpen(true);
            }}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--clr-border)] shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <Image
                src={mural.image.url}
                alt={mural.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <figcaption className="mt-2.5 text-center">
              <span className="block text-sm font-medium text-[var(--clr-text)]">
                {mural.title}
              </span>
              <span className="block text-xs text-[var(--clr-text-soft)]">
                {mural.category}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--clr-secondary)] border border-[var(--clr-secondary)]/30 rounded-full px-6 py-2.5 hover:bg-[var(--clr-secondary)]/5 transition-colors cursor-pointer"
        >
          {showAll ? "Show Fewer" : `Show All ${muralsData.length}`}
        </button>
      </div>

      {/* Carousel Modal */}
      <GalleryCarousel
        items={visible.map((mural) => ({
          id: mural.id,
          title: mural.title,
          description: mural.category,
          image: mural.image,
        }))}
        initialIndex={selectedIndex}
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
      />
    </>
  );
}
