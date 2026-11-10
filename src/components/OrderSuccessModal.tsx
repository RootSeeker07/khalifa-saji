import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { PlacedOrder } from '../types';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  // Generate formatted WhatsApp message text
  const itemsText = order.items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name}${
          item.selectedPortion ? ` (${item.selectedPortion.label})` : ''
        } - PKR ${((item.unitPrice + (item.addons?.reduce((s, a) => s + a.price, 0) || 0)) * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const rawMessage = `*KHALIFA BALOCHI SAJJI - NEW ORDER #${order.orderId}*
------------------------------
*Branch:* Jallo Branch (Canal Road, Lahore)
*Customer:* ${order.checkoutData.customerName}
*Phone:* ${order.checkoutData.phoneNumber}
*Address:* ${order.checkoutData.deliveryAddress}${
    order.checkoutData.areaLandmark ? ` (Landmark: ${order.checkoutData.areaLandmark})` : ''
  }
${
  order.checkoutData.cookingNotes
    ? `*Special Instructions:* ${order.checkoutData.cookingNotes}\n`
    : ''
}------------------------------
*Order Items:*
${itemsText}
------------------------------
*Subtotal:* PKR ${order.subtotal.toLocaleString()}
*Delivery Fee:* PKR ${order.deliveryFee.toLocaleString()}
*Grand Total:* PKR ${order.grandTotal.toLocaleString()}
*Payment Method:* Cash on Delivery (COD)

Please confirm dispatch timeline. Thank you!`;

  const whatsappUrl = `https://wa.me/923008002946?text=${encodeURIComponent(
    rawMessage
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#14151b] border border-amber-500/40 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-amber-950 p-6 text-center border-b border-white/10 relative">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-bold block mb-1">
            Order Confirmed & Sent to Kitchen
          </span>
          <h3 className="font-display text-2xl font-bold text-white">
            Shukriya, {order.checkoutData.customerName}!
          </h3>
          <p className="text-xs text-zinc-300 mt-1">
            Your feast is being roasted over live charcoal at Khalifa Jallo Branch.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono">
            <span className="text-zinc-400">Order ID:</span>
            <span className="text-amber-400 font-bold">{order.orderId}</span>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Estimated Time and Delivery Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 space-y-1">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Estimated Time</span>
              </span>
              <span className="font-mono font-bold text-white text-sm block">
                {order.estimatedDeliveryMins}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 space-y-1">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Dispatch Origin</span>
              </span>
              <span className="font-semibold text-white text-xs block truncate">
                Jallo Branch, Canal Rd
              </span>
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1 text-xs">
            <span className="text-zinc-400">Delivering To:</span>
            <p className="text-white font-medium">{order.checkoutData.deliveryAddress}</p>
            {order.checkoutData.areaLandmark && (
              <p className="text-zinc-400 text-[11px]">Landmark: {order.checkoutData.areaLandmark}</p>
            )}
            <p className="text-amber-400 font-mono text-[11px] pt-1">
              Contact: {order.checkoutData.phoneNumber}
            </p>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-2 border-t border-white/5 pt-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Items Ordered
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center text-zinc-300">
                  <span>
                    {item.quantity}x {item.name}{' '}
                    {item.selectedPortion ? `(${item.selectedPortion.label})` : ''}
                  </span>
                  <span className="font-mono text-zinc-400">
                    PKR {((item.unitPrice + (item.addons?.reduce((s, a) => s + a.price, 0) || 0)) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="space-y-1.5 border-t border-white/10 pt-3 text-xs font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>PKR {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Flat Delivery Fee</span>
              <span>PKR {order.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/5">
              <span className="font-sans">Payable on Delivery</span>
              <span className="text-amber-400 text-base">PKR {order.grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* WhatsApp Direct Notification CTA */}
          <div className="space-y-2 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Receipt to Jallo Branch WhatsApp</span>
            </a>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="tel:+923008002946"
                className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold text-amber-200 bg-zinc-800 hover:bg-zinc-700 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Branch: 0300 8002946</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
