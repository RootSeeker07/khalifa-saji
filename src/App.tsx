import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlattersSection } from './components/PlattersSection';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { BranchLocations } from './components/BranchLocations';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CartItem, MenuItem, PlatterDeal, PortionOption, OrderCheckoutData, PlacedOrder } from './types';
import { ShoppingBag, Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show transient notification toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add standard Menu Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    portion?: PortionOption,
    addons?: { name: string; price: number }[],
    quantity: number = 1
  ) => {
    const unitPrice = portion ? portion.price : item.price || 0;
    const portionKey = portion ? portion.label : 'std';
    const addonsKey = addons && addons.length > 0 ? addons.map((a) => a.name).join('-') : 'none';
    const cartItemId = `${item.id}_${portionKey}_${addonsKey}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prevItems];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          cartItemId,
          menuItemId: item.id,
          name: item.name,
          selectedPortion: portion,
          quantity,
          unitPrice,
          addons,
          image: item.image,
        };
        return [...prevItems, newItem];
      }
    });

    const portionLabel = portion ? ` (${portion.label})` : '';
    showToast(`Added ${item.name}${portionLabel} to cart`);
  };

  // Add Platter Deal to Cart
  const handleAddPlatter = (platter: PlatterDeal) => {
    const cartItemId = `platter_${platter.id}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prevItems];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        const newItem: CartItem = {
          cartItemId,
          menuItemId: platter.id,
          name: platter.name,
          quantity: 1,
          unitPrice: platter.price,
          image: platter.image,
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`Added ${platter.name} to cart`);
  };

  // Quantity updates
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove single line item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.cartItemId !== cartItemId));
  };

  // Clear all items
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Proceed to Checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Confirm and place order
  const handleConfirmOrder = (checkoutData: OrderCheckoutData) => {
    const subtotal = cartItems.reduce((acc, item) => {
      const addonsTotal = item.addons
        ? item.addons.reduce((sum, a) => sum + a.price, 0)
        : 0;
      return acc + (item.unitPrice + addonsTotal) * item.quantity;
    }, 0);
    const deliveryFee = 150;
    const grandTotal = subtotal + deliveryFee;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: PlacedOrder = {
      orderId: `KBJ-${randomSuffix}`,
      date: new Date().toISOString(),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      grandTotal,
      checkoutData,
      estimatedDeliveryMins: '35 - 45 Minutes',
    };

    setPlacedOrder(newOrder);
    setIsCheckoutOpen(false);
    setCartItems([]); // Clear cart after successful order
  };

  // Computed Cart Totals
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const addonsTotal = item.addons
      ? item.addons.reduce((sum, a) => sum + a.price, 0)
      : 0;
    return acc + (item.unitPrice + addonsTotal) * item.quantity;
  }, 0);
  const deliveryFee = cartItems.length > 0 ? 150 : 0;
  const cartGrandTotal = cartSubtotal + deliveryFee;

  // Jump helpers
  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExplorePlatters = () => {
    const el = document.getElementById('platters');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0e0f13] text-[#f1f3f7] flex flex-col font-body">
      
      {/* Navigation Bar */}
      <Navbar
        cartItemCount={cartItemCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={handleExploreMenu}
          onExplorePlatters={handleExplorePlatters}
        />

        {/* Family Bundles & Platters Section */}
        <PlattersSection onAddPlatter={handleAddPlatter} />

        {/* Interactive Filter Menu Section */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* Balochi Culinary Story & Craftsmanship */}
        <AboutSection />

        {/* Jallo Branch Spotlight & Lahore Network */}
        <BranchLocations />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        deliveryFee={deliveryFee}
        grandTotal={cartGrandTotal}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Order Success Confirmation & WhatsApp Receipt Modal */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* Floating Bottom Cart Bar for Mobile Viewports */}
      {cartItemCount > 0 && !isCartOpen && !isCheckoutOpen && !placedOrder && (
        <aside aria-label="Quick cart bar" className="md:hidden fixed bottom-4 left-4 right-4 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 text-white shadow-2xl flex items-center justify-between font-semibold active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center font-mono text-xs font-bold text-amber-300">
                {cartItemCount}
              </div>
              <div className="text-left text-xs">
                <span className="block font-bold">View Your Food Order</span>
                <span className="text-[11px] text-amber-100 opacity-90 font-mono">
                  PKR {cartGrandTotal.toLocaleString()} (Incl. Delivery)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold bg-black/30 px-3 py-1.5 rounded-lg">
              <span>Checkout</span>
              <ShoppingBag className="w-3.5 h-3.5 ml-1" />
            </div>
          </button>
        </aside>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-amber-500/50 shadow-2xl text-xs font-semibold text-white animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
