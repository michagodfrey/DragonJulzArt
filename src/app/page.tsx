import { Instagram, Facebook, Twitter, Mail, MapPin } from "lucide-react";
import GalleryWrapper from "./components/GalleryWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Dragon Julz Art
                </h1>
                <p className="text-sm text-slate-600">
                  Juliet&apos;s Wildlife Gallery
                </p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#gallery"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Capturing the Wild Spirit of
              <span className="text-blue-600"> Our Community</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Through the eyes of local wildlife, I tell the story of our shared
              landscape - where nature meets community, and every brushstroke
              celebrates the beauty around us.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#gallery"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Explore Gallery
              </a>
              <a
                href="#about"
                className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Featured Works
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A glimpse into the wild beauty that surrounds our community,
              captured through the lens of artistic expression.
            </p>
          </div>

          <GalleryWrapper />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                About Juliet & Our Community
              </h3>
              <div className="space-y-4 text-slate-700">
                <p>
                  As a local artist deeply connected to our community, I find
                  inspiration in the wildlife that shares our landscape. Each
                  painting tells a story - not just of the animals themselves,
                  but of the places we call home.
                </p>
                <p>
                  From the red foxes that visit our backyards to the eagles
                  soaring above our hills, these creatures are as much a part of
                  our community as we are. Through my art, I celebrate this
                  connection and invite others to see the beauty in our shared
                  environment.
                </p>
                <p>
                  My work is more than just wildlife art; it&apos;s a tribute to
                  the natural world that surrounds us and a reminder of the
                  importance of preserving these spaces for future generations.
                </p>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">
                  Based in our local community
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">
                    Juliet &quot;Julz&quot;
                  </h4>
                  <p className="text-slate-600 mb-4">
                    Wildlife Artist & Community Storyteller
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Connect & Commission
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Interested in a custom piece or want to learn more about my work?
            I&apos;m always happy to connect with fellow nature lovers and art
            enthusiasts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Email</h4>
              <p className="text-slate-600">juliet@dragonjulzart.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Instagram</h4>
              <p className="text-slate-600">@dragonjulzart</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Location</h4>
              <p className="text-slate-600">Local Community</p>
            </div>
          </div>

          <a
            href="mailto:juliet@dragonjulzart.com"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <span className="font-semibold">Dragon Julz Art</span>
            </div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>
              &copy; 2024 Dragon Julz Art. Celebrating wildlife and community
              through art.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
