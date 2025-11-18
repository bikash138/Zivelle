import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { X, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  categories: { id: string; name: string; count: number }[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  // selectedSize: string
  // onSizeChange: (size: string) => void
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}) => {
  // const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const clearFilters = () => {
    onCategoryChange('All')
    onPriceRangeChange([0, 10000])
  }

  const handleApplyFilters = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[90vh] flex flex-col p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <SlidersHorizontal className="h-5 w-5 text-orange-600" />
            Filters
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
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
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Categories
              </Label>
              <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem
                      value={category.id}
                      id={category.id}
                      className="border-2 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                    />
                    <Label
                      htmlFor={category.id}
                      className="flex-1 cursor-pointer flex items-center justify-between text-gray-700 dark:text-gray-300"
                    >
                      <span
                        className={
                          category.count === 0
                            ? 'text-gray-400 dark:text-gray-500'
                            : 'text-gray-900 dark:text-white'
                        }
                      >
                        {category.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {category.count}
                      </Badge>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Price Range
              </Label>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Slider
                    value={[priceRange[1]]}
                    onValueChange={(value) => onPriceRangeChange([priceRange[0], value[0]])}
                    max={10000}
                    min={0}
                    step={100}
                    className="w-full [&_[data-slot=slider-track]]:bg-gray-200 dark:[&_[data-slot=slider-track]]:bg-gray-700 [&_[data-slot=slider-range]]:bg-orange-500 [&_[data-slot=slider-thumb]]:border-orange-500 [&_[data-slot=slider-thumb]]:bg-white dark:[&_[data-slot=slider-thumb]]:bg-gray-800 [&_[data-slot=slider-thumb]]:hover:ring-orange-500/50 [&_[data-slot=slider-thumb]]:focus-visible:ring-orange-500/50"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </motion.div>
            </div>

            {/* Size */}
            {/* <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Size</Label>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="grid grid-cols-3 gap-2"
              >
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSize(size)}
                    className={`h-10 py-2 px-3 border rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </motion.div>
            </div> */}
          </motion.div>
        </div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              Clear All
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
