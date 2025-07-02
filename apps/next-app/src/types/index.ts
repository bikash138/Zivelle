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