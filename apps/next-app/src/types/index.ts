export interface ListedItem {
  id: string;
  title: string;
  description: string;
  size: [];
  category: 'Men' | 'Women' | 'Children';
  image?: string;
  isAvailable: boolean;
  price: number;
  createdAt: string;
}

export interface Order {
  id: string;
  itemName: string;
  quantity: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  total: number;
  buyerEmail: string;
}

export interface SellerProfile {
  name: string;
  email: string;
  store: string;
  createdAt: string;
}

export interface NewItemForm {
  title: string;
  description: string;
  size: 'S' | 'M' | 'L';
  category: 'Men' | 'Women' | 'Children';
  price: number;
  image?: File;
}

export interface ProductProps {
  id: number;
  adminId: string;
  title: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  description: string
  size: string[]
  category: string;
  subCategory: string
}

export type CartItem = {
  id: number;
  title: string;
  description: string;
  thumbnail: string
  price: number;
  quantity: number;
  selectedSize: string
};

export interface OrderedItems {
  placedOn: Date
  total: number
  id: string;
  orderStatus: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'
  paymentStatus: 'Success' | 'Failed' | 'Pending'
  customerId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  items: {
    item: {
      thumbnail: string;
      title: string;
    };
  }[]
}

export interface ModalOrderData {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  size: string;
  customerName: string;
  customerAddress: string | null;
  itemStatus: 'Pending' | 'Confirmed' | 'Shipped' | 'Cancelled' | 'Delivered';
  placedOn: string;
}

export type AddressType = {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};