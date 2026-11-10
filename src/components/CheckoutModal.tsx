import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, FileText, ArrowLeft, Bike } from 'lucide-react';
import { CartItem, OrderCheckoutData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  onConfirmOrder: (data: OrderCheckoutData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  deliveryFee,
  grandTotal,
  onConfirmOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [areaLandmark, setAreaLandmark] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      setFormError('Please provide a valid Pakistani contact phone number (e.g. 0300 1234567)');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please provide complete house and street delivery address');
      return;
    }

    setFormError('');
    onConfirmOrder({
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      deliveryAddress: deliveryAddress.trim(),
      areaLandmark: areaLandmark.trim(),
      cookingNotes: cookingNotes.trim(),
      paymentMethod: 'Cash on Delivery',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#14151b] border border-amber-500/30 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#101116]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="font-display text-lg font-bold text-[#FFF1D0]">
                Checkout & Delivery Details
              </h3>
              <p className="text-xs text-zinc-400">
                Khalifa Balochi Sajji · Jallo Branch Direct Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Order Snapshot Mini Summary */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="font-semibold text-white">
                Ordering {items.reduce((s, i) => s + i.quantity, 0)} items:
              </span>
              <span className="font-mono text-amber-300 font-bold">
                Grand Total: PKR {grandTotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Includes flat PKR 150 delivery charge from Jallo Branch. Cash on Delivery.
            </p>
          </div>

          {/* Error Banner */}
          {formError && (
            <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-lg text-xs text-red-200">
              {formError}
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Your Full Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tariq Mehmood"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone Number (Call/WhatsApp) *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0300 1234567 or +92 3..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 transition-all font-mono"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Delivery Address (House / Street / Society) *</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. House 42, Street 8, Block B, Canal Garden / Paragon / Jallo area, Lahore"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 transition-all resize-none"
            />
          </div>

          {/* Landmark / Sector */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Nearest Landmark / Area (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Near Jallo Park Main Gate, opposite PSO Pump"
              value={areaLandmark}
              onChange={(e) => setAreaLandmark(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 transition-all"
            />
          </div>

          {/* Cooking & Spice Instructions */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Cooking Notes / Spice Preference (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Extra crisp Sajji skin, mild spice in Handi, extra mint chutney"
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 transition-all"
            />
          </div>

          {/* Payment Method Option */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-zinc-300 block">
              Payment Method
            </span>
            <div className="p-4 rounded-xl border border-amber-500/50 bg-amber-500/10 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Cash on Delivery (COD)</h4>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">
                    Default
                  </span>
                </div>
                <p className="text-xs text-zinc-300">
                  Pay the exact amount of <span className="text-amber-300 font-bold font-mono">PKR {grandTotal.toLocaleString()}</span> in cash to the delivery rider when your fresh hot meal arrives. No advance payment required.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fresh Tandoor & Fire Grill</span>
            </div>
            <div className="flex items-center gap-2">
              <Bike className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Direct Branch Delivery</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 hover:from-amber-500 hover:to-red-500 shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm & Place Order (PKR {grandTotal.toLocaleString()})</span>
            </button>
            <p className="text-[11px] text-center text-zinc-500 mt-2">
              By placing your order, our kitchen team at Jallo Branch will immediately commence preparation.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
