'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Package, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/formatDate';
import { Copy } from 'lucide-react';

interface OrderType {
  placedOn: Date
  total: number
  id: string;
  orderStatus: string
  paymentStatus: string
  customerId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  items: {
    item: {
      thumbnail: string;
      title: string;
    };
  }
}
  interface OrdersProps {
    initialOrders: OrderType[];
  }

export function Orders({ initialOrders }: OrdersProps) {

  const[orders] = useState<OrderType[]>(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('placedOn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');


  useEffect(()=>{
    setFilteredOrders(orders)
  },[orders])
  
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

    // if (search) {
    //   filtered = filtered.filter(order =>
    //     order.id.toLowerCase().includes(search.toLowerCase()) ||
    //     order.item.title.toLowerCase().includes(search.toLowerCase())
    //   );
    // }

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
        return 'outline';
      case 'Shipped':
        return 'default';
      case 'Delivered':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-400';
      case 'Shipped':
        return 'text-blue-400';
      case 'Delivered':
        return 'text-green-400';
      case 'Cancelled':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'outline';
      case 'Success':
        return 'default';
      case 'Failed':
        return 'destructive';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-400';
      case 'Success':
        return 'text-green-400';
      case 'Cancelled':
        return 'text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Orders</h2>
        <p className="text-slate-400">Track and manage your orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Orders</p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {orders.filter(o => o.orderStatus === 'Pending').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Shipped</p>
                <p className="text-2xl font-bold text-blue-400">
                  {orders.filter(o => o.orderStatus === 'Shipped').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Spent</p>
                <p className="text-2xl font-bold text-green-400">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Order History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[180px] cursor-pointer hover:bg-gray-600 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                <SelectItem value="Pending" className="text-white">Pending</SelectItem>
                <SelectItem value="Shipped" className="text-white">Shipped</SelectItem>
                <SelectItem value="Delivered" className="text-white">Delivered</SelectItem>
                <SelectItem value="Cancelled" className="text-white">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">
                      Order 
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-slate-300">Delivery Time</TableHead>
                  <TableHead className="hidden md:table-cell text-slate-300">Cart Value</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-slate-300">Payment</TableHead>
                  <TableHead className="hidden md:table-cell text-slate-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('placedOn')}
                      className="text-slate-300 hover:text-white hover:bg-gray-700 cursor-pointer p-0 font-medium"
                    >
                      Date
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                    {/* Thumbnails: always visible */}
                    <TableCell className="font-medium text-white flex items-center gap-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-[120px] sm:max-w-[180px] md:max-w-[240px]">
                        {order.items.map((orderItem, idx) => (
                          <img
                            key={idx}
                            src={orderItem.item.thumbnail}
                            alt={orderItem.item.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ))}
                      </div>
                    </TableCell>

                    {/* Delivery Time: hidden on xs, visible on sm+ */}
                    <TableCell className="hidden sm:table-cell">
                      <div className="font-medium text-white">
                        {order.paymentStatus === 'Success'
                          ? <>Expected Delivery: {formatDate(new Date(new Date(order.placedOn).setDate(new Date(order.placedOn).getDate() + 7)).toISOString())}</>
                          : <>Payment Not Confirmed</>
                        }
                      </div>
                    </TableCell>

                    {/* Cart Value: hidden on xs, visible on md+ */}
                    <TableCell className="hidden md:table-cell text-slate-200">
                      ₹{order?.total}
                    </TableCell>

                    {/* Status: always visible */}
                    <TableCell>
                      <Badge 
                        variant={getStatusBadgeVariant(order.orderStatus)} 
                        className={`text-xs ${getStatusColor(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </Badge>
                    </TableCell>

                    {/* Payment: hidden on xs, visible on sm+ */}
                    <TableCell className="hidden sm:table-cell">
                      <Badge 
                        variant={getPaymentStatusBadge(order.paymentStatus)} 
                        className={`text-xs ${getPaymentStatusColor(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>

                    {/* Date: hidden on xs, visible on md+ */}
                    <TableCell className="hidden md:table-cell text-slate-200">
                      {formatDate(String(order?.placedOn))}
                    </TableCell>

                    {/* Actions: always visible */}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No orders found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}