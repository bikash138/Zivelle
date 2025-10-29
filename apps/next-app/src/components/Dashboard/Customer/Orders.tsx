'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Package, ArrowUpDown, ShoppingBag, Calendar, Truck } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';
import { OrderedItems } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { ModalOrderData } from '@/types/userTypes';
import { OrderDetailsModal } from './core/OrderDetailsModal';

export function Orders({ initialOrders }: {initialOrders : OrderedItems[]}) {
  const[orders] = useState<OrderedItems[]>(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState<OrderedItems[]>(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('placedOn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<ModalOrderData | null>(null)

  // Stats calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
  const shippedOrders = orders.filter(o => o.orderStatus === 'Shipped').length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
  
  const stats = [
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Calendar,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Shipped",
      value: shippedOrders,
      icon: Truck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent}`,
      icon: ShoppingBag,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const handleViewOrder = (order: OrderedItems) => {

    const modalOrderData = {
      id: order.id,
      items: order.items.map((orderItem) => ({
        title: orderItem.item.title,
        thumbnail: orderItem.item.thumbnail,
      })),
      expectedDelivery: formatDate(String(order.placedOn)),
      total: order.total,
      status: order.orderStatus,
      payment: order.paymentStatus,
      date: formatDate(String(order.placedOn)),
      deliveryAddress: order.deliveryAddress
      // customer: {
      //   name: 'Bikash',
      //   address: 'Kolkata'
      // }
    }

    setSelectedOrder(modalOrderData);
    setIsModalOpen(true);
  }

  useEffect(()=>{
    setFilteredOrders(orders)
  },[orders])
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterAndSortOrders(term, statusFilter, sortBy, sortOrder);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterAndSortOrders(searchTerm, status, sortBy, sortOrder);
  };

  const handleSort = (column: string) => {
    const newSortOrder = sortBy === column && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(column);
    setSortOrder(newSortOrder);
    filterAndSortOrders(searchTerm, statusFilter, column, newSortOrder);
  };

  const filterAndSortOrders = (search: string, status: string, sort: string, order: 'asc' | 'desc') => {
    let filtered = orders;

    if (search) {
      filtered = filtered.filter(order =>
        order.id.toString().toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === status);
    }

    // Sort orders
    filtered = [...filtered].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      if (sort === 'id') {
        aValue = a.id;
        bValue = b.id;
      } else if (sort === 'total') {
        aValue = a.total;
        bValue = b.total;
      } else if (sort === 'placedOn') {
        aValue = new Date(a.placedOn);
        bValue = new Date(b.placedOn);
      } else if (sort === 'quantity') {
        aValue = a.total;
        bValue = b.total;
      } else if (sort === 'status') {
        aValue = a.orderStatus;
        bValue = b.orderStatus;
      } else {
        aValue = '';
        bValue = '';
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredOrders(filtered);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-0';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-0';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-0';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-0';
      default:
        return 'bg-gray-100 text-gray-800 border-0';
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-0';
      case 'Success':
        return 'bg-green-100 text-green-800 border-0';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-0';
      default:
        return 'bg-gray-100 text-gray-800 border-0';
    }
  };

  const trimOrderId = (id: string) => {
    if (id.length <= 8) return id;
    return `${id.toString().slice(0, 4)}...${id.toString().slice(-4)}`;
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-black">
              My Orders
            </h1>
            <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 max-w-lg">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                    <div className={`p-3 rounded-full ${stat.bgColor} mt-3 sm:mt-0 flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="hidden sm:block text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={handleStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 border-gray-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              {/* Desktop view: Table */}
              <div className="hidden md:block rounded-md border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('id')}
                          className="p-0 font-medium"
                        >
                          Order ID
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('total')}
                          className="p-0 font-medium"
                        >
                          Total
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('placedOn')}
                          className="p-0 font-medium"
                        >
                          Date
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id} className="border-gray-200">
                          <TableCell className="font-medium">#{trimOrderId(order.id)}</TableCell>
                          <TableCell>
                            <div className="grid grid-cols-3 gap-2 max-w-[120px]">
                              {order.items.map((orderItem, idx) => (
                                <div key={idx} className='relative w-10 h-10'>
                                  <Image
                                    src={orderItem.item.thumbnail}
                                    alt={orderItem.item.title}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {order.paymentStatus === 'Success'
                              ? formatDate(new Date(new Date(order.placedOn).setDate(new Date(order.placedOn).getDate() + 7)).toISOString())
                              : 'Payment Not Confirmed'
                            }
                          </TableCell>
                          <TableCell>₹ {order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeVariant(order.orderStatus)}>
                              {order.orderStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusBadge(order.paymentStatus)}>
                              {order.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(String(order.placedOn))}</TableCell>
                          <TableCell>
                            <Button
                              onClick={()=>handleViewOrder(order)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-orange-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-gray-500">No orders found matching your criteria.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view: Cards */}
              <div className="space-y-4 md:hidden">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="relative w-8 h-8 rounded overflow-hidden">
                              <Image 
                                src={item.item.thumbnail} 
                                alt={item.item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                              +{order.items.length - 2}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-500">
                          Delivery expected {formatDate(new Date(new Date(order.placedOn).setDate(new Date(order.placedOn).getDate() + 7)).toISOString())}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusBadgeVariant(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                        <Button
                        onClick={()=>handleViewOrder(order)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-orange-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found matching your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder ?? undefined}
      />
    </>
  );
}