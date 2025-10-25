import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { AddressType } from '@/types';

export function AddressSelector() {
  const [addresses] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [setIsFormOpen] = useState(false);
  // const [editingAddress, setEditingAddress] = useState<AddressType | null>(null);
  const [loading] = useState(false);

//   useEffect(() => {
//     loadAddresses();
//   }, []);

//   const loadAddresses = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();

//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from('addresses')
//         .select('*')
//         .eq('user_id', user.id)
//         .order('is_default', { ascending: false })
//         .order('created_at', { ascending: false });

//       if (error) throw error;

//       setAddresses(data || []);

//       //@ts-ignore
//       const defaultAddress = data?.find(addr => addr.is_default);
//       if (defaultAddress) {
//         setSelectedAddressId(defaultAddress.id);
//       } else if (data && data.length > 0) {
//         setSelectedAddressId(data[0].id);
//       }
//     } catch (error) {
//       console.error('Error loading addresses:', error);
//       toast.error('Failed to load addresses')
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFormClose = () => {
//     setIsFormOpen(false);
//     setEditingAddress(null);
//     loadAddresses();
//   };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    setIsDrawerOpen(false);
  };

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsDrawerOpen(false);
                  // setIsFormOpen(true);
                }}
                className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </div>
          </DrawerHeader>

          <div className="overflow-y-auto p-4">
            {addresses.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-orange-300" />
                <p className="text-gray-600 mb-4">No addresses saved yet</p>
                <Button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    // setIsFormOpen(true);
                  }}
                  className="gap-2 bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Address
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {addresses.map((address) => (
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
                        onClick={() => handleSelectAddress(address.id)}
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
                              {address.phone}
                              {address.street && `, ${address.street}`}
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

      {/* <AddressForm
        open={isFormOpen}
        onClose={handleFormClose}
        editingAddress={editingAddress}
      /> */}
    </>
  );
}
