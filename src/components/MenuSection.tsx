import React, { useState, useMemo } from 'react';
import { Search, Flame, Utensils, Soup, Coffee, X } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { CategoryId, MenuItem, PortionOption } from '../types';
import { FoodCard } from './FoodCard';

interface MenuSectionProps {
  onAddToCart: (
    item: MenuItem,
    portion?: PortionOption,
    addons?: { name: string; price: number }[],
    quantity?: number
  ) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('sajji-fish');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items based on active tab or search query across the entire menu
  const filteredItems = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return MENU_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory, searchQuery]);

  // Icons for tabs
  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'sajji-fish':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'karahi-handi':
        return <Soup className="w-4 h-4 text-red-500" />;
      case 'barbeque':
        return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'tandoor-dessert':
        return <Coffee className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#0e0f13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
              <Flame className="w-4 h-4" />
              Direct From The Kitchen of Khalifa
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF1D0]">
              Authentic Pakistani Cuisine Menu
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
              Freshly prepared with authentic mountain rock salt, native Baloch spices, and premium ingredients.
            </p>
          </div>

          {/* Real-time search filter */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dishes (e.g., Karahi, Fish, Sajji)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabbed Category Navigation (Zero-pill, clear functional buttons) */}
        {!searchQuery && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryId)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-[#FFF1D0] border-amber-500/60 shadow-sm'
                      : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:text-zinc-200 hover:border-white/15'
                  }`}
                >
                  {getCategoryIcon(cat.id as CategoryId)}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-amber-500/30 text-amber-200' : 'bg-white/5 text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Search Results Kicker */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-zinc-400">
            <span>
              Showing results for &ldquo;<span className="text-amber-300 font-semibold">{searchQuery}</span>&rdquo; ({filteredItems.length} items found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-400 hover:underline"
            >
              Reset to Categories
            </button>
          </div>
        )}

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl glass-card border border-white/5 space-y-3">
            <p className="text-base text-zinc-300 font-medium">No dishes match &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-zinc-500">
              Try searching for &quot;Sajji&quot;, &quot;Karahi&quot;, &quot;Handi&quot;, &quot;Naan&quot;, or &quot;Kabab&quot;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 px-4 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 rounded-lg hover:bg-amber-900 transition-colors"
            >
              View Full Menu
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
