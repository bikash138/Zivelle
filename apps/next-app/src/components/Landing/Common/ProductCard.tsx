import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  price: number
  originalPrice: number
  thumbnail: string
}

interface ProductCardProps {
  product: Product
  index: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="glass rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 group border border-gray-200 dark:border-white/10"
    >
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full h-64 overflow-hidden relative">
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
        {product.originalPrice && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            OFF
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-2"
          >
            Zivelle
          </Badge>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-500 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
