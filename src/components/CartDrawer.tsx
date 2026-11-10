import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  // Calculate Subtotal, Delivery Fee, and Grand Total
  const subtotal = items.reduce((acc, item) => {
    const addonsTotal = item.addons
      ? item.addons.reduce((sum, a) => sum + a.price, 0)
      : 0;
    return acc + (item.unitPrice + addonsTotal) * item.quantity;
  }, 0);

  const deliveryFee = items.length > 0 ? 150 : 0; // Flat PKR 150
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Content Drawer */}
      <div className="relative w-full max-w-md bg-[#121319] border-l border-white/10 h-full flex flex-col shadow-2xl z-10">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#FFF1D0]">Your Food Cart</h3>
              <span className="text-[11px] font-mono text-zinc-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-zinc-400 hover:text-red-400 px-2 py-1 rounded transition-colors"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Line Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-display text-lg font-semibold text-zinc-300">Your Cart is Empty</h4>
              <p className="text-xs text-zinc-500 max-w-xs">
                Select from our authentic Balochi Sajji, Handi, or BBQ specialties to start your order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded-lg hover:bg-amber-900 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => {
              const addonsTotal = item.addons
                ? item.addons.reduce((sum, a) => sum + a.price, 0)
                : 0;
              const itemTotal = (item.unitPrice + addonsTotal) * item.quantity;

              return (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/5 flex flex-col space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {item.name}
                      </h4>
                      {item.selectedPortion && (
                        <span className="text-[11px] font-mono text-amber-400 block mt-0.5">
                          Portion: {item.selectedPortion.label}
                        </span>
                      )}
                      {item.addons && item.addons.length > 0 && (
                        <div className="text-[10px] text-zinc-400 mt-1">
                          {item.addons.map((a, i) => (
                            <span key={i} className="inline-block mr-2 text-amber-200/90">
                              + {a.name} (Rs. {a.price})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Stepper and Price */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <div className="flex items-center border border-white/10 rounded-lg bg-[#0e0f13] overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-[#FFF1D0]">
                        PKR {itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Calculations & Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0e0f13] space-y-4">
            
            {/* Calculation Breakdown */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 items-center">
                <span className="flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-amber-400" />
                  <span>Flat Delivery Fee</span>
                </span>
                <span className="text-amber-300">PKR {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm sm:text-base font-bold text-white">
                <span className="font-sans">Grand Total</span>
                <span className="text-amber-400 text-lg">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Cash on Delivery Notice */}
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-center justify-between">
              <span>Payment Mode:</span>
              <span className="font-bold font-mono uppercase tracking-wider text-amber-400">
                Cash on Delivery (COD)
              </span>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 hover:from-amber-500 hover:to-red-500 shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-zinc-500">
              Dispatched swiftly from Khalifa Jallo Branch · 35-45 mins estimated delivery
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
