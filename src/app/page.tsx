"use client";

import {
  Instagram,
  Facebook,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShoppingBag,
  Menu,
  X,
  CalendarDays,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import GalleryWrapper from "./components/GalleryWrapper";
import MuralsGrid from "./components/MuralsGrid";
import { useId, useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import Image from "next/image";
import Script from "next/script";
import type { StripeProduct } from "./api/products/route";

declare global {
  interface Window {
    FB?: {
      XFBML: { parse(node?: Document | HTMLElement): void };
    };
  }
}

const NAV_LINKS = [
  { href: "#gallery", label: "Featured Works" },
  { href: "#murals", label: "Murals" },
  { href: "#tshirts", label: "T-Shirts" },
  { href: "#whats-on", label: "What's On" },
  { href: "#about", label: "About" },
];

function BrushDivider({ className = "" }: { className?: string }) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 120 16"
      className={`brush-divider ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="120"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--clr-secondary)" />
          <stop offset="0.5" stopColor="var(--clr-accent)" />
          <stop offset="1" stopColor="var(--clr-accent-2)" />
        </linearGradient>
      </defs>
      <path
        d="M2 8c10-8 20 8 30 0s20-8 30 0 20 8 30 0 20-8 26 0"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--clr-secondary)] mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-5xl sm:text-6xl font-display font-bold ${light ? "text-white" : "text-[var(--clr-text)]"}`}
      >
        {title}
      </h2>
      <BrushDivider className="mx-auto mt-3 mb-5" />
      {description && (
        <p
          className={`max-w-2xl mx-auto leading-relaxed ${light ? "text-white/80" : "text-[var(--clr-text-muted)]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [showFullBio, setShowFullBio] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [exhibitionPainting, setExhibitionPainting] =
    useState<StripeProduct | null>(null);
  const [loadingExhibition, setLoadingExhibition] = useState(true);
  const { openCart, count } = useCart();
  const isSold = exhibitionPainting?.metadata?.sold?.toLowerCase() === "true";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json() as Promise<StripeProduct[]>)
      .then((products) => {
        const painting = products.find(
          (p) => p.metadata?.status === "exhibition",
        );
        setExhibitionPainting(painting || null);
      })
      .catch((err) => {
        console.error("Failed to load exhibition painting:", err);
        setExhibitionPainting(null);
      })
      .finally(() => setLoadingExhibition(false));
  }, []);

  useEffect(() => {
    window.FB?.XFBML.parse();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--clr-bg)] text-[var(--clr-text-muted)]">
      <div id="fb-root" />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => window.FB?.XFBML.parse()}
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[var(--clr-bg)]/90 backdrop-blur-md border-b border-[var(--clr-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2.5">
            <a href="#" className="relative h-11 w-40 sm:h-12 sm:w-44 shrink-0">
              <Image
                src="/logo-header-dark.webp"
                alt="DragonJulzArt"
                fill
                className="object-contain object-left"
                sizes="200px"
                priority
              />
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--clr-text)] hover:text-[var(--clr-secondary)] transition-colors uppercase tracking-wider text-xs font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={openCart}
                className="relative p-2.5 text-[var(--clr-primary)] hover:text-[var(--clr-secondary)] transition-colors cursor-pointer"
                aria-label={`Open cart${count > 0 ? ` (${count} items)` : ""}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--clr-button)] text-white text-[10px] font-semibold leading-none">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileNavOpen((v) => !v)}
                className="md:hidden p-2.5 text-[var(--clr-primary)] cursor-pointer"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileNavOpen}
              >
                {mobileNavOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {mobileNavOpen && (
            <nav className="md:hidden flex flex-col pb-4 border-t border-[var(--clr-border)] pt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="py-2.5 text-[var(--clr-text)] uppercase tracking-wider text-sm font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        {/* Decorative soft colour blobs, echoing the logo palette */}
        <div
          className="absolute -top-24 -left-32 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-[var(--clr-accent)]/15 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -right-24 w-96 h-96 sm:w-[32rem] sm:h-[32rem] rounded-full bg-[var(--clr-secondary)]/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-[var(--clr-accent-2)]/15 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-delayed opacity-0">
          <h1 className="sr-only">
            DragonJulzArt — Wildlife Art by Juliet Musgrave
          </h1>
          <div className="relative w-full max-w-md sm:max-w-xl mx-auto aspect-[1600/849] mb-6">
            <Image
              src="/logo-trimmed-dark.webp"
              alt="DragonJulzArt — a dragon's eye watches over hand-lettered logo type, with a paintbrush, pencil and palette"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 90vw, 640px"
              priority
            />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--clr-text)] leading-[1.15] mb-6">
            Celebrating Wildlife and Community
            <span className="text-[var(--clr-secondary)] block">
              Through Art
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--clr-text-muted)] max-w-2xl mx-auto mb-9 leading-relaxed">
            Original soft pastel and charcoal paintings, street murals and
            hand-painted wearable art from Juliet &quot;Julz&quot; Musgrave,
            capturing native wildlife and the character of the Mary Valley.
          </p>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 bg-[var(--clr-button)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--clr-button-hover)] font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            See the Gallery
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Featured Works */}
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Original Artwork"
            title="Featured Works"
            description="A selection of original wildlife pieces, painted in soft pastel and charcoal — each one a one-off, ready to find a new home."
          />
          <GalleryWrapper />
        </div>
      </section>

      {/* Murals & Commissions */}
      <section
        id="murals"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--clr-surface)]"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Murals &amp; Commissions"
            title="Out in the Community"
            description="From Kenilworth street murals to intimate pet portraits — freehand work in charcoal, pastel and paint, out in the world and on commission."
          />
          <MuralsGrid />
        </div>
      </section>

      {/* Hand-Painted T-Shirts */}
      <section id="tshirts" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Wearable Art"
            title="Hand-Painted T-Shirts"
            description="Every shirt is painted freehand by Juliet, start to finish — a one-of-a-kind original, never a print or reproduction."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            <div className="bg-[var(--clr-bg)] border border-[var(--clr-border)] rounded-2xl p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--clr-secondary)] mb-2">
                Starting from
              </p>
              <p className="text-3xl font-display font-bold text-[var(--clr-text)] mb-2">
                $40 AUD
              </p>
              <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">
                Simple single-colour designs start around $40; more detailed
                multi-colour pieces run up to $60+, plus postage. Final price
                depends on design complexity and garment size.
              </p>
            </div>
            <div className="bg-[var(--clr-bg)] border border-[var(--clr-border)] rounded-2xl p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--clr-secondary)] mb-2">
                Turnaround
              </p>
              <p className="text-3xl font-display font-bold text-[var(--clr-text)] mb-2">
                By enquiry
              </p>
              <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">
                Each shirt is hand-painted to order, so timing depends on the
                current order queue — get in touch for the latest estimate
                before ordering.
              </p>
            </div>
            <div className="bg-[var(--clr-bg)] border border-[var(--clr-border)] rounded-2xl p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--clr-secondary)] mb-2">
                Care
              </p>
              <p className="text-3xl font-display font-bold text-[var(--clr-text)] mb-2">
                Pre-washed &amp; heat-set
              </p>
              <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">
                Painted on pre-washed cotton and heat-treated to set the
                fabric paint. Gentle machine wash recommended for lasting
                colour.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h3 className="text-2xl font-display font-bold text-[var(--clr-text)] mb-4">
                How to order
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-[var(--clr-secondary)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--clr-text-muted)]">
                    Send a DM on Instagram to{" "}
                    <a
                      href="https://instagram.com/dragonjulzart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--clr-secondary)] font-medium hover:underline"
                    >
                      @dragonjulzart
                    </a>{" "}
                    with your design idea, preferred garment and size.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <Facebook className="w-5 h-5 text-[var(--clr-secondary)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--clr-text-muted)]">
                    Message the{" "}
                    <a
                      href="https://www.facebook.com/people/Dragonjulzart/61587805475402/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--clr-secondary)] font-medium hover:underline"
                    >
                      DragonJulzArt Facebook page
                    </a>
                    .
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--clr-secondary)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--clr-text-muted)]">
                    Or find finished pieces in person through{" "}
                    <span className="font-medium text-[var(--clr-text)]">
                      Wild Pixie Arts
                    </span>
                    , 6 Busby St, Amamoor — weekends, 9:30am-1pm.
                  </p>
                </li>
              </ul>
              <p className="text-sm text-[var(--clr-text-soft)] mt-6">
                Please include your measurements when ordering, as sizing
                varies between brands.
              </p>
            </div>

            <div className="bg-[var(--clr-bg)] border border-[var(--clr-border)] rounded-2xl p-7">
              <h3 className="text-xl font-display font-bold text-[var(--clr-text)] mb-3">
                One-of-a-kind, not a print
              </h3>
              <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed mb-4">
                Every shirt, tote and cushion starts as a blank piece of
                pre-washed cotton and is painted freehand by Juliet — there is
                no screen, transfer or print involved. Because each piece is
                painted individually, no two are ever quite the same.
              </p>
              <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">
                Limited-edition art prints (paper, not fabric) are available
                separately for most original paintings, each with a letter of
                authenticity — ask when you enquire.
              </p>
            </div>
          </div>

          {/* Shirt design gallery */}
          <div>
            <h3 className="text-2xl font-display font-bold text-[var(--clr-text)] mb-6 text-center">
              A Few Designs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  src: "/shirts/T_clucka tshirt_40.webp",
                  alt: "Clucka hand-painted t-shirt design",
                  title: "Clucka",
                },
                {
                  src: "/shirts/T_rust in peace shirt_60.webp",
                  alt: "Rust in Peace hand-painted t-shirt design",
                  title: "Rust in Peace",
                },
                {
                  src: "/shirts/T_tshirt_highland cow_60.webp",
                  alt: "Highland Cow hand-painted t-shirt design",
                  title: "Highland Cow",
                },
                {
                  src: "/shirts/T_Unicorn_40.webp",
                  alt: "Unicorn hand-painted t-shirt design",
                  title: "Unicorn",
                },
              ].map(({ src, alt, title }) => (
                <figure key={src} className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--clr-border)] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <figcaption className="text-center text-sm text-[var(--clr-text-muted)] mt-2.5">
                    {title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's On */}
      <section
        id="whats-on"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--clr-surface)]"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Events"
            title="What's On"
            description="Upcoming and recent shows — for the latest updates and event photos, follow along on Facebook."
          />

          <div className="bg-[var(--clr-bg)] rounded-2xl border border-[var(--clr-border)] overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-10">
              {/* Event Details */}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--clr-secondary)] mb-3">
                  Past Event
                </p>
                <h3 className="text-3xl font-display font-bold text-[var(--clr-text)] mb-4">
                  Kenilworth ArtsFest
                </h3>
                <p className="text-[var(--clr-text-muted)] mb-6">
                  Celebrating local arts and community creativity — Juliet
                  exhibited and received Highly Commended for &quot;Big
                  Red.&quot;
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-4.5 h-4.5 text-[var(--clr-secondary)] shrink-0" />
                    <p className="text-sm font-medium text-[var(--clr-text)]">
                      23-24 May 2025
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4.5 h-4.5 text-[var(--clr-secondary)] shrink-0" />
                    <p className="text-sm font-medium text-[var(--clr-text)]">
                      7 Maleny Kenilworth Rd, Kenilworth QLD 4574
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/events/s/kenilworth-artsfest/2211300316281061/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--clr-secondary)] font-medium text-sm hover:underline w-fit"
                >
                  <Facebook className="w-4 h-4" />
                  View event on Facebook
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Painting Display */}
              <div className="flex items-center justify-center">
                {loadingExhibition ? (
                  <div className="w-full aspect-square bg-[var(--clr-primary)]/5 rounded-xl border border-[var(--clr-border)] flex items-center justify-center min-h-80 animate-pulse" />
                ) : exhibitionPainting ? (
                  <div className="w-full">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--clr-border)] shadow-sm mb-4">
                      <Image
                        src={exhibitionPainting.imageUrl || ""}
                        alt={exhibitionPainting.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {isSold && (
                        <span className="absolute top-3 left-3 bg-[var(--clr-bg)]/85 backdrop-blur-sm text-[var(--clr-secondary)] uppercase text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full shadow-sm">
                          Sold
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-display font-semibold text-[var(--clr-text)] mb-1">
                        {exhibitionPainting.name}
                      </h4>
                      {exhibitionPainting.description && (
                        <p className="text-[var(--clr-text-muted)] text-sm mb-2">
                          {exhibitionPainting.description}
                        </p>
                      )}
                      {isSold ? (
                        <p className="text-[var(--clr-text-soft)] text-sm italic">
                          This piece has found its home.
                        </p>
                      ) : (
                        <p className="text-[var(--clr-secondary)] font-medium text-sm">
                          On display now
                        </p>
                      )}
                      {!isSold && exhibitionPainting.price && (
                        <p className="text-[var(--clr-text-soft)] text-sm mt-1">
                          ${exhibitionPainting.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-[var(--clr-primary)]/[0.03] rounded-xl border border-dashed border-[var(--clr-border)] flex items-center justify-center min-h-80">
                    <div className="text-center">
                      <p className="text-[var(--clr-text-muted)] font-medium">
                        Painting on Display
                      </p>
                      <p className="text-[var(--clr-text-soft)] text-sm mt-1">
                        Coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="The Artist"
            title="About Juliet"
            description="Wildlife artist &amp; community storyteller in the Mary Valley"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Portrait + socials */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--clr-border)] shadow-sm mb-4 max-w-sm mx-auto lg:max-w-none">
                <Image
                  src="/julz-portrait.webp"
                  alt="Juliet Musgrave smiling, holding her Highly Commended certificate at Kenilworth ArtsFest 2025 beside her painting 'Big Red'"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 380px, 320px"
                />
              </div>
              <p className="text-center text-xs text-[var(--clr-text-soft)] max-w-sm mx-auto lg:max-w-none mb-6">
                Juliet at Kenilworth ArtsFest 2025, Highly Commended for
                &quot;Big Red&quot;
              </p>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://instagram.com/dragonjulzart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--clr-primary)] hover:text-[var(--clr-secondary)] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/people/Dragonjulzart/61587805475402/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--clr-primary)] hover:text-[var(--clr-secondary)] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="mailto:dragonjulzart@gmail.com"
                  className="text-[var(--clr-primary)] hover:text-[var(--clr-secondary)] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Bio + awards + FB */}
            <div className="lg:col-span-8 space-y-12">
              <div className="text-base sm:text-lg leading-relaxed space-y-6">
                <p className="drop-cap">
                  Juliet Musgrave, known artistically as DragonJulzArt, was
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
                  className={`overflow-hidden transition-all duration-500 ease-in-out md:!max-h-none md:!opacity-100 ${
                    showFullBio
                      ? "max-h-[800px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-6 pt-1">
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
                      Highly Commended again at the Kenilworth ArtsFest 2025
                      for Big Red.
                    </p>

                    <p>
                      Many of Juliet&apos;s creations can be viewed on
                      Instagram at{" "}
                      <a
                        href="https://instagram.com/dragonjulzart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--clr-secondary)] hover:underline"
                      >
                        @dragonjulzart
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="md:hidden flex items-center space-x-2 text-[var(--clr-secondary)] font-semibold cursor-pointer"
                >
                  <span>{showFullBio ? "Read Less" : "Read More"}</span>
                  {showFullBio ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Award-winning works */}
              <div>
                <h3 className="text-xl font-display font-bold text-[var(--clr-text)] mb-5">
                  Award-Winning Pieces
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <figure>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[var(--clr-border)] shadow-sm mb-3">
                      <Image
                        src="/1_Bad to the bone soft pastel _novice_Mary Valley art 2023.webp"
                        alt="Bad to the Bone, soft pastel painting of a cattle skull"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[var(--clr-bg)]/85 backdrop-blur-sm text-[var(--clr-secondary)] text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                        Highly Commended
                      </span>
                    </div>
                    <figcaption className="text-sm text-[var(--clr-text-muted)]">
                      <span className="font-display font-semibold text-lg text-[var(--clr-text)]">
                        Bad to the Bone
                      </span>
                      <br />
                      Mary Valley Art Fest 2023, Novice section
                    </figcaption>
                  </figure>

                  <figure>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[var(--clr-border)] shadow-sm mb-3">
                      <Image
                        src="/2_Big Red_ pastel_highly commended_Gourmay_Kenilworth Art Fest 2025.webp"
                        alt="Big Red, soft pastel portrait of a white rooster"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[var(--clr-bg)]/85 backdrop-blur-sm text-[var(--clr-secondary)] text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                        Highly Commended
                      </span>
                    </div>
                    <figcaption className="text-sm text-[var(--clr-text-muted)]">
                      <span className="font-display font-semibold text-lg text-[var(--clr-text)]">
                        Big Red
                      </span>
                      <br />
                      Kenilworth ArtsFest 2025
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Facebook follow */}
              <div className="bg-[var(--clr-surface)] rounded-2xl p-7 sm:p-8 border border-[var(--clr-border)]">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-bold text-[var(--clr-text)] mb-2 flex items-center justify-center gap-2">
                    <Facebook className="w-5 h-5 text-[var(--clr-secondary)]" />
                    Follow Along on Facebook
                  </h3>
                  <p className="text-[var(--clr-text-muted)] text-sm mb-4">
                    Community updates, new pieces and upcoming events.
                  </p>
                  <a
                    href="https://www.facebook.com/profile.php?id=61587805475402"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--clr-secondary)] font-medium text-sm hover:underline"
                  >
                    View page on Facebook
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div
                  id="follow"
                  className="w-full flex justify-center overflow-hidden rounded-xl"
                >
                  <div
                    className="fb-page"
                    data-href="https://www.facebook.com/profile.php?id=61587805475402"
                    data-tabs="timeline,events"
                    data-width="380"
                    data-hide-cover="false"
                    data-show-facepile="false"
                    data-adapt-container-width="true"
                  >
                    <blockquote
                      cite="https://www.facebook.com/profile.php?id=61587805475402"
                      className="fb-xfbml-parse-ignore"
                    >
                      <a
                        href="https://www.facebook.com/profile.php?id=61587805475402"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Dragonjulzart
                      </a>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--clr-footer)] border-t border-[var(--clr-border)] text-white/90 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Logo */}
            <div>
              <div className="relative h-11 w-40 mb-4">
                <Image
                  src="/logo-header-dark.webp"
                  alt="DragonJulzArt"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Celebrating wildlife and community through art.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4 text-white">
                Explore
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 hover:text-[var(--clr-accent-2)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4 text-white">
                Location
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Mary Valley, Queensland</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Wild Pixie Arts, Amamoor
                    <br />
                    Weekends, 9:30am-1pm
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Commissions welcome by enquiry</span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4 text-white">
                Follow &amp; Contact
              </h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://instagram.com/dragonjulzart"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[var(--clr-accent-2)] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/people/Dragonjulzart/61587805475402/"
                  title="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[var(--clr-accent-2)] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:dragonjulzart@gmail.com"
                  className="text-white/80 hover:text-[var(--clr-accent-2)] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <a
                href="mailto:dragonjulzart@gmail.com"
                className="text-sm text-white/70 hover:text-[var(--clr-accent-2)] transition-colors"
              >
                dragonjulzart@gmail.com
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/15 text-center text-sm text-white/50">
            <p>
              &copy; {new Date().getFullYear()} DragonJulzArt. Celebrating
              wildlife and community through art.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
