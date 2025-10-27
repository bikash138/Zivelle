import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { AddressType } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import Link from 'next/link';
import { DeliveryAddressType } from '@/app/(landing)/cart/page';

interface AddressSelectorProps {
  onSelect: (address: DeliveryAddressType) => void;
  selectedAddress: DeliveryAddressType | null;
}
export function AddressSelector({onSelect, selectedAddress}: AddressSelectorProps) {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  const handleSelectAddress = (address: AddressType) => {
    setSelectedAddressId(address.id)
    const deliveryAddress = {
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.postalCode,
    }
    console.log("Delivery Address: ", deliveryAddress)
    if(deliveryAddress){
      onSelect(deliveryAddress)
      setIsDrawerOpen(false);
    }
  };
  
  if (loading) {
    return (
      <Card className="p-4 border-orange-200">
        <div className="h-20 bg-orange-50 rounded-lg animate-pulse" />
      </Card>
    );
  }

  return (
    <>
      <Card className="p-4 border-orange-200 bg-orange-50/30">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <div className="flex items-start gap-3 flex-1">
            <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Delivery Address
                </h3>
              </div>
              {selectedAddress ? (
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{selectedAddress.fullName}</p>
                  <p className="text-gray-600 line-clamp-1">
                    {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-orange-600 font-medium">
                  Select or add a delivery address
                </p>
              )}
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </Card>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Select Delivery Address
              </DrawerTitle>
              <Link href={'/user/profile'}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                  className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              </Link>
            </div>
          </DrawerHeader>

          <div className="overflow-y-auto p-4">
            {profile?.addresses.length === 0  ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-orange-300" />
                <p className="text-gray-600 mb-4">No addresses saved yet</p>
                <Button
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                  className="gap-2 bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Address
                </Button>
              </div>
            ) : (
              <div className="space-y-3 grid grid-cols-2 lg:grid-cols-4 space-x-2">
                <AnimatePresence mode="popLayout">
                  {profile?.addresses?.map((address: AddressType) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`relative p-4 cursor-pointer transition-all duration-200 ${
                          selectedAddressId === address.id
                            ? 'border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                              selectedAddressId === address.id
                                ? 'border-orange-600 bg-orange-600'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedAddressId === address.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {address.fullName}
                                </span>
                                {address.isDefault && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-orange-600 text-white rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-1">
                              {address.phone}
                            </p>

                            <p className="text-sm text-gray-700">
                              {address.street && `${address.street}`}
                            </p>

                            <p className="text-sm text-gray-700">
                              {address.city}, {address.state} {address.postalCode}
                            </p>

                            <p className="text-sm text-gray-600">{address.country}</p>
                          </div>

                          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
