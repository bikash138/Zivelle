'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft, Filter, Grid, List, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/Landing/Common/ProductCard';
import { products } from '@/data/products'

const FavouritesPage = () => {
  const [favouriteItems, setFavouriteItems] = useState([
    products[0],
    products[1],
    products[3],
    products[6],
    products[7],
    products[9]
  ]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const removeFavourite = (productId: number) => {
    setFavouriteItems(items => items.filter(item => item.id !== productId));
  };

  const addToCart = (productId: number) => {
    console.log('Added to cart:', productId);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...favouriteItems];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setFavouriteItems(sorted);
  };

  const clearAllFavourites = () => {
    setFavouriteItems([]);
  };

  const addAllToCart = () => {
    favouriteItems.forEach(item => addToCart(item.id));
  };

  if (favouriteItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto border border-white/20"
          >
            <Heart size={40} className="text-gray-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">No favourites yet</h1>
            <p className="text-gray-400">Start browsing and save your favorite items here.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              <Link href="/catalog">Discover Products</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <Button variant="ghost" size="icon" asChild className="hover:bg-white/10">
          <Link href="/catalog">
            <ArrowLeft size={20} />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">My Favourites</h1>
          <p className="text-gray-400">{favouriteItems.length} items saved</p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
      >
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2 border-gray-600 hover:bg-white/10">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="text-red-400 border-red-500/30 hover:bg-red-500/10"
            onClick={clearAllFavourites}
          >
            Clear All
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center glass rounded-lg p-1 border border-white/10">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`h-8 w-8 p-0 ${viewMode === 'grid' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`h-8 w-8 p-0 ${viewMode === 'list' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
            >
              <List size={16} />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-48 glass border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="newest">Recently Added</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Favourites Grid/List */}
      <motion.div 
        layout
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}
      >
        <AnimatePresence>
          {favouriteItems.map((product, index) => (
            <motion.div 
              key={product.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <ProductCard product={product} viewMode={viewMode} />
              
              {/* Favourite Actions Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-4 right-4 flex flex-col space-y-2"
              >
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => removeFavourite(product.id)}
                  className="h-8 w-8 glass-light text-red-400 hover:bg-red-500/20 shadow-sm border border-white/20"
                >
                  <Heart size={16} className="fill-current" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => addToCart(product.id)}
                  className="h-8 w-8 glass-light hover:bg-blue-500/20 shadow-sm border border-white/20"
                >
                  <ShoppingCart size={16} />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Card className="glass border border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white mb-1">Love everything you see?</h3>
                <p className="text-gray-400 text-sm">Add all your favourite items to cart with one click.</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center space-x-2 border-gray-600 hover:bg-white/10">
                  <Share2 size={16} />
                  <span>Share List</span>
                </Button>
                <Button onClick={addAllToCart} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                  Add All to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">You might also like</h2>
          <p className="text-gray-400">Based on your favourite items</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(8, 12).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FavouritesPage;