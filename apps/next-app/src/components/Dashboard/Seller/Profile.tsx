'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, User, Calendar, Shield, Star, Loader } from 'lucide-react';
import { setProfile } from '@/redux/slices/profileSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import { formatDate } from '@/lib/formatDate';

interface UpadatedDataForm{
    name: string,
    email: string,
    store: string
  }

export function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState)=>state.profile.profile)
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const{
    register,
    handleSubmit,
    reset,
  } = useForm<UpadatedDataForm>()

  useEffect(()=>{
  const fetchSeller = async()=>{
    if(!profile){
      const toastId = toast.loading('Loading...')
      try{
        const response = await axios.get('/api/seller/profile')
        if(!response.data?.success){
          throw new Error('Cannnot get seller details')
        }
        const userData = response.data?.userDetails

        dispatch(setProfile(userData));
        toast.dismiss(toastId)
      }catch(error){
        toast.error('Cant get Profile Details', {id: toastId})
        console.log('Error while getting seller details', error)
      }
    }
  }
  fetchSeller()
  },[profile, dispatch])

  const handleEdit = () => {
    setIsEditing(true);
    if (profile) {
      reset(profile);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (data:UpadatedDataForm) => {
    setIsSaving(true);
    try{
      const response = await axios.patch('/api/seller/profile', {
        name: data.name,
        email: data.email,
        store: data.store,
      });

      if (response.data?.success) {
        const updatedProfile = response.data.userDetails;
        localStorage.setItem('profile', JSON.stringify(updatedProfile))
        dispatch(setProfile(updatedProfile));
        toast.success('Profile Updated Successfully');
      } else {
        toast.error('Profile Not updated');
      }
    }catch(error){
      console.log("Can't update the profile", error)
      toast.error('Something went worong while updating profile')
    }
    setIsEditing(false);
    setIsSaving(false);
  };

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
            Profile
          </h1>
          <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-4 max-w-lg">
          Manage your seller profile, update your information, and view your account status
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
                <Avatar className="w-24 h-24 border-4 bg-orange-500">
                  <AvatarFallback className="bg-orange-500 text-white text-5xl font-bold">
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{profile?.name}</h2>
                  <p className="text-lg text-gray-600 mt-1">{profile?.store}</p>
                  <div className="flex flex-col gap-3 mt-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">
                      <Calendar className="w-3 h-3" />
                      Seller since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">
                      <Shield className="w-3 h-3" />
                      Verified Seller
                    </Badge>
                  </div>
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  <p>Profile Information</p>
                </div>
                {!isEditing ? (
                  <Button 
                    onClick={handleEdit} 
                    className="cursor-pointer bg-orange-600 hover:bg-orange-700 flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSubmit(handleSave)}
                      disabled={isSaving}
                      className="cursor-pointer bg-green-600 hover:bg-green-700 flex items-center justify-center"
                    >
                      {isSaving ? <Loader className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="destructive"
                      className="cursor-pointer border-slate-600 hover:bg-red-700 flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <form id='profile-form'>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      {...register('name')}
                      className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    />
                  ) : (
                    <div className="p-3 border border-gray-300 rounded-md min-h-[38px] flex items-center">
                      <p className="text-gray-800">{profile?.name}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      type="email"
                      {...register('email')} 
                      className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200" 
                    />
                  ) : (
                    <div className="p-3 border border-gray-300 rounded-md min-h-[38px] flex items-center">
                      <p className="text-gray-800">{profile?.email}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="text-sm font-medium text-gray-700">Store Name</Label>
                  {isEditing ? (
                    <Input 
                      id="storeName" 
                      {...register('store')}
                      className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200" 
                    />
                  ) : (
                    <div className="p-3 border border-gray-300 rounded-md min-h-[38px] flex items-center">
                      <p className="text-gray-800">{profile?.store}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  {isEditing ? (
                    <Input 
                      id="phone" 
                      defaultValue="+91 98765 43210" 
                      className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200" 
                    />
                  ) : (
                    <div className="p-3 border border-gray-300 rounded-md min-h-[38px] flex items-center">
                      <p className="text-gray-800">{"+91 98765 43210"}</p>
                    </div>
                  )}
                </div>
                {
                  isEditing && (
                    <Button type='button' disabled={isSaving} onClick={handleSubmit(handleSave)} className="cursor-pointer w-full bg-orange-600 hover:bg-orange-700 text-white">
                      {isSaving ? 'Updating...' : 'Update Profile' }
                    </Button>
                  ) 
                }
              </CardContent>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Account Status</p>
                    <p className="text-sm text-gray-600">Your account is active</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Verification Status</p>
                    <p className="text-sm text-gray-600">Identity verified</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-0">Verified</Badge>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Seller Rating</p>
                    <p className="text-sm text-gray-600">Based on customer reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900">4.9</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Member Since</p>
                    <p className="text-sm text-gray-600">Account creation date</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">July 17, 2025</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
}



