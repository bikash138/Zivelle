import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Package, ArrowUpDown } from 'lucide-react';
import type { Order } from '@/types';

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    itemName: 'Premium Cotton T-Shirt',
    quantity: 2,
    status: 'Shipped',
    date: '2024-01-25',
    total: 59.98,
    buyerEmail: 'john@example.com'
  },
  {
    id: 'ORD-002',
    itemName: 'Designer Jeans',
    quantity: 1,
    status: 'Delivered',
    date: '2024-01-20',
    total: 89.99,
    buyerEmail: 'sarah@example.com'
  },
  {
    id: 'ORD-003',
    itemName: 'Kids Summer Dress',
    quantity: 1,
    status: 'Pending',
    date: '2024-01-28',
    total: 39.99,
    buyerEmail: 'mike@example.com'
  },
  {
    id: 'ORD-004',
    itemName: 'Casual Sneakers',
    quantity: 1,
    status: 'Cancelled',
    date: '2024-01-15',
    total: 79.99,
    buyerEmail: 'anna@example.com'
  },
  {
    id: 'ORD-005',
    itemName: 'Premium Cotton T-Shirt',
    quantity: 3,
    status: 'Shipped',
    date: '2024-01-30',
    total: 89.97,
    buyerEmail: 'david@example.com'
  }
];

export function Orders() {
  const [orders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.itemName.toLowerCase().includes(search.toLowerCase()) ||
        order.buyerEmail.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(order => order.status === status);
    }

    // Sort orders
    filtered = [...filtered].sort((a, b) => {
      let aValue: any = a[sort as keyof Order];
      let bValue: any = b[sort as keyof Order];

      if (sort === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Orders</h2>
        <p className="text-slate-400">Track and manage your orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  {orders.filter(o => o.status === 'Pending').length}
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
                  {orders.filter(o => o.status === 'Shipped').length}
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
                <p className="text-sm text-slate-400">Revenue</p>
                <p className="text-2xl font-bold text-green-400">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
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
              <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-white">
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
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('id')}
                      className="text-slate-300 hover:text-white p-0 font-medium"
                    >
                      Order ID
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300">Item</TableHead>
                  <TableHead className="text-slate-300">Quantity</TableHead>
                  <TableHead className="text-slate-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('total')}
                      className="text-slate-300 hover:text-white p-0 font-medium"
                    >
                      Total
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('date')}
                      className="text-slate-300 hover:text-white p-0 font-medium"
                    >
                      Date
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell className="font-medium text-white">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{order.itemName}</div>
                        <div className="text-sm text-slate-400">{order.buyerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-200">{order.quantity}</TableCell>
                    <TableCell className="text-slate-200">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusBadgeVariant(order.status)} 
                        className={`text-xs ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-200">{order.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600"
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