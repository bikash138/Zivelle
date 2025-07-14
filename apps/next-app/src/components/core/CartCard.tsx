import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/slices/cartSlice';
import { CartItem } from '@/types';
import Image from 'next/image';

interface CartCardProps {
  cartItem: CartItem
}

const CartCard: React.FC<CartCardProps> = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
    >
      <Card className="glass border border-white/10">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <Link href={`/product/${cartItem.id}`} className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 overflow-hidden rounded-lg relative"
              >
                <Image
                  src={cartItem.thumbnail}
                  alt={cartItem.title}
                  fill
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
            <div className="flex-1 space-y-3">
              <div>
                <Link href={`/product/${cartItem.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-400 transition-colors">
                    {cartItem.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zivelle
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                  Size: {cartItem.selectedSize}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ₹{cartItem.price.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(removeFromCart(cartItem))}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-400 h-8 w-8 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CartCard;