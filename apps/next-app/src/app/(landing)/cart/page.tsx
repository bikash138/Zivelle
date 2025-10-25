'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Tag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/reducer';
import axios from 'axios';
import {RazorpayPaymentResponse, Razorpay} from '@/types/razorpay'
import EmptyCart from '@/components/core/EmptyCart';
import CartCard from '@/components/core/CartCard';
import { AddressSelector } from '@/components/core/AddressSelector';

declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }
}

const CartPage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState)=>state.cart.cart)
  const subTotal = useSelector((state: RootState)=>state.cart.total)
  const discount = appliedPromo === 'SAVE20' ? subTotal * 0.2 : 0;
  const shipping = subTotal > 500 ? 0 : 49;
  const tax = (subTotal - discount) * 0.08;
  const total = subTotal - discount + shipping + tax;
  const [isProcessing, setIsProcessing] = useState(false)
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setAppliedPromo('SAVE20');
      setPromoCode('');
    }
  };

  const handleCheckout = async () => {
    if(isProcessing) return
    setIsProcessing(true)
    try {
      const response = await axios.post('/api/user/orders', {
        items: cart,
        totalAmount: total,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.data;

      if (data.success) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_WYcFPIFUgHXrUC',
        amount: data.data.amount,
        currency: data.data.currency,
        order_id: data.data.id,
        handler: function (response:RazorpayPaymentResponse ) {
          (async () => {
            try {
              const verifyRes = await axios.post('/api/verify-payment', {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                items: cart
              }, {
                headers: { 'Content-Type': 'application/json' }
              });
              const verifyData = verifyRes.data;
              if (verifyData.success) {
                dispatch(resetCart())
                alert("Payment successful and verified!");
              } else {
                alert("Payment verification failed!");
              }
            } catch (error) {
              console.log(error)
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
    } catch (error) {
      console.error(error);
    } finally{
      setIsProcessing(false)
    }
  };
  
  if (cart.length === 0) {
    return (
      <>
        <EmptyCart/>
      </>
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
      <AddressSelector/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((cartItem) => (
              <CartCard key={cartItem.id} cartItem={cartItem} />
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
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">Try &quot;SAVE20&quot; for 20% off</p>
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
                  <span className="font-medium text-gray-900 dark:text-white">₹{subTotal?.toFixed(2)}</span>
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
                <Button 
                  disabled={isProcessing}
                  onClick={handleCheckout} 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200" size="lg">
                  {isProcessing ? <Loader2/> : "Proceed to Checkout"}
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