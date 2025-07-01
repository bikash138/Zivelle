import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, ImageIcon } from 'lucide-react';
import type { NewItemForm } from '@/types';
import { useForm, Controller } from 'react-hook-form'
import { ListItemSchema } from '@repo/zod/zodTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { sizes } from '@repo/zod/zodTypes';
import axios from 'axios'
import { toast } from "sonner"


const sizeOptions = [...sizes];

export function ListNewItem() {

  type formType = z.infer<typeof ListItemSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(ListItemSchema),
    defaultValues:{
      title: '',
      description: '',
      price: 0,
      category: 'Men',
      subCategory: 'Topwear',
      stock: 10,
      size: ['M']
    }
  })
  // const [formData, setFormData] = useState<NewItemForm>({
  //   title: '',
  //   description: '',
  //   size: 'M',
  //   category: 'Men',
  //   price: 0,
  //   sizes: [],
  // });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     if (file.size > 5 * 1024 * 1024) {
  //       alert({
  //         title: 'Error',
  //         description: 'Image size should be less than 5MB',
  //         variant: 'destructive'
  //       });
  //       return;
  //     }

  //     setFormData(prev => ({ ...prev, image: file }));
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImagePreview(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const removeImage = () => {
  //   setFormData(prev => ({ ...prev, image: undefined }));
  //   setImagePreview(null);
  // };

  const onsubmit = async (data: formType) => {
    const toastId = toast.loading("Listing Item...")
    setIsSubmitting(true)
    try{
      const response = await axios.post('/api/listNewItem', data)
       if(!response?.data?.success){
          throw new Error("Could not Add Product")
        }
      toast.success(response.data?.message, {id: toastId})
      reset()
    }catch(error){
      console.log("Something went while listing new Item", error)
      toast.error("Items Not Listed", {id: toastId})
    }
    setIsSubmitting(false)
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));

  //   // toast({
  //   //   title: 'Success!',
  //   //   description: 'Item listed successfully'
  //   // });

  //   // Reset form
  //   // setFormData({
  //   //   title: '',
  //   //   description: '',
  //   //   size: 'M',
  //   //   category: 'Men',
  //   //   price: 0
  //   // });
  //   setImagePreview(null);
  //   setIsSubmitting(false);
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">List New Item</h2>
        <p className="text-slate-400">Add a new item to your store</p>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
            {/* Image Upload */}
            {/* <div className="space-y-2">
              <Label htmlFor="image" className="text-slate-200">Product Image</Label>
              <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-64 rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
                    <ImageIcon className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                    <div className="space-y-2">
                      <p className="text-slate-400">Drop your image here, or click to browse</p>
                      <p className="text-sm text-slate-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div> */}

            {/* Item Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">Item Title</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter item title"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
              {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title?.message as string}</p>
                )}
            </div>

            {/* Item Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-200">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe your item..."
                rows={4}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
              {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description?.message as string}</p>
                )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-200">Price ($)</Label>
              <Input
                id="price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="499"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
              {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price?.message as string}</p>
                )}
            </div>
          
            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-200">Stock (pcs)</Label>
              <Input
                id="stock"
                type="number"
                {...register('stock', { valueAsNumber: true })}
                placeholder="10"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
              {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock?.message as string}</p>
                )}
            </div>
            

            <div className="grid grid-cols-1 gap-6">

              {/* Size Selection (col 1) */}
              <div className="space-y-2">
                <Label className="text-slate-200">Sizes</Label>
                <Controller
                  name='size'
                  control={control}
                  defaultValue={['M']}
                  render={({ field })=>(
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map((size) => (
                        <label key={size} className="flex items-center space-x-2 text-white">
                          <Checkbox
                            checked={field.value?.includes(size)}
                            onCheckedChange={(checked)=>{
                              if(checked){
                                field.onChange([...(field.value || []), size])
                              }else{
                                field.onChange((field.value || []).filter((s) => s !== size));
                              }
                            }}
                            className='cursor-pointer'
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message as string}</p>
                )}
              </div>

              {/* Merge Category and Sub Category (col 2 and 3) */}
              <div className="col-span-2 flex flex-col md:flex-row gap-4 w-full lg:2-1/3 md:w-1/3">

                {/* Category Selection */}
                <div className="space-y-2 flex-1">
                  <Label className="text-slate-200">Category</Label>
                  <Controller
                    name='category'
                    control={control}
                    defaultValue="Men"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="Men" className="text-white">Men</SelectItem>
                          <SelectItem value="Women" className="text-white">Women</SelectItem>
                          <SelectItem value="Kids" className="text-white">Kids</SelectItem>
                        </SelectContent>
                    </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category?.message as string}</p>
                  )}
                </div>

                {/* Sub Category Selection */}
                <div className="space-y-2 flex-1">
                  <Label className="text-slate-200">Sub Category</Label>
                  <Controller
                    name='subCategory'
                    control={control}
                    defaultValue="Topwear"
                    render={({ field })=>(
                      <Select
                      value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="Topwear" className="text-white cursor-pointer">Topwear</SelectItem>
                          <SelectItem value="Bottomwear" className="text-white cursor-pointer">Bottomwear</SelectItem>
                          <SelectItem value="Winterwear" className="text-white cursor-pointer">Winterwear</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <p className="text-red-500 text-sm">{errors.subCategory?.message as string}</p>
                  )}
                </div>

              </div>

            </div>
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Listing Item...' : 'List Item'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}