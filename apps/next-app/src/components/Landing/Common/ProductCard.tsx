import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  // rating: number;
  // brand: string;
  // category: string;
  // subCategory: string
  // createdAt: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  index: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid', index }) => {
  if (viewMode === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="glass rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-white/10"
      >
        <div className="flex gap-6">
          <Link href={`/product/${product.id}`} className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 overflow-hidden rounded-lg relative"
            >
              {/* eslint-disable-next-line */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Link>
          <div className="flex-1 space-y-3">
            <div>
              <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-2">
                {/* {product.brand} */}
                Zivelle
              </Badge>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-400 transition-colors">
                  {product.title}
                </h3>
              </Link>
            </div>

            {/* <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                />
              ))}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.rating})</span>
            </div> */}

            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 dark:text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-red-400 hover:bg-red-500/10">
              <Heart size={20} />
            </Button>
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="glass rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 group border border-gray-200 dark:border-white/10"
    >
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-full h-64 overflow-hidden relative"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-300"
              priority={index > 4}
            />
          </motion.div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 glass-light text-gray-600 dark:text-gray-300 hover:text-red-400 h-8 w-8 hover:bg-red-500/20"
        >
          <Heart size={16} />
        </Button>
        {product.originalPrice && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-2">
            {/* {product.brand} */}
            Zivelle
          </Badge>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-400 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
        </div>
        
        {/* <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}
            />
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.rating})</span>
        </div> */}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
                ₹{product.originalPrice} 
              </span>
            )}
          </div>
          <Button size="icon">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
    );
  }

export default ProductCard;