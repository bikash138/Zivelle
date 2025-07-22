'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Package, ArrowUpDown, ShoppingBag, Clock, Truck, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/formatDate';
import { motion } from 'framer-motion';
import { OrderDetailsModal } from './core/OrderDetailsModal';
import axios from 'axios';
import {ModalOrderData} from '@/types/index'
import { OrderItem } from '@/types/sellerTypes';

export function Orders({ initialOrders }: { initialOrders: OrderItem[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('placedOn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<ModalOrderData | null>(null)

  // Stats calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.itemStatus === 'Pending').length;
  const shippedOrders = orders.filter(o => o.itemStatus === 'Shipped').length;
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
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Shipped",
      value: shippedOrders,
      icon: Truck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleViewOrder = (order: OrderItem) => {
    if(order.itemStatus === 'Delivered'){
      toast.info('This order has already marked delivered and cannot be modified')
      return
    }
    const modalOrderData = {
      id: order.id.toString(),
      title: order.item.title,
      thumbnail: order.item.thumbnail,
      price: order.price,
      size: order.size,
      customerName: order.order.customer?.name || 'Customer',
      customerAddress: order.order.customer?.address || 'Address not provided',
      itemStatus: order.itemStatus ,
      placedOn: formatDate(String(order.order.placedOn))
    };
    
    setSelectedOrder(modalOrderData);
    setIsModalOpen(true);
  }

  const handleStatusUpdate = async (orderItemId: string, newStatus: string) => {
    setIsLoading(true)
    try {
      const response = await axios.patch(`/api/seller/orders/${orderItemId}`, {
        itemStatus: newStatus
      })
      
      const data = response.data
      
      if (data.success) {
        const updatedOrders = orders.map(order => 
          order.id === Number(orderItemId) 
            ? { ...order,
                itemStatus: newStatus as OrderItem['itemStatus']
              } 
            : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        toast.success('Order Status Updated');
        setIsLoading(false)
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating the order');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Order ID copied!');
  };

  const trimOrderId = (id: string) => {
    if (id.length <= 8) return id;
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  };

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
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(order => order.itemStatus === status);
    }

    // Sort orders
    filtered = [...filtered].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      if (sort === 'id') {
        aValue = a.orderId;
        bValue = b.orderId;
      } else if (sort === 'total') {
        aValue = a.price;
        bValue = b.price;
      } else if (sort === 'placedOn') {
        aValue = new Date(a.order.placedOn);
        bValue = new Date(b.order.placedOn);
      } else if (sort === 'quantity') {
        aValue = a.quantity;
        bValue = b.quantity;
      } else if (sort === 'status') {
        aValue = a.itemStatus;
        bValue = b.itemStatus;
      } else if (sort === 'item') {
        aValue = a.item.title;
        bValue = b.item.title;
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

  return (
    <>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-black">
              Orders
            </h1>
            <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 max-w-lg">
            Manage your orders, update your order status
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
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
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
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
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
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
                    { filteredOrders.length > 0 
                      ? ( filteredOrders.map((order) => (
                        <TableRow key={order.id} className="border-gray-200">
                          <TableCell className="font-medium flex items-center gap-2">
                            <span>{trimOrderId(order.orderId)}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-orange-600"
                              onClick={() => handleCopy(order.orderId)}
                              title="Copy Order ID"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>{order.item.title}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>₹{order.price}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeVariant(order.itemStatus)}>
                              {order.itemStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(String(order.order.placedOn))}</TableCell>
                          <TableCell>
                            <Button
                              onClick={()=>handleViewOrder(order)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-orange-600"
                            >
                              <Eye className="cursor-pointer h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ): (
                        <div className="text-center py-12">
                          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No orders found matching your criteria.</p>
                        </div>
                      )
                    }
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view: Cards */}
              <div className="space-y-4 md:hidden">
                {filteredOrders.length > 0 
                  ? (
                  filteredOrders.map((order, index) => (
                    <motion.div
                      key={order.orderId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">{trimOrderId(order.orderId)}</p>
                          <p className="text-sm text-gray-600">
                            {order.order.customer?.name || 'Customer'} • {order.item.title}
                          </p>
                          <p className="text-xs text-gray-500">Quantity: {order.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹{order.price}</p>
                          <Badge className={getStatusBadgeVariant(order.itemStatus)}>
                            {order.itemStatus}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{formatDate(String(order.order.placedOn))}</p>
                        </div>
                        <Button
                          onClick={() => handleViewOrder(order)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-orange-600"
                        >
                          <Eye className="cursor-pointer h-4 w-4" />
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
      {/* Order Details Modal */}

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
        isLoading={isLoading}
      />
    </>
  );
}