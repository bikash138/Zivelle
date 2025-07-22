'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { ListSchema } from '@repo/zod/zodTypes'
import { z } from 'zod'
import { formatDate } from '@/lib/formatDate'
import { motion } from 'framer-motion';

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
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="relative">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-black">
            Profile
          </h1>
          <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-4 max-w-lg">
          Manage your seller profile, update your information, and view your account status
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Items</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-gray-200">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48 border-gray-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Children">Children</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    {/* Content visible only on medium screens and up */}
                    <div className="hidden md:block">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 truncate max-w-[200px]">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-gray-500">Stock: {item.stock}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Price info - visible on all screens */}
                    <div className="text-right mr-2">
                      <p className="font-semibold text-gray-900">₹{item.price}</p>
                      <Badge className={getStatusBadgeVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    {/* Date info - hidden on small screens */}
                    <div className="hidden md:block text-right mr-4">
                      <p className="text-sm text-gray-600">{formatDate(item.createdAt)}</p>
                    </div>
                    
                    {/* Action buttons - visible on all screen sizes */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 sm:p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 sm:p-2 text-gray-500 hover:text-orange-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 sm:p-2 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No items found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}