interface OrderItem {
  title: string;
  thumbnail: string;
}

export interface ModalOrderData {
    id: string;
    items: OrderItem[];
    expectedDelivery: string;
    total: number;
    status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
    payment: 'Success' | 'Failed' | 'Pending';
    date: string;
    customer: {
      name: string;
      address?: string;
    }
} 