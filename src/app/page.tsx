"use client";

import {
  Instagram,
  Facebook,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShoppingBag,
  Calendar,
  Award,
} from "lucide-react";
import GalleryWrapper from "./components/GalleryWrapper";
import { useState } from "react";
import { useCart } from "./context/CartContext";

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
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Dragon Julz Art Logo"
                  className="w-full h-full object-cover"
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
                Enter the Gallery
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

      {/* About Section - two-column: portrait / bio text */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--clr-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Bio Content */}
            <div className="lg:order-2">
              <h3 className="text-4xl font-display font-bold mb-6 text-[var(--clr-text)]">
                About Juliet & Our Community
              </h3>

              <div className="space-y-4 text-[var(--clr-text-muted)]">
                <p className="drop-cap">
                  Juliet Musgrave - Dragonjulzart. Born in Sydney and lived
                  throughout regional country NSW and Sydney suburbs. Moved to
                  South-East Queensland in the 1990&apos;s, raising my family
                  and pursuing a career in horticulture and natural resources.
                  Currently, I live in the beautiful Mary Valley Queensland.
                </p>

                <p>
                  Art has mainly been a hobby, with periods of dabbling in
                  various mediums of graphite, charcoal, oil pastel, soft pastel
                  and acrylic. I enjoy various creative activities of weaving
                  with cats claw and natural fibres, painting wearable art, sign
                  writing and small volunteer projects while encouraging all
                  ages to enjoy the magic of creating.
                </p>

                {/* Hidden content that shows on read more */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showFullBio ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-4">
                    <p>
                      Recent life events have refocused art as an important
                      aspect of my self-expression. I am greatly influenced by
                      Australian and European Realism and Impressionists
                      including Fred Mc Cubbin, Tom Roberts, Monet, Van Gogh,
                      Albert Namatjira and more recently Chris Postle and Kerri
                      Dixon.
                    </p>

                    <p>
                      I create for enjoyment, mindfulness and to capture the
                      essence and character of my subject through form, colour
                      and light, with focus on my love of nature, horizons,
                      rustic relics and the Australian landscape in general.
                    </p>

                    <p>
                      I have completed several small murals which can be viewed
                      at Top Café Kenilworth along with wearable artwork
                      displayed at Wild Pixie in Amamoor on weekends. In 2023 I
                      received highly commended Novice section at Mary Valley
                      Art Fest for &quot;Bad to the Bone&quot; and highly
                      commended for &quot;Big Red&quot; Gourmay section in
                      Kenilworth Art Show 2025.
                    </p>

                    <p>
                      Many of my creations are displayed on my Instagram page
                      @Dragonjulzart.
                    </p>
                  </div>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="flex items-center space-x-2 text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors font-medium mt-4"
                >
                  <span>{showFullBio ? "Read Less" : "Read More"}</span>
                  {showFullBio ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="lg:order-1">
              <div className="bg-[var(--clr-surface)]/60 backdrop-blur-sm rounded-2xl p-8 border border-[var(--clr-primary)]/20">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden border-2 border-[var(--clr-primary)]/30">
                    <img
                      src="/logo.jpg"
                      alt="Juliet Musgrave"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-xl font-display font-semibold text-[var(--clr-text)] mb-2">
                    Juliet &quot;Julz&quot; Musgrave
                  </h4>
                  <p className="text-[var(--clr-text-muted)] mb-4">
                    Wildlife Artist & Community Storyteller
                  </p>

                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://instagram.com/dragonjulzart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:juliet@dragonjulzart.com"
                      className="text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's On Section - horizontally scrollable cards */}
      <section
        id="whats-on"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--clr-surface)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-4">
              What&apos;s On
            </h3>
            <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
              Current exhibitions, murals, and recent achievements
            </p>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {/* Current Show Card */}
            <div className="bg-[var(--clr-surface)]/60 backdrop-blur-sm rounded-xl p-6 border border-[var(--clr-primary)]/20 min-w-[300px] flex-shrink-0 hover:border-[var(--clr-accent)]/40 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-[var(--clr-accent)] mr-3" />
                <h4 className="text-lg font-display font-semibold text-[var(--clr-text)]">
                  Current Show
                </h4>
              </div>
              <p className="text-[var(--clr-text-muted)] mb-4">
                Mary Valley Art Fest 2024 - Featuring &quot;Bad to the
                Bone&quot; and other wildlife pieces
              </p>
              <div className="h-32 bg-gradient-to-br from-[var(--clr-primary)]/20 to-[var(--clr-secondary)]/20 rounded-lg mb-4"></div>
              <a
                href="#"
                className="text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors font-medium group-hover:underline"
              >
                View Details →
              </a>
            </div>

            {/* Murals Card */}
            <div className="bg-[var(--clr-surface)]/60 backdrop-blur-sm rounded-xl p-6 border border-[var(--clr-primary)]/20 min-w-[300px] flex-shrink-0 hover:border-[var(--clr-accent)]/40 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-[var(--clr-accent)] mr-3" />
                <h4 className="text-lg font-display font-semibold text-[var(--clr-text)]">
                  Murals
                </h4>
              </div>
              <p className="text-[var(--clr-text-muted)] mb-4">
                Visit Top Café Kenilworth to see several small murals and
                wearable artwork at Wild Pixie in Amamoor
              </p>
              <div className="h-32 bg-gradient-to-br from-[var(--clr-accent)]/20 to-[var(--clr-primary)]/20 rounded-lg mb-4"></div>
              <a
                href="#"
                className="text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors font-medium group-hover:underline"
              >
                Visit Locations →
              </a>
            </div>

            {/* Awards Card */}
            <div className="bg-[var(--clr-surface)]/60 backdrop-blur-sm rounded-xl p-6 border border-[var(--clr-primary)]/20 min-w-[300px] flex-shrink-0 hover:border-[var(--clr-accent)]/40 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-[var(--clr-accent)] mr-3" />
                <h4 className="text-lg font-display font-semibold text-[var(--clr-text)]">
                  Recent Awards
                </h4>
              </div>
              <p className="text-[var(--clr-text-muted)] mb-4">
                Highly commended for &quot;Bad to the Bone&quot; at Mary Valley
                Art Fest 2023 and &quot;Big Red&quot; at Kenilworth Art Show
                2025
              </p>
              <div className="h-32 bg-gradient-to-br from-[var(--clr-secondary)]/20 to-[var(--clr-accent)]/20 rounded-lg mb-4"></div>
              <a
                href="#"
                className="text-[var(--clr-primary)] hover:text-[var(--clr-accent)] transition-colors font-medium group-hover:underline"
              >
                View Achievements →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - wide banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--clr-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-6">
            Shop Originals & Prints
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
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Dragon Julz Art Logo"
                  className="w-full h-full object-cover"
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
              &copy; 2025 Dragon Julz Art. Celebrating wildlife and community
              through art.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
