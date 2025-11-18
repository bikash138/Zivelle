import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, Package, User, MapPin, CreditCard, Truck } from 'lucide-react'
import Image from 'next/image'
import { ModalOrderData } from '@/types/userTypes'

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  order?: ModalOrderData
}

const statusConfig = {
  Pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Package },
  Confirmed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Package },
  Shipped: { color: 'bg-green-100 text-green-800 border-green-200', icon: Truck },
  Delivered: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Package },
  Cancelled: { color: 'bg-red-100 text-red-800 border-red-200', icon: Package },
}

const paymentConfig = {
  Success: { color: 'bg-green-100 text-green-800 border-green-200' },
  Failed: { color: 'bg-red-100 text-red-800 border-red-200' },
  Pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsProps) {
  if (!order) return null

  const StatusIcon = statusConfig[order.status]?.icon || Package
  const trimOrderId = (id: string) => {
    if (id.length <= 8) return id
    return `${id.toString().slice(0, 4)}...${id.toString().slice(-4)}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              <DialogHeader className="space-y-4 pb-6">
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Order Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Order Items */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <CardContent className="px-4 ">
                        <div className="flex flex-col">
                          <div className="flex flex-wrap gap-3">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 group"
                              >
                                <Image
                                  src={item.thumbnail}
                                  alt={item.title}
                                  fill
                                  className="object-cover rounded-lg transition-all duration-200 group-hover:scale-105"
                                />
                                {/* <div className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {item.quantity || 1}
                                </div> */}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'} in
                              this order
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>

                <Separator />

                {/* Order Information */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Order ID</h4>
                      <p className="text-lg font-mono text-gray-900">#{trimOrderId(order.id)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Order Date</h4>
                      <div className="flex items-center text-gray-700">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        {order.date}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Expected Delivery</h4>
                      <div className="flex items-center text-gray-700">
                        <Truck className="w-4 h-4 mr-2" />
                        {order.expectedDelivery}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Total Amount</h4>
                      <p className="text-xl font-semibold text-green-600">
                        ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <Separator />

                {/* Customer Information */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Name</h4>
                      <div className="flex items-center text-gray-700">
                        <User className="w-4 h-4 mr-2" />
                        {order.deliveryAddress.fullName}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Delivery Address</h4>
                      <div className="flex items-start text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        <div className="flex flex-col text-sm text-gray-900 leading-relaxed">
                          <span>
                            {order.deliveryAddress.street}, {order.deliveryAddress.city}
                          </span>
                          <span>
                            {order.deliveryAddress.state}, {order.deliveryAddress.postalCode}
                          </span>
                          <span>{order.deliveryAddress.country}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <Separator />

                {/* Order Status */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Order Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Current Status</h4>
                      <Badge
                        variant="outline"
                        className={`${statusConfig[order.status]?.color} px-3 py-1 font-medium`}
                      >
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {order.status}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Status</h4>
                      <Badge
                        variant="outline"
                        className={`${paymentConfig[order.payment]?.color} px-3 py-1 font-medium`}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {order.payment}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
