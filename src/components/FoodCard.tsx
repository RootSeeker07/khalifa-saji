import React, { useState } from 'react';
import { Plus, Check, Flame } from 'lucide-react';
import { MenuItem, PortionOption } from '../types';
import { DynamicFoodThumb } from './DynamicFoodThumb';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (
    item: MenuItem,
    portion?: PortionOption,
    addons?: { name: string; price: number }[],
    quantity?: number
  ) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  // If item has portions, default to first portion (or Full)
  const [selectedPortion, setSelectedPortion] = useState<PortionOption | undefined>(
    item.portions && item.portions.length > 0 ? item.portions[0] : undefined
  );

  // Addons states (Butter / Desi Ghee)
  const [addButter, setAddButter] = useState(false);
  const [addDesiGhee, setAddDesiGhee] = useState(false);

  // Added animation state
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Compute active price
  const basePrice = selectedPortion ? selectedPortion.price : item.price || 0;
  const addonsTotal = (addButter ? 500 : 0) + (addDesiGhee ? 500 : 0);
  const currentTotalPrice = basePrice + addonsTotal;

  const handleAdd = () => {
    const addons: { name: string; price: number }[] = [];
    if (addButter) addons.push({ name: 'Pure Desi Makhan (Butter)', price: 500 });
    if (addDesiGhee) addons.push({ name: 'Asli Desi Ghee', price: 500 });

    onAddToCart(item, selectedPortion, addons, 1);

    // Trigger feedback state
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1200);
  };

  return (
    <div className="group flex flex-col justify-between rounded-xl glass-card glass-card-hover overflow-hidden transition-all duration-300">
      
      {/* Visual Header / Dynamic Thumb */}
      <div>
        <DynamicFoodThumb
          name={item.name}
          category={item.category}
          image={item.image}
          tag={item.tag}
          aspectRatio="4/3"
        />

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          
          {/* Item Meta & Name */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-1">
              <span className="uppercase tracking-wider">
                {item.unit ? item.unit : item.portions ? 'Multiple Sizes' : 'Standard'}
              </span>
              {item.isSpicy && (
                <span className="flex items-center gap-1 text-red-400 font-semibold">
                  <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                  {item.spiceLevel || 'Spiced'}
                </span>
              )}
            </div>

            <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
              {item.name}
            </h3>

            {item.description && (
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Portion Selector (if applicable) */}
          {item.portions && item.portions.length > 0 && (
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1.5">
                Select Portion:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.portions.map((portion) => {
                  const isSelected = selectedPortion?.label === portion.label;
                  return (
                    <button
                      key={portion.label}
                      type="button"
                      onClick={() => setSelectedPortion(portion)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-black border-amber-400 font-semibold shadow-sm'
                          : 'bg-white/5 text-zinc-300 border-white/10 hover:border-amber-500/40'
                      }`}
                    >
                      <span>{portion.label}</span>
                      <span className="ml-1 opacity-80 text-[10px]">
                        ({portion.price.toLocaleString()})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Add-ons for Karahi/Handi */}
          {item.allowAddons && (
            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block">
                Punjabi Tadka Add-Ons:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={addButter}
                    onChange={(e) => setAddButter(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Butter (+500)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={addDesiGhee}
                    onChange={(e) => setAddDesiGhee(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Desi Ghee (+500)</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Price and Add Button */}
      <div className="p-4 sm:p-5 pt-0 mt-2">
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">Price (PKR)</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-xs text-amber-400">Rs.</span>
              <span className="font-mono text-xl font-bold text-[#FFF1D0]">
                {currentTotalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAddedRecently}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md hover:shadow-amber-500/20 active:scale-95'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
