import React from 'react';
import { Flame, Sparkles, Award, Utensils } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#0e0f13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl glass-card overflow-hidden border border-amber-500/30 group">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={ASSET_IMAGES.karahiHandi}
                  alt="Traditional Pakistani Karahi cooking"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-transparent to-transparent" />
              </div>

              {/* Floating quote card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  Culinary Philosophy
                </span>
                <p className="text-xs text-zinc-200 italic">
                  &ldquo;Authentic Balochi Sajji requires patience, dry mountain rock salt, and slow fire. No shortcuts, only pure wood smoke and time.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>The Story of Khalifa</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF1D0] leading-tight">
                Preserving the Ancient Art of Balochi Slow Fire Roasting
              </h2>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Originated from the rugged mountains and nomadic heritage of Balochistan, Sajji is widely celebrated as the purest form of whole-meat roasting in South Asia. At <strong className="text-amber-300">Khalifa Balochi Sajji</strong>, we honor this revered culinary tradition with unwavering fidelity.
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Each whole chicken is rubbed only with virgin rock salt and subtle mountain cumin before being skewered vertically around circular hearths of fragrant burning wood. Over hours of gentle radiant heat, the natural poultry fat bastes the meat from within, yielding paper-crisp golden skin and unmatched juiciness.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Charcoal Pit Roasting</h4>
                <p className="text-[11px] text-zinc-400">Direct radiant heat with 0% gas baking.</p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Utensils className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Pure Desi Ingredients</h4>
                <p className="text-[11px] text-zinc-400">Desi ghee, pure butter, and fresh ground spices.</p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Lahore Culinary Legacy</h4>
                <p className="text-[11px] text-zinc-400">Trusted by hundreds of families every night.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
