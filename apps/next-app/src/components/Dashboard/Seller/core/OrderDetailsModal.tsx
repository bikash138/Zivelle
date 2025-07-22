import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Package, MapPin, User, Calendar, CreditCard, Loader } from 'lucide-react';
import {ModalOrderData} from '@/types/index'
import Image from 'next/image';

interface OrderDetailsModalProps {
  order: ModalOrderData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (orderId: string, status: string) => void;
  isLoading: boolean
}

const statusConfig = {
  Pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  Confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  Shipped: { label: 'Shipped', color: 'bg-green-100 text-green-800' },
  Cancelled: { label: 'Failed', color: 'bg-red-100 text-red-800' },
  Delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800' },
};

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
  isLoading
}) => {
  // Initialize with a default value
  const [selectedStatus, setSelectedStatus] = useState<string>('Pending');
  
  // Update selected status whenever the order changes
  useEffect(() => {
    if (order && isOpen) {
      setSelectedStatus(order.itemStatus);
    }
  }, [order, isOpen]);

  if (!order) return null;

  const handleStatusUpdate = () => {
    onStatusUpdate(order.id, selectedStatus);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Order Details
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Product Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image
                  src={order.thumbnail}
                  alt={order.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{order.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Size: {order.size}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-lg font-bold text-green-600">₹{order.price}</span>
                </div>
              </div>
            </motion.div>

            {/* Order Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Order ID</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="text-sm font-mono text-gray-900">{order.id}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Order Date</Label>
                <div className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{order.placedOn}</span>
                </div>
              </div>
            </motion.div>

            {/* Customer Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-900">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Customer Name</Label>
                  <div className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-900">{order.customerName}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Delivery Address</Label>
                  <div className="p-3 bg-gray-50 rounded-md flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-900 leading-relaxed">{order.customerAddress}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Update */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-900">Order Status</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">Current Status</Label>
                  <div className="mt-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.itemStatus].color}`}>
                      {statusConfig[order.itemStatus].label}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">Update Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 pt-4 border-t"
            >
              <Button
                onClick={handleStatusUpdate}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={selectedStatus === order.itemStatus}
              >
                {isLoading ? <Loader/> : "Update Status"}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};