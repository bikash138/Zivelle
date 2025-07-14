import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Categories', count: 8 },
    { id: 'men', label: 'Men', count: 4 },
    { id: 'women', label: 'Women', count: 4 },
    { id: 'kids', label: 'Kids', count: 0 },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[90vh] flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-orange-600" />
            Filters
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            
            {/* Categories */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Categories</Label>
              <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem 
                      value={category.id} 
                      id={category.id}
                      className="border-2 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                    />
                    <Label 
                      htmlFor={category.id} 
                      className="flex-1 cursor-pointer flex items-center justify-between"
                    >
                      <span className={category.count === 0 ? 'text-muted-foreground' : ''}>
                        {category.label}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Price Range</Label>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-4"
              >
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </motion.div>
            </div>

            {/* Size */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Size</Label>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="grid grid-cols-3 gap-2"
              >
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSize(size)}
                    className={`h-10 ${
                      selectedSizes.includes(size)
                        ? 'bg-purple-600 hover:bg-purple-700 border-purple-600'
                        : 'hover:border-purple-600 hover:text-purple-600'
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-6 pt-4 border-t bg-background"
        >
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-orange-500 hover:bg-orange-700"
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};