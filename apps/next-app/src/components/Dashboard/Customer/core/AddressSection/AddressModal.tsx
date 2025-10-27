import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { AddressType } from '@/types';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addAddress } from '@/redux/slices/profileSlice';

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  editingAddress?: AddressType | null;
  onAddressAdded?: (address: AddressType) => void
  onAddressUpdated?: (address: AddressType) => void;
}

export function AddressModal({
  open,
  onClose,
  editingAddress,
  onAddressAdded,
  onAddressUpdated
}: AddressModalProps) {

  const{
    register,
    handleSubmit,
    reset,
  } = useForm<AddressType>()

  useEffect(() => {
    if (editingAddress) {
      reset(editingAddress);
    } else {
      reset();
    }
  }, [editingAddress, reset]);

  const [isSaving, setIsSaving] = useState(false)
  const dispatch = useDispatch()
  
  const onsubmit = async (data: AddressType) => {
    setIsSaving(true)
    if (editingAddress) {
      const response = await axios.patch('/api/user/profile/address', data)
      if(response.data?.success){
        onAddressUpdated?.(response.data.updatedAddress as AddressType);
        toast.success('Address Updated Successfully')
      }
      else{
        toast.error('Cannot update Address')
      }
      reset()
    } else {
      const response = await axios.post('/api/user/profile/address', data)
      if(response.data?.success){
        onAddressAdded?.(data)
        dispatch(addAddress(data))
        toast.success("Address Added Successfully")
      }else{
        toast.error("Cannot add Address")
      }
      reset()
    }
    setIsSaving(false)
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </DialogTitle>
          <DialogDescription>
            {editingAddress
              ? 'Update your address details below'
              : 'Fill in the details to add a new address'}
          </DialogDescription>
        </DialogHeader>
        
        {/* Address Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={editingAddress?.id || 'new'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-4 mt-4"
          >
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                {...register('fullName')}
                placeholder="Full Name"
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                {...register('phone')}
                placeholder="1234567890"
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                {...register('street')}
                placeholder="123 Main Street, Apt 4B"
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  {...register('city')}
                  placeholder="New York"
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  {...register('state')}
                  placeholder="NY"
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code *</Label>
                <Input
                  {...register('postalCode')}
                  placeholder="102246"
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  {...register('country')}
                  placeholder="United States"
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                disabled={isSaving}
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isSaving ? <Loader className="h-4 w-4" />  : editingAddress ? 'Update Address' : 'Add Address'}
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
