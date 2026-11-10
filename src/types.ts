export type CategoryId = 'sajji-fish' | 'karahi-handi' | 'barbeque' | 'tandoor-dessert';

export interface PortionOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description?: string;
  price?: number; // Base or single price in PKR
  portions?: PortionOption[]; // For items with variations like Full / Half / Quarter or Plate / Single Piece
  unit?: string; // e.g. "per kg", "per piece", "per plate"
  image?: string;
  tag?: string; // e.g. "Signature", "Chef Special", "Bestseller"
  isSpicy?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot';
  allowAddons?: boolean; // Can add Butter or Desi Ghee
  isVegetarian?: boolean;
}

export interface PlatterDeal {
  id: string;
  name: string;
  price: number;
  serves: string;
  description: string;
  includes: string[];
  image?: string;
  badge?: string;
}

export interface CartItem {
  cartItemId: string; // unique ID incorporating options
  menuItemId: string;
  name: string;
  selectedPortion?: PortionOption;
  quantity: number;
  unitPrice: number;
  addons?: { name: string; price: number }[];
  notes?: string;
  image?: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phones: string[];
  timing: string;
  isMainJallo?: boolean;
  googleMapsUrl?: string;
}

export interface OrderCheckoutData {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  areaLandmark: string;
  cookingNotes: string;
  paymentMethod: 'Cash on Delivery';
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  checkoutData: OrderCheckoutData;
  estimatedDeliveryMins: string;
}
