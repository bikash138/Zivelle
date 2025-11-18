'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, MapPin, Loader } from 'lucide-react'
import { AddressCard } from './AddressCard'
import { AddressModal } from './AddressModal'
import { toast } from 'sonner'
import axios from 'axios'
import { AddressType } from '@/types'
import { useDispatch } from 'react-redux'
import { removeAddress, updateAddress } from '@/redux/slices/profileSlice'

export function AddressSection({ initialAddresses }: { initialAddresses: AddressType[] }) {
  const [addresses, setAddresses] = useState<AddressType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (initialAddresses?.length) {
      setAddresses(initialAddresses)
    }
  }, [initialAddresses])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const response = await axios.delete('/api/user/profile/address', { data: { id: deleteId } })
      if (response.data?.success) {
        dispatch(removeAddress(deleteId))
        setAddresses((prev) => prev.filter((addr) => addr.id !== deleteId))
        toast.success('Address deleted successfully')
      }
    } catch (error) {
      console.log('Something went wrong while deleting address', error)
      toast.error('Cannot delete Address')
    }
    setIsDeleting(false)
    setDeleteId(null)
  }

  const handleEdit = (address: AddressType) => {
    setEditingAddress(address)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setIsModalOpen(true)
  }

  const handleAddressEdit = (updatedAddress: AddressType) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
    )
    dispatch(updateAddress(updatedAddress))
    setEditingAddress(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="h-[400px] overflow-y-auto">
        <Card className="shadow-sm">
          <CardHeader className="bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6">
            {addresses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No addresses saved</h3>
                <p className="text-gray-500 mb-6">Add your first address to get started</p>
                <Button
                  onClick={handleAddNew}
                  className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      onEdit={handleEdit}
                      onDelete={(id) => setDeleteId(id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <AddressModal
          // Using dynamic key to force React to remount the modal when switching
          // between 'add' and 'edit' mode, ensuring form state resets properly.
          key={editingAddress ? editingAddress.id : 'new'}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingAddress(null)
          }}
          onAddressAdded={(newAddress) => setAddresses((prev) => [newAddress, ...prev])}
          editingAddress={editingAddress}
          onAddressUpdated={handleAddressEdit}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Address</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this address? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                {isDeleting ? <Loader className="h-4 w-4" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  )
}
