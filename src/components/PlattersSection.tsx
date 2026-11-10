import React from 'react';
import { Users, CheckCircle2, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import { PLATTER_DEALS } from '../data/menuData';
import { PlatterDeal } from '../types';

interface PlattersSectionProps {
  onAddPlatter: (platter: PlatterDeal) => void;
}

export const PlattersSection: React.FC<PlattersSectionProps> = ({
  onAddPlatter,
}) => {
  return (
    <section id="platters" className="py-16 md:py-24 bg-[#0a0b0e] relative">
      {/* Decorative top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Family Bundles & Savings Deals</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF1D0] tracking-tight text-balance">
            Khalifa’s Royal Family Platters
          </h2>
          <p className="font-body text-sm sm:text-base text-zinc-400 leading-relaxed text-balance">
            Curated grand feasts crafted for intimate gatherings and grand family celebrations.
            Complete with Sajji, handi, mixed barbeque skewers, freshly baked tandoori naans, and authentic desserts.
          </p>
        </div>

        {/* Platters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PLATTER_DEALS.map((platter, index) => {
            const isFeatured = index === 1; // Jumbo Platter is often the sweet spot
            return (
              <div
                key={platter.id}
                className={`group relative flex flex-col justify-between rounded-2xl glass-card glass-card-hover overflow-hidden transition-all duration-300 ${
                  isFeatured
                    ? 'border-amber-500/50 ring-1 ring-amber-500/30 shadow-[0_10px_35px_-5px_rgba(245,158,11,0.15)] bg-gradient-to-b from-[#1b1c24] to-[#121319]'
                    : 'border-white/10'
                }`}
              >
                {/* Platter Header with image preview */}
                <div className="relative">
                  {platter.image && (
                    <div className="aspect-[16/10] w-full overflow-hidden relative">
                      <img
                        src={platter.image}
                        alt={platter.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121319] via-[#121319]/40 to-transparent" />
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-bold font-mono tracking-wider uppercase rounded shadow ${
                        isFeatured
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-900/90 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {platter.badge || 'Deal'}
                    </span>
                  </div>

                  {/* Serves pill */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-amber-200">
                    <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {platter.serves}
                    </span>
                  </div>
                </div>

                {/* Platter Details Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Platter Title & Price */}
                    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                          {platter.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                          {platter.description}
                        </p>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="py-4 flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">Special Package Price</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-mono text-xs text-amber-400">PKR</span>
                          <span className="font-mono text-3xl font-black text-[#FFF1D0]">
                            {platter.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded">
                        Full Banquet
                      </span>
                    </div>

                    {/* Exact Inclusions List */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold flex items-center gap-1.5">
                        <Flame className="w-3 h-3 text-amber-500" />
                        Package Includes:
                      </span>
                      <ul className="space-y-1.5 pt-1 text-xs text-zinc-300">
                        {platter.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Add to Order Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => onAddPlatter(platter)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isFeatured
                          ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 hover:from-amber-500 hover:to-red-500 text-white shadow-lg shadow-amber-950/40 hover:scale-[1.02]'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-amber-200 border border-amber-500/30 hover:border-amber-400'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Platter to Order</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Catering & Bulk Order Note */}
        <div className="mt-12 p-4 sm:p-6 rounded-2xl glass-card border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Planning a Larger Family Dawat or Wedding Event?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Custom whole live sheep Sajji and bulk karahi catering available at Jallo Branch Lahore.
              </p>
            </div>
          </div>
          <a
            href="tel:+923008002946"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 rounded-lg transition-colors whitespace-nowrap"
          >
            Call Jallo Manager: 0300 8002946
          </a>
        </div>

      </div>
    </section>
  );
};
