export interface OrderItem {
  id: number;
  orderId: string;
  itemId: number;
  quantity: number;
  size: string;
  price: number;
  itemStatus: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  item: {
    title: string;
    thumbnail: string;
  };
  order: {
    placedOn: Date;
    paymentStatus: string;
    customer?: {
      name: string;
      email: string;
      // addresses: [];
    };
  };
}

interface RecentOrder {
  id: number;
  price: number;
  order: {
    id: string;
    orderStatus: string;
  };
  item: {
    title: string;
    thumbnail: string;
  };
}

interface TopSellingProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  soldCount: number;
}

export interface SellerMetrics {
  recentOrders: RecentOrder[];
  topSellingProducts: TopSellingProduct[];
  revenue: number;
  totalOrders: number;
  activeListings: number;
}