'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import { ListItemSchema } from '@repo/zod/zodTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { sizes } from '@repo/zod/zodTypes'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

import UploadThumbnail from './core/UploadThumbnail'
import { Plus } from 'lucide-react'

const sizeOptions = [...sizes]

export function ListNewItem() {
  type formType = z.infer<typeof ListItemSchema>

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(ListItemSchema),
    defaultValues: {
      thumbnail: '',
      title: '',
      description: '',
      originalPrice: 0,
      price: 0,
      category: 'Men',
      subCategory: 'Topwear',
      stock: 10,
      size: ['M'],
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetThumbnail, setResetThumbnail] = useState(0)

  const onsubmit = async (data: formType) => {
    const toastId = toast.loading('Listing Item...')
    setIsSubmitting(true)
    try {
      console.log(data)
      const response = await axios.post('/api/seller/listNewItem', data)
      if (!response?.data?.success) {
        throw new Error('Could not Add Product')
      }
      toast.success(response.data?.message, { id: toastId })
      setResetThumbnail((prev) => prev + 1)
      reset()
    } catch (error) {
      console.log('Something went while listing new Item ', error)
      toast.error('Items Not Listed', { id: toastId })
    }
    setIsSubmitting(false)
  }

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
              List New Item
            </h1>
            <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 max-w-lg">
            Create a new listing by filling out the details below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                {/* Product Thumbnail */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Product Thumbnail</Label>
                  <UploadThumbnail
                    errors={errors}
                    setValue={setValue}
                    resetThumbnail={resetThumbnail}
                  />
                </div>

                {/* Item Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter item title"
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title?.message as string}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your item..."
                    rows={4}
                    required
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description?.message as string}</p>
                  )}
                </div>

                {/* Price Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      placeholder="499"
                      required
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">{errors.price?.message as string}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      {...register('originalPrice', { valueAsNumber: true })}
                      placeholder="999"
                      required
                    />
                    {errors.originalPrice && (
                      <p className="text-red-500 text-sm">
                        {errors.originalPrice?.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock (pcs)</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register('stock', { valueAsNumber: true })}
                    placeholder="10"
                    required
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm">{errors.stock?.message as string}</p>
                  )}
                </div>

                {/* Sizes */}
                <div className="space-y-2">
                  <Label>Sizes</Label>
                  <Controller
                    name="size"
                    control={control}
                    defaultValue={['M']}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2">
                        {sizeOptions.map((size) => (
                          <motion.div
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={size}
                              checked={field.value?.includes(size)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), size])
                                } else {
                                  field.onChange((field.value || []).filter((s) => s !== size))
                                }
                              }}
                              className="cursor-pointer"
                            />
                            <Label htmlFor={size} className="text-sm">
                              {size}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.size && (
                    <p className="text-red-500 text-sm">{errors.size.message as string}</p>
                  )}
                </div>

                {/* Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue="Men"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Men">Men</SelectItem>
                            <SelectItem value="Women">Women</SelectItem>
                            <SelectItem value="Kids">Kids</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category?.message as string}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Sub Category</Label>
                    <Controller
                      name="subCategory"
                      control={control}
                      defaultValue="Topwear"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Topwear">Topwear</SelectItem>
                            <SelectItem value="Bottomwear">Bottomwear</SelectItem>
                            <SelectItem value="Winterwear">Winterwear</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.subCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.subCategory?.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={isSubmitting}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Listing Item...' : 'Add Item'}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
