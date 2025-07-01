export interface ListedItem {
  id: string;
  title: string;
  description: string;
  size: 'S' | 'M' | 'L';
  category: 'Men' | 'Women' | 'Children';
  image?: string;
  status: 'Active' | 'Sold' | 'Draft';
  price: number;
  dateCreated: string;
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
  storeName: string;
  joinDate: string;
  totalSales: number;
  activeListings: number;
}

export interface NewItemForm {
  title: string;
  description: string;
  size: 'S' | 'M' | 'L';
  category: 'Men' | 'Women' | 'Children';
  price: number;
  image?: File;
}