'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {Trash2, ShoppingBag, ArrowLeft, Tag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, resetCart } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/reducer';

// Add Razorpay type to the Window interface
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartProps {
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

const CartPage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setAppliedPromo('SAVE20');
      setPromoCode('');
    }
  };

  const handleCheckout = async () => {
  // Call your API to create the order
  const res = await fetch('/api/user/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cart,
      totalAmount: total,
    }),
  });
  const data = await res.json();

  if (data.success) {
    const options = {
      key: "rzp_test_WYcFPIFUgHXrUC",
      amount: data.data.amount,
      currency: data.data.currency,
      order_id: data.data.id,
      //@ts-ignore
      handler: function (response) {
        console.log("Razorpay response:", response);
        (async () => {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            dispatch(resetCart())
            alert("Payment successful and verified!");
          } else {
            alert("Payment verification failed!");
          }
        })();
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } else {
    console.log("Payment can't be done")
  }
};

  const dispatch = useDispatch()
  const cart = useSelector((state: RootState)=>state.cart.cart)
  const subTotal = useSelector((state: RootState)=>state.cart.total)
  const discount = appliedPromo === 'SAVE20' ? subTotal * 0.2 : 0;
  const shipping = subTotal > 500 ? 0 : 49;
  const tax = (subTotal - discount) * 0.08;
  const total = subTotal - discount + shipping + tax;
  console.log(total)

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto border border-white/20"
          >
            <ShoppingBag size={40} className="text-gray-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
            <p className="text-gray-400">Looks like you haven't added anything to your cart yet.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              <Link href="/catalog">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <Button variant="ghost" size="icon" asChild className="hover:bg-white/10">
          <Link href="/catalog">
            <ArrowLeft size={20} />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">{cart.length} items in your cart</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item,index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Card className="glass border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Link href={`/product/${item.id}`} className="flex-shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-32 h-32 overflow-hidden rounded-lg"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </Link>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <Link href={`/product/${item?.id}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {/* {item.product.brand} */}
                            Zivelle
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Size:{item.selectedSize}</Badge>
                          {/* <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Color:</Badge> */}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {/* <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 border-gray-600 hover:bg-white/10"
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                            <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 border-gray-600 hover:bg-white/10"
                            >
                              <Plus size={14} />
                            </Button>
                          </div> */}
                          
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ₹{item.price.toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => dispatch(removeFromCart(item))}
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
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Promo Code */}
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Tag size={20} className="mr-2" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedPromo ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                >
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    {appliedPromo} Applied
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedPromo('')}
                    className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 hover:bg-green-500/10"
                  >
                    Remove
                  </Button>
                </motion.div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <Button onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">Try "SAVE20" for 20% off</p>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{subTotal.toFixed(2)}</span>
                </div>
                
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-green-600 dark:text-green-400"
                    >
                      <span>Discount ({appliedPromo})</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-700 pt-3">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Truck size={16} />
                    <span className="text-sm">
                      Add ₹{(500 - subTotal).toFixed(2)} more for free shipping
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3 mt-6">
                <Button onClick={handleCheckout} className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200" size="lg">
                  Proceed to Checkout
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/catalog">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Why shop with us?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {[
                  'Secure payment processing',
                  '30-day return policy',
                  'Free shipping over ₹100',
                  '24/7 customer support'
                ].map((feature, index) => (
                  <motion.div 
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartPage;