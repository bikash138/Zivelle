export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  brand: string;
  category: string;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Cotton Oversized T-Shirt",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.8,
    brand: "Zivelle",
    category: "clothing",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Elegant Silk Midi Dress",
    price: 129.99,
    originalPrice: 189.99,
    image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    brand: "Zivelle",
    category: "clothing",
    createdAt: "2024-01-10T14:30:00Z"
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.7,
    brand: "Zivelle",
    category: "clothing",
    createdAt: "2024-01-08T09:15:00Z"
  },
  {
    id: 4,
    name: "Luxury Leather Boots",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.6,
    brand: "Zivelle",
    category: "shoes",
    createdAt: "2024-01-05T16:45:00Z"
  },
  {
    id: 5,
    name: "Casual Sneakers",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.5,
    brand: "Zivelle",
    category: "shoes",
    createdAt: "2024-01-03T11:20:00Z"
  },
  {
    id: 6,
    name: "Designer Handbag",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.8,
    brand: "Zivelle",
    category: "accessories",
    createdAt: "2024-01-01T08:00:00Z"
  },
  {
    id: 7,
    name: "Minimalist Watch",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    brand: "Zivelle",
    category: "accessories",
    createdAt: "2023-12-28T13:30:00Z"
  },
  {
    id: 8,
    name: "Cozy Knit Sweater",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.7,
    brand: "Zivelle",
    category: "clothing",
    createdAt: "2023-12-25T15:45:00Z"
  },
  {
    id: 9,
    name: "Statement Earrings",
    price: 34.99,
    originalPrice: 49.99,
    image: "https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.6,
    brand: "Zivelle",
    category: "accessories",
    createdAt: "2023-12-20T10:15:00Z"
  },
  {
    id: 10,
    name: "Formal Blazer",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.8,
    brand: "Zivelle",
    category: "clothing",
    createdAt: "2023-12-18T12:00:00Z"
  },
  {
    id: 11,
    name: "Summer Sandals",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.4,
    brand: "Zivelle",
    category: "shoes",
    createdAt: "2023-12-15T14:20:00Z"
  },
  {
    id: 12,
    name: "Vintage Sunglasses",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.pexels.com/photos/1661470/pexels-photo-1661470.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.7,
    brand: "Zivelle",
    category: "accessories",
    createdAt: "2023-12-12T09:30:00Z"
  }
];

export const featuredProducts = products.slice(0, 8);