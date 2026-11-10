import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Building2, Flame } from 'lucide-react';
import { BRANCH_LOCATIONS } from '../data/menuData';

export const BranchLocations: React.FC = () => {
  const mainJalloBranch = BRANCH_LOCATIONS.find((b) => b.isMainJallo)!;
  const otherBranches = BRANCH_LOCATIONS.filter((b) => !b.isMainJallo);

  return (
    <section id="branches" className="py-16 md:py-24 bg-[#0a0b0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Lahore Locations & Dining</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF1D0]">
            Visit Our Branches in Lahore
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Dine-in with traditional family courtyards, takeaway counters, or order online for delivery across Lahore.
          </p>
        </div>

        {/* Featured Flagship Jallo Branch Spotlight */}
        <div className="mb-12 relative rounded-3xl glass-card overflow-hidden border border-amber-500/40 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#1c1b18] via-[#121319] to-[#0d0e12] shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider text-black bg-amber-400 rounded-full">
                  Flagship Destination
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
                  <Flame className="w-3 h-3 text-emerald-400" />
                  Live Charcoal Fire Sajji Pits
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {mainJalloBranch.name}
              </h3>
              
              <p className="text-zinc-300 text-sm leading-relaxed">
                Situated along the scenic Lahore Canal, our Jallo Branch offers expansive open-air family dining lawns, private shamianas, authentic Balochi slow-cooking coal pits, and dedicated free valet parking.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{mainJalloBranch.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Operating Daily: {mainJalloBranch.timing}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="flex flex-wrap items-center gap-3">
                    {mainJalloBranch.phones.map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-mono font-bold text-amber-300 hover:text-white transition-colors underline decoration-amber-500/40"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+923008002946"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Jallo Branch: 0300 8002946</span>
                </a>

                {mainJalloBranch.googleMapsUrl && (
                  <a
                    href={mainJalloBranch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-colors inline-flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-amber-400" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Amenities Pill Matrix */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-display text-lg font-bold">500+</span>
                <span className="block text-xs font-semibold text-white">Guest Capacity</span>
                <span className="block text-[11px] text-zinc-400">Outdoor family lawns & indoor AC hall</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-display text-lg font-bold">Live Pit</span>
                <span className="block text-xs font-semibold text-white">Fresh Cooking</span>
                <span className="block text-[11px] text-zinc-400">Watch your Sajji slow roast over wood embers</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-display text-lg font-bold">Free Valet</span>
                <span className="block text-xs font-semibold text-white">Safe Parking</span>
                <span className="block text-[11px] text-zinc-400">Directly on Canal Road Lahore</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-display text-lg font-bold">3:00 AM</span>
                <span className="block text-xs font-semibold text-white">Late Night Dining</span>
                <span className="block text-[11px] text-zinc-400">Hot Sehri and midnight cravings served</span>
              </div>
            </div>

          </div>
        </div>

        {/* Alternative Branches Mini Info Grid */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-4">
            Other Khalifa Balochi Sajji Branches in Lahore
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherBranches.map((branch) => (
              <div
                key={branch.id}
                className="p-5 rounded-2xl glass-card border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      Lahore Network
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{branch.timing}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-white">
                    {branch.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {branch.tagline}
                  </p>

                  <div className="pt-3 text-xs text-zinc-300 space-y-1.5 border-t border-white/5 mt-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{branch.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={`tel:${branch.phones[0].replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{branch.phones[0]}</span>
                  </a>
                  <span className="text-[11px] text-zinc-500">Takeaway & Delivery</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
