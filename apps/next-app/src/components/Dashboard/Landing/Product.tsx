'use client'
import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/Landing/Common/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addToCart } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  thumnail: string;
  description: string
  // rating: number;
  // brand: string;
  category: string;
  subCategory: string
//   createdAt: string;
}

interface ProductProps {
  product: Product; // Replace 'any' with 'Product' if your product object matches the Product interface
}

const Product = ({ product }: ProductProps) => {
//   const product = products.find(p => p.id === parseInt(id || '1'));
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  const colors = ['Black', 'White', 'Gray', 'Navy', 'Brown'];
//   const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const images = [
    product.thumnail,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square glass rounded-lg overflow-hidden border border-white/10">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square glass rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-blue-500' : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                {/* {product.brand} */}
                Zivelle
              </Badge>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
              >
                <Heart size={20} />
              </motion.button>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>

            {/* <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">({product.rating}) · 245 reviews</span>
              </div>
            </div> */}

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-black">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-900 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-700">
              Crafted from premium materials, this versatile piece combines comfort with style. 
              Perfect for both casual and semi-formal occasions, featuring a modern cut and attention to detail.
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-600 hover:border-blue-500 text-gray-700 hover:text-gray-800'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Color</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-blue-500' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-gray-600 hover:bg-white/10"
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center font-medium text-black">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gray-600 hover:bg-white/10"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 py-3 px-6 font-semibold flex items-center justify-center space-x-2"
                onClick={()=>dispatch(addToCart(product))}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </Button>
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 font-semibold">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-3 glass rounded-lg border border-white/10"
              >
                <Truck size={20} className="text-green-400" />
                <span className="text-sm text-gray-700">Free Shipping</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-3 glass rounded-lg border border-white/10"
              >
                <RotateCcw size={20} className="text-blue-400" />
                <span className="text-sm text-gray-700">30-Day Returns</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-3 glass rounded-lg border border-white/10"
              >
                <Shield size={20} className="text-purple-400" />
                <span className="text-sm text-gray-700">2-Year Warranty</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16"
      >
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-400">
              Description
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-white">
              Size Guide
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-white">
              Reviews
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-white">
              Shipping
            </button>
          </nav>
        </div>
        <div className="py-8">
          <div className="prose max-w-none">
            <p className="text-gray-400 mb-4">
              {product.description}
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Premium quality fabric with excellent breathability</li>
              <li>• Machine washable for easy care</li>
              <li>• Reinforced seams for long-lasting wear</li>
              <li>• Available in multiple sizes and colors</li>
              <li>• Ethically sourced and sustainably produced</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Related Products */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div> */}
      </motion.div>
    </div>
  );
};

export default Product;