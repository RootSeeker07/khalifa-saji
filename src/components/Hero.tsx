import React from 'react';
import { Flame, PhoneCall, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { LiveStatusBadge } from './LiveStatusBadge';
import { ASSET_IMAGES } from '../data/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onExplorePlatters: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onExplorePlatters,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-white/5">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-amber-600/15 via-red-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-amber-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Live Status and Branch Indicator */}
            <div className="flex flex-wrap items-center gap-3">
              <LiveStatusBadge />
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Jallo Canal Road, Lahore</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                The Authentic Taste of Balochistan in Lahore
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FFF1D0] tracking-tight leading-[1.08] text-balance">
                Khalifa Balochi Sajji <br />
                <span className="text-gold-gradient">Jallo Branch</span>
              </h1>
              <p className="font-body text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl text-balance pt-1">
                The King of Slow-Roasted Sajji and Authentic Pakistani Cuisine in Lahore.
                Whole succulent skewered chickens slow-roasted over fragrant wood embers,
                sizzling karahis, clay-pot handis, and charcoal-grilled barbeque.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 rounded-xl shadow-lg shadow-amber-950/40 hover:shadow-amber-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Full Menu & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplorePlatters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-amber-200 bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400/60 rounded-xl transition-all cursor-pointer"
              >
                <span>Family Platters (From PKR 3,000)</span>
              </button>
            </div>

            {/* Direct Phone Ordering Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Direct Order Hotline:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:+923008002946"
                  className="font-mono font-bold text-amber-300 hover:text-white transition-colors underline decoration-amber-500/40 underline-offset-4"
                >
                  0300 8002946
                </a>
                <span className="text-zinc-600">/</span>
                <a
                  href="tel:+923008002947"
                  className="font-mono font-bold text-amber-300 hover:text-white transition-colors underline decoration-amber-500/40 underline-offset-4"
                >
                  0300 8002947
                </a>
              </div>
            </div>

            {/* Trust Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-xl">
              <div className="flex flex-col space-y-1">
                <span className="font-mono text-sm sm:text-base font-bold text-[#FFF1D0]">100% Halal</span>
                <span className="text-[11px] sm:text-xs text-zinc-400">Fresh meat slaughtered daily</span>
              </div>
              <div className="flex flex-col space-y-1 border-x border-white/10 px-3">
                <span className="font-mono text-sm sm:text-base font-bold text-[#FFF1D0]">Slow Pit Coal</span>
                <span className="text-[11px] sm:text-xs text-zinc-400">Authentic Baloch embers</span>
              </div>
              <div className="flex flex-col space-y-1 pl-2">
                <span className="font-mono text-sm sm:text-base font-bold text-[#FFF1D0]">Fast Delivery</span>
                <span className="text-[11px] sm:text-xs text-zinc-400">Canal Rd & Lahore radius</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative glass-card rounded-2xl overflow-hidden border border-amber-500/30">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={ASSET_IMAGES.heroSajji}
                    alt="Authentic Balochi Sajji roasting over fragrant wood embers"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-[#0e0f13]/30 to-transparent pointer-events-none" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold font-mono tracking-wide uppercase text-amber-300 bg-[#0e0f13]/90 backdrop-blur-md border border-amber-500/50 rounded-full shadow-lg">
                      <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      Balochi Slow Pit
                    </span>
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">Signature Dish</span>
                        <h3 className="font-display text-base font-bold text-white">Full Balochi Sajji</h3>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-amber-300">PKR 2,600</span>
                        <span className="block text-[10px] text-zinc-400">With Spiced Rice option</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative mini chip */}
              <div className="absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2 p-2.5 rounded-xl glass-panel border border-amber-500/30 shadow-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  Open till 3:00 AM · Late Night Dining
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
