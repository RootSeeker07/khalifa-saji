import React from 'react';
import { Flame, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#08090b] border-t border-white/10 text-zinc-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Khalifa Balochi Sajji
              </span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Lahore’s premier destination for authentic Balochi slow-roasted poultry, bubbling clay-pot Handis, wok-tossed Karahis, and charcoal tandoor specialties.
            </p>

            <div className="pt-2 flex flex-col space-y-1.5 text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Daily: 1:00 PM – 3:00 AM PKT</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Indigo Canal, 14 No. Plaza, Jallo Branch, Lahore</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Menu & Prices
                </a>
              </li>
              <li>
                <a href="#platters" className="hover:text-amber-400 transition-colors">
                  Family Platters
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  Our Culinary Story
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-amber-400 transition-colors">
                  Lahore Branch Network
                </a>
              </li>
            </ul>
          </div>

          {/* Top Specialties */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Specialties
            </h4>
            <ul className="space-y-2">
              <li>Balochi Chicken Sajji</li>
              <li>Kala-Rahu Grill Fish</li>
              <li>Special Fry Mutton Chanp</li>
              <li>Chicken & Mutton Karahi</li>
              <li>Chicken Cheese Handi</li>
              <li>Tandoori Roghni Naan</li>
            </ul>
          </div>

          {/* Direct Order Hotline */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Call to Order
            </h4>
            <p className="text-zinc-400 text-xs">
              Direct dispatch hotline for Jallo, Canal Road, and surrounding societies:
            </p>
            <div className="space-y-2 pt-1 font-mono font-bold text-sm">
              <a
                href="tel:+923008002946"
                className="flex items-center gap-2 text-amber-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>0300 8002946</span>
              </a>
              <a
                href="tel:+923008002947"
                className="flex items-center gap-2 text-amber-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>0300 8002947</span>
              </a>
            </div>
            <div className="pt-2 text-[11px] text-zinc-500">
              Cash on Delivery (COD) available across Lahore.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} Khalifa Balochi Sajji (Jallo Branch Lahore). All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-amber-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
