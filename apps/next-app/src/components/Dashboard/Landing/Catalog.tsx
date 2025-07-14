'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, Filter, Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/Landing/Common/ProductCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FilterModal } from '../Common/FilterModal';
import { useSearchParams } from 'next/navigation';
import { ResponsiveSkeletonLoader } from '@/components/Loaders/CatalogLoader';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  size: string[]
  category: string;
  subCategory: string
  createdAt: Date;
}

interface CatalogProps {
  items: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ items } :CatalogProps) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [filteredProducts, setFilteredProducts] = useState(items);
  const [sortBy, setSortBy] = useState('featured');
  const [size, setSize] = useState('')
  const [filterCategory, setFilterCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModal, setFilterModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'All', name: 'All Categories', count: items.length },
    { id: 'Men', name: 'Men', count: items.filter(p => p.category === 'Men').length },
    { id: 'Women', name: 'Women', count: items.filter(p => p.category === 'Women').length },
    { id: 'Kids', name: 'Kids', count: items.filter(p => p.category === 'Kids').length },
  ];

  const handleSort = (value: string) => {
    setSortBy(value);
    const  sorted = [...filteredProducts];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      // case 'rating':
      //   sorted.sort((a, b) => b.rating - a.rating);
      //   break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const handleFilter = useCallback(() => {
    let filtered = [...items];

    if (filterCategory !== 'All') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    }

    if(size){
      filtered = filtered.filter( product => 
        product.size.includes(size)
      )
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  },[items, filterCategory, searchTerm, size, priceRange]);

  useEffect(() => {
    handleFilter();
  }, [filterCategory, searchTerm, priceRange, size, handleFilter]);

  useEffect(()=>{
    setIsLoading(false)
  },[])

  if (isLoading) {
    return <ResponsiveSkeletonLoader />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/4 space-y-6 sticky top-8 self-start hidden lg:block"
          >
            <div className="glass rounded-lg p-6 border border-gray-200 dark:border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                <Filter size={20} className="mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filterCategory === category.id}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{category.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
                    <motion.button
                      key={sizeOption}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={()=>setSize(size === sizeOption ? '' : sizeOption)}
                      className={`cursor-pointer py-2 px-3 border rounded-lg text-sm transition-all
                      ${size === sizeOption
                        ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {sizeOption}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 20,
              delay: 0.2 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 lg:hidden`}
          >
            <Button
              onClick={()=>setFilterModal(true)}
              size="lg"
              className="cursor-pointer h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 border-2 font-bold border-white text-gray-900"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </Button>
          </motion.div>

          {/* Main Content */}
          <div className="lg:w-3/4">
          <>
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                <p className="text-gray-600 dark:text-gray-400">{filteredProducts.length} items found</p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center glass rounded-lg p-1 border border-gray-200 dark:border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-white/10 text-gray-400'
                    }`}
                  >
                    <Grid size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <List size={16} />
                  </motion.button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="appearance-none glass border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 transition-colors duration-300"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rated</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-3 text-gray-600 dark:text-gray-400 pointer-events-none" />
                </div>
              </div>
            </motion.div>
            
            {/* Products Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >              
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} viewMode={viewMode} index={index}/>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-12"
            >
              <div className="flex items-center space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Previous
                </motion.button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      page === 1 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent' 
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Next
                </motion.button>
              </div>
            </motion.div> */}
            </>
          </div>
        </div>
      </div>
      <FilterModal
        isOpen={filterModal}
        onClose={()=>setFilterModal(false)}
      />
    </>
  );
};

export default Catalog;