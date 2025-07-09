'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import {ListSchema} from '@repo/zod/zodTypes'
import {z} from 'zod'
import { formatDate } from '@/lib/formatDate'

type ListedItems = z.infer<typeof ListSchema>;
interface ListedItemsProps {
  initialListedItems: ListedItems[];
}

export function ListedItems({ initialListedItems }: ListedItemsProps) {

  const [listedItems] = useState<ListedItems[]>(initialListedItems)
  const [filteredItems, setFilteredItems] = useState<ListedItems[]>(listedItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    setFilteredItems(listedItems);
  }, [listedItems]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterItems(term, statusFilter, categoryFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterItems(searchTerm, status, categoryFilter);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    filterItems(searchTerm, statusFilter, category);
  };

  const filterItems = (search: string, status: string, category: string) => {
    let filtered = listedItems;

    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }

    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    setFilteredItems(filtered);
  };

 const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'secondary'; 
    case 'Draft':
      return 'outline';   
    case 'Sold':
      return 'destructive';
    default:
      return 'default';  
  }
 };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Listed Items</h2>
        <p className="text-slate-400">Manage your listed items</p>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Items</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 ">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search items..."
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
                <SelectItem value="Active" className="text-white">Active</SelectItem>
                <SelectItem value="Sold" className="text-white">Sold</SelectItem>
                <SelectItem value="Draft" className="text-white">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Categories</SelectItem>
                <SelectItem value="Men" className="text-white">Men</SelectItem>
                <SelectItem value="Women" className="text-white">Women</SelectItem>
                <SelectItem value="Children" className="text-white">Children</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Item</TableHead>
                  <TableHead className="text-slate-300">Category</TableHead>
                  <TableHead className="text-slate-300">Size</TableHead>
                  <TableHead className="text-slate-300">Price</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{item.title}</div>
                        <div className="text-sm text-slate-400 truncate max-w-[200px]">
                          {item.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-200">{item.category}</TableCell>
                    <TableCell className="text-slate-200">{item.stock}</TableCell>
                    <TableCell className="text-slate-200">${item.price}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(item.status)} className="text-xs">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-200">{formatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-slate-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No items found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}