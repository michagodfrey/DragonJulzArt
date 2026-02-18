"use client";

import {
  Instagram,
  Facebook,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import GalleryWrapper from "./components/GalleryWrapper";
import MuralsSection from "./components/MuralsSection";
import { useState } from "react";
import { useCart } from "./context/CartContext";
import Image from "next/image";
import Script from "next/script";

const INSTAGRAM_PROFILE = "https://instagram.com/dragonjulzart";
// Add 1-3 post URLs from Instagram (⋮ → Embed on a post, copy the .../p/XXXXX/ link)
const INSTAGRAM_EMBED_POSTS: string[] = [
  "https://www.instagram.com/p/DQhAUqsj-9v/",
];

export default function Home() {
  const [showFullBio, setShowFullBio] = useState(false);
  const { openCart, count } = useCart();

  return (
    <div className="min-h-screen bg-[var(--clr-bg)] text-[var(--clr-text)]">
      {/* Header - sticky, transparent on top, bg-surface once scrolled */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-transparent hover:bg-[var(--clr-surface)]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Dragon Julz Art Logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-[var(--clr-text)]">
                  Dragon Julz Art
                </h1>
                <p className="text-sm text-[var(--clr-text-muted)]">
                  Juliet Musgrave&apos;s Portfolio
                </p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#gallery"
                className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors uppercase tracking-wider text-sm"
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors uppercase tracking-wider text-sm"
              >
                About
              </a>
              <a
                href="#whats-on"
                className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors uppercase tracking-wider text-sm"
              >
                What&apos;s On
              </a>
              <a
                href="#contact"
                className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors uppercase tracking-wider text-sm"
              >
                Contact
              </a>
            </nav>
            <button
              onClick={openCart}
              className="ml-4 bg-[var(--clr-accent)] text-[var(--clr-surface)] px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium inline-flex items-center uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - full-viewport image banner with dragon eye, dark gradient overlay */}
      <section className="relative min-h-screen flex items-center justify-center scroll-snap-start">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)]/80 via-[var(--clr-bg)]/60 to-[var(--clr-bg)]/90 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 animate-zoom-in"
          style={{
            backgroundImage: "url('/banner.jpg')",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--clr-surface)]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[var(--clr-primary)]/20 max-w-4xl mx-auto animate-fade-in-delayed opacity-0">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 motion-safe:animate-fadeInUp leading-tight">
                Celebrating Wildlife and Community
                <span className="text-[var(--clr-primary)] block mt-2">
                  Through Art
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--clr-text-muted)] max-w-3xl mx-auto mb-8 leading-relaxed">
                From Kenilworth street murals to award-winning canvases,
                DragonJulzArt captures nature&apos;s pulse in electric colour.
                Immerse yourself, explore what&apos;s on, and take home a piece
                that balances realism with storybook charm.
              </p>
              <a
                href="#gallery"
                className="bg-[var(--clr-accent)] text-[var(--clr-surface)] px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium inline-flex items-center uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                See the Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - masonry grid */}
      <section
        id="gallery"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--clr-surface)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-4">
              Featured Works
            </h3>
            <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
              A glimpse into the wild beauty that surrounds our community,
              captured through the lens of artistic expression.
            </p>
          </div>

          <GalleryWrapper />
        </div>
      </section>

      {/* Murals and portrait commissions Section - display murals and portrait commissions */}
      <section
        id="awards"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--clr-surface)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-4">
              Murals and portrait commissions
            </h3>
            <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
              Juliet creates murals, portrait commissions and pet portraits —
              from large-scale walls to intimate charcoal and pastel pieces.
            </p>
          </div>

          <MuralsSection />
        </div>
      </section>

      {/* T-shirts section - hand-painted designs available on request */}
      <section
        id="tshirts"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--clr-surface)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-4">
              Hand-painted T-shirts
            </h3>
            <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto mb-8">
              Juliet&apos;s hand-painted t-shirts and other creations are
              available on request — no online shop yet, but you can get in touch
              to order.
            </p>
            <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto text-left sm:text-center">
              My t-shirt and other creations are currently available by
              contacting me through my Instagram page, Facebook or through
              Nathalie at the Wild Pixie Arts at 6 Busby St Amamoor on weekends
              from 9:30 - 1pm. Stay tuned for venues or markets in Imbil and
              Kenilworth soon.
            </p>
          </div>

          {/* Shirt design grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { src: "/shirts/T_clucka tshirt_40.webp", alt: "Clucka t-shirt design" },
              { src: "/shirts/T_rust in peace shirt_60.webp", alt: "Rust in peace shirt design" },
              { src: "/shirts/T_tshirt_highland cow_60.webp", alt: "Highland cow t-shirt design" },
              { src: "/shirts/T_Unicorn_40.webp", alt: "Unicorn t-shirt design" },
            ].map(({ src, alt }) => (
              <figure key={src} className="group">
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-[var(--clr-primary)]/25 shadow-lg">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - editorial layout with collage bg, award images, certificate */}
      <section
        id="about"
        className="relative min-h-[100vh] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Subtle background: collage with strong overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/artist/3_Collage_pastel and tshirt designs.webp"
            alt=""
            fill
            className="object-cover scale-105"
            sizes="100vw"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-[var(--clr-bg)]/90 backdrop-blur-[2px]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)]/80 via-transparent to-[var(--clr-bg)]/90"
            aria-hidden
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--clr-text)] text-center mb-6 tracking-tight">
            About Juliet & Our Community
          </h2>
          <p className="text-[var(--clr-text-muted)] text-center text-lg max-w-2xl mx-auto mb-20">
            Wildlife artist & community storyteller in the Mary Valley
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-20 items-start">
            {/* Main content: bio + awards strip */}
            <div className="xl:col-span-7 space-y-10">
              <div className="bg-[var(--clr-surface)]/70 backdrop-blur-md rounded-2xl border border-[var(--clr-primary)]/15 p-8 sm:p-10 shadow-2xl">
                <div className="space-y-6 text-[var(--clr-text-muted)] text-base sm:text-lg leading-relaxed">
                  <p className="drop-cap">
                    Juliet Musgrave, known artistically as Dragonjulzart, was
                    born in Sydney and has lived across regional New South Wales
                    and the Sydney suburbs. She moved to South-East Queensland
                    in the 1990s, where she raised her family and pursued a
                    career in horticulture and natural resource management. She
                    now resides in the beautiful Mary Valley, Queensland.
                  </p>

                  <p>
                    Art has long been a passion for Juliet, evolving through
                    periods of exploration across various mediums including
                    graphite, charcoal, oil pastel, soft pastel, and acrylic.
                    She enjoys creative activities such as weaving with
                    cat&apos;s claw and natural fibres, painting wearable art,
                    sign writing, and contributing to small volunteer projects.
                    Through her work, she encourages people of all ages to
                    experience the joy and mindfulness of creating.
                  </p>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      showFullBio
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-6 pt-2">
                      <p>
                        In recent years, life events have refocused art as a
                        central form of self-expression. Her work is influenced
                        by Australian and European Realist and Impressionist
                        artists including Fred McCubbin, Tom Roberts, Monet, Van
                        Gogh, Albert Namatjira, and, more recently, Chris Postle
                        and Kerri Dixon.
                      </p>

                      <p>
                        Juliet creates for enjoyment and mindfulness, aiming to
                        capture the essence and character of her subjects
                        through form, colour, and light. Her art often reflects
                        her love of nature, horizons, rustic relics, and the
                        Australian landscape.
                      </p>

                      <p>
                        She has completed several small murals that can be
                        viewed at Top Café Kenilworth, with wearable artworks
                        displayed at Wild Pixie in Amamoor on weekends. In 2023,
                        Juliet received Highly Commended in the Novice section
                        of the Mary Valley Art Fest for Bad to the Bone, and
                        Highly Commended again in the Gourmay section of the
                        Kenilworth Art Show 2025 for Big Red.
                      </p>

                      <p>
                        Many of Juliet&apos;s creations can be viewed on
                        Instagram at @Dragonjulzart.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="flex items-center space-x-2 text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors font-semibold mt-2"
                  >
                    <span>{showFullBio ? "Read Less" : "Read More"}</span>
                    {showFullBio ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Award-winning works + certificate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <figure className="group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[var(--clr-primary)]/25 shadow-lg mb-3">
                    <Image
                      src="/artist/1_Bad to the bone soft pastel _novice_Mary Valley art 2023.webp"
                      alt="Bad to the Bone, soft pastel"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <figcaption className="text-sm text-[var(--clr-text-muted)] text-center">
                    <span className="font-display font-semibold text-[var(--clr-text)]">
                      Bad to the Bone
                    </span>
                    <br />
                    Highly Commended, Novice — Mary Valley Art Fest 2023
                  </figcaption>
                </figure>

                <figure className="group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[var(--clr-primary)]/25 shadow-lg mb-3">
                    <Image
                      src="/artist/2_Big Red_ pastel_highly commended_Gourmay_Kenilworth Art Fest 2025.webp"
                      alt="Big Red, pastel"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <figcaption className="text-sm text-[var(--clr-text-muted)] text-center">
                    <span className="font-display font-semibold text-[var(--clr-text)]">
                      Big Red
                    </span>
                    <br />
                    Highly Commended, Gourmay — Kenilworth Art Show 2025
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Portrait + socials + Instagram CTA (bottom right) */}
            <div className="xl:col-span-5 flex flex-col items-center xl:items-end gap-10">
              <div className="w-full max-w-md bg-[var(--clr-surface)]/80 backdrop-blur-md rounded-2xl p-10 border border-[var(--clr-primary)]/20 shadow-2xl">
                <div className="text-center">
                  <div className="relative w-56 h-56 rounded-full mx-auto mb-8 overflow-hidden border-2 border-[var(--clr-primary)]/40 ring-4 ring-[var(--clr-bg)]/50">
                    <Image
                      src="/julz_image.webp"
                      alt="Juliet Musgrave"
                      fill
                      className="object-cover"
                      sizes="224px"
                    />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[var(--clr-text)] mb-2">
                    Juliet &quot;Julz&quot; Musgrave
                  </h3>
                  <p className="text-[var(--clr-text-muted)] text-lg mb-6">
                    Wildlife Artist & Community Storyteller
                  </p>

                  <div className="flex justify-center gap-5">
                    <a
                      href="https://instagram.com/dragonjulzart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="mailto:juliet@dragonjulzart.com"
                      className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram follow CTA + official post embeds */}
              <div className="w-full max-w-md bg-[var(--clr-surface)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--clr-primary)]/20 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-bold text-[var(--clr-text)] mb-2 flex items-center justify-center gap-2">
                    <Instagram className="w-6 h-6 text-[var(--clr-primary)]" />
                    Follow @dragonjulzart
                  </h3>
                  <p className="text-[var(--clr-text-muted)] text-sm mb-4">
                    Juliet is contactable on Instagram for commissions and updates.
                  </p>
                  <a
                    href={INSTAGRAM_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--clr-primary)]/20 hover:bg-[var(--clr-primary)]/30 text-[var(--clr-primary)] font-semibold px-5 py-2.5 transition-colors"
                  >
                    View profile on Instagram
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                {INSTAGRAM_EMBED_POSTS.length > 0 && (
                  <div className="w-full [&_.instagram-media]:max-w-full [&_.instagram-media]:!min-w-0">
                    {INSTAGRAM_EMBED_POSTS.slice(0, 1).map((permalink) => (
                      <blockquote
                        key={permalink}
                        className="instagram-media w-full"
                        data-instgrm-permalink={permalink}
                        data-instgrm-version="14"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {INSTAGRAM_EMBED_POSTS.length > 0 && (
          <Script
            src="https://www.instagram.com/embed.js"
            strategy="lazyOnload"
          />
        )}
      </section>

      {/* CTA Section - wide banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--clr-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-6">
            Shop Originals & Hand-painted T-shirts
          </h3>
          <p className="text-[var(--clr-text-muted)] mb-8 max-w-2xl mx-auto">
            Bring the wild spirit of our community into your home with original
            artwork and limited edition prints
          </p>
          <a
            href="#contact"
            className="bg-[var(--clr-accent)] text-[var(--clr-surface)] px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium inline-flex items-center uppercase tracking-wider"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shop Now
          </a>
        </div>
      </section>

      {/* Footer - four-column grid */}
      <footer className="bg-[var(--clr-surface)] text-[var(--clr-text)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo Column */}
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Dragon Julz Art Logo"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="font-display font-semibold">
                Dragon Julz Art
              </span>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#gallery"
                    className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#whats-on"
                    className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                  >
                    What&apos;s On
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div id="contact">
              <h4 className="font-display font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-[var(--clr-text-muted)]">
                  juliet@dragonjulzart.com
                </li>
                <li className="text-[var(--clr-text-muted)]">
                  Mary Valley, Queensland
                </li>
                <li className="text-[var(--clr-text-muted)]">
                  Available for commissions
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-display font-semibold mb-4">Follow</h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/dragonjulzart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:dragonjulzart@gmail.com"
                  className="text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--clr-primary)]/20 text-center text-[var(--clr-text-muted)]">
            <p>
              &copy; 2026 Dragon Julz Art. Celebrating wildlife and community
              through art.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
