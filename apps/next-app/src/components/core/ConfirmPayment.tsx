'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Loader } from 'lucide-react';
import CartCard from './CartCard';
import { CartItem } from '@/types';

interface DeliveryAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderSummary {
  subtotal: number;
}

interface ConfirmPaymentProps {
  products: CartItem[];
  deliveryAddress: DeliveryAddress;
  orderSummary: OrderSummary;
  onConfirmPayment: () => void;
  onCancelPayment: () => void;
  isProcessing: boolean;
}

export default function ConfirmPayment({
  products,
  deliveryAddress,
  orderSummary,
  onConfirmPayment,
  onCancelPayment,
  isProcessing,
}: ConfirmPaymentProps) {

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
                      <p className="font-semibold">{deliveryAddress.fullName}</p>
                      <p className="text-sm">{deliveryAddress.phone}</p>
                      <p className="text-sm mt-2">{deliveryAddress.street}</p>
                      {deliveryAddress.state && (
                        <p className="text-sm">{deliveryAddress.state}</p>
                      )}
                      <p className="text-sm">
                        {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.postalCode}
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
                <div className="lg:col-span-2 space-y-4">
                  <AnimatePresence>
                    {products.map((cartItem) => (
                      <CartCard key={cartItem.id} cartItem={cartItem} />
                    ))}
                  </AnimatePresence>
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
                    <span>₹{orderSummary.subtotal?.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="" />

                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                </div>

                <Button
                  onClick={onConfirmPayment}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  disabled={isProcessing}
                >
                  {isProcessing ? <Loader/> : 'Confirm & Pay'}
                </Button>

                <Button
                  onClick={onCancelPayment}
                  variant='outline'
                  className='hover:bg-gray-100 py-6 text-gray-900 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer'
                >
                  Cancel
                </Button>

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
