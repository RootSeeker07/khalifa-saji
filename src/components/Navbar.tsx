import React, { useState } from 'react';
import { PhoneCall, ShoppingBag, Menu, X, Flame } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu Specials', href: '#menu' },
    { label: 'Family Platters', href: '#platters' },
    { label: 'Our Story', href: '#about' },
    { label: 'Branches', href: '#branches' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Lockup */}
        <a
          href="#"
          className="flex items-center gap-3 group whitespace-nowrap shrink-0"
        >
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-red-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#121318] rounded-[7px] flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#FFF1D0] group-hover:text-amber-300 transition-colors leading-none">
              Khalifa Balochi Sajji
            </span>
            <span className="font-mono text-[11px] tracking-wider uppercase text-amber-400/90 mt-1">
              Jallo Branch · Lahore
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-amber-400/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area: Call to Order + Cart Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Call to Order */}
          <a
            href="tel:+923008002946"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Call Khalifa Sajji Jallo Branch"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>0300 8002946</span>
          </a>

          {/* Primary CTA: Order Online / Cart */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 hover:from-amber-500 hover:to-red-500 rounded-lg shadow-md shadow-amber-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden xs:inline">Order Online / Cart</span>
            <span className="xs:hidden">Cart</span>
            {cartItemCount > 0 ? (
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold font-mono bg-[#14151a] text-amber-300 border border-amber-400/50 rounded-full">
                {cartItemCount}
              </span>
            ) : null}
            {cartTotal > 0 ? (
              <span className="hidden md:inline font-mono text-xs text-amber-100/90 border-l border-white/20 pl-2">
                PKR {cartTotal.toLocaleString()}
              </span>
            ) : null}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-amber-400 hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:+923008002946"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-amber-200 bg-amber-950/50 border border-amber-500/30 rounded-lg"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Call to Order: +92 300 8002946</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
