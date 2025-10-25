import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, MapPin } from 'lucide-react';
import { AddressType } from '@/types';

interface AddressCardProps {
  address: AddressType;
  onEdit: (address: AddressType) => void;
  onDelete: (id: string) => void;
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative hover:shadow-md transition-shadow">
        <CardContent className="px-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <h3 className="font-semibold text-lg">{address.fullName}</h3>
            </div>
            {address.isDefault && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Default
              </Badge>
            )}
          </div>

          <div className="space-y-1 text-sm text-gray-600 mb-4">
            <p className="font-medium text-gray-900">{address.phone}</p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>

          <div className="flex gap-2 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(address)}
              className="flex-1 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(address.id)}
              className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
