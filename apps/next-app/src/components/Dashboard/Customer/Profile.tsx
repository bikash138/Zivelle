'use client'
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';
import { AddressSection } from './core/AddressSection/AddressSection';
import ProfileInformation from './core/ProfileInformation/ProfileInformation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';

export function Profile() {
  const profile = useSelector((state: RootState) => state.profile.profile);
  console.log("Profile: ", profile)
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="relative">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-black">
            Profile
          </h1>
          <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-4 max-w-lg">
          Manage your customer profile and account settings
        </p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border border-gray-100">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 border-4 bg-orange-600">
                  <AvatarFallback className="bg-orange-600 text-white text-5xl font-bold">
                    {profile?.name ? profile.name.split(' ').map(n => n[0]).join('') : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{profile?.name}</h2>
                  <div className="flex flex-col gap-3 mt-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">
                      <Calendar className="w-3 h-3 mr-1" />
                      Customer since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    
      <div className='min-h-[400px] flex flex-col lg:flex-row lg:items-start gap-5'>
        {/* Profile Information Section*/}
        <div className="w-full h-full lg:w-[50%] grid grid-cols-1 lg:grid-cols-1 gap-8">
          <ProfileInformation profile={profile}/>
        </div>

        {/* Address Section */}
        <div className='w-full lg:w-[50%]'>
          <AddressSection initialAddresses={profile?.addresses ?? []} />
        </div>
      </div>
    </div>
  );
}