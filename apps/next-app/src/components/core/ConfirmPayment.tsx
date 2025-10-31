'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, CreditCard, Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

interface DeliveryAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface ConfirmPaymentProps {
  products: Product[];
  deliveryAddress: DeliveryAddress;
  orderSummary: OrderSummary;
  onConfirmPayment: () => void;
}

export default function ConfirmPayment({
  products,
  deliveryAddress,
  orderSummary,
  onConfirmPayment,
}: ConfirmPaymentProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Payment</h1>
          <p className="text-gray-600">Review your order and complete payment</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Stock Reserved</h3>
                <p className="text-sm text-gray-600">Complete your purchase within</p>
              </div>
              <motion.div
                key={timeLeft}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-orange-600"
              >
                00:{timeLeft.toString().padStart(2, '0')}
              </motion.div>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-orange-600 rounded-full"
                initial={{ width: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Delivery Address</h2>
                    <div className="text-gray-700">
                      <p className="font-semibold">{deliveryAddress.name}</p>
                      <p className="text-sm">{deliveryAddress.phone}</p>
                      <p className="text-sm mt-2">{deliveryAddress.addressLine1}</p>
                      {deliveryAddress.addressLine2 && (
                        <p className="text-sm">{deliveryAddress.addressLine2}</p>
                      )}
                      <p className="text-sm">
                        {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.brand}</p>
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Size: {product.size}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-600 mt-1">Qty: {product.quantity}</p>
                        </div>
                      </div>
                      {index < products.length - 1 && <Separator className="mt-4" />}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={orderSummary.shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {orderSummary.shipping === 0 ? 'Free' : `₹${orderSummary.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>₹{orderSummary.tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="" />

                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={onConfirmPayment}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  disabled={timeLeft <= 0}
                >
                  {timeLeft <= 0 ? 'Time Expired' : 'Confirm & Pay'}
                </Button>

                {timeLeft <= 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 text-center mt-3"
                  >
                    Stock reservation expired. Please return to cart.
                  </motion.p>
                )}

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Easy returns & refunds</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
