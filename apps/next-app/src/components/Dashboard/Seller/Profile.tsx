import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit, Save, X, User, Store, Mail, Calendar, DollarSign, Package } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
import type { SellerProfile } from '@/types';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

// Mock data
const mockProfile: SellerProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  store: 'John\'s Fashion Store',
  createdAt: '2023-06-15',
};

export function Profile() {

  const{
    register,
    handleSubmit,
    reset,
  } = useForm()

  useEffect(()=>{
  const fetchSeller = async()=>{
    const stored = localStorage.getItem('sellerProfile')
    if(stored){
      const seller = JSON.parse(stored)
      setProfile(seller)
      setEditedProfile(seller);
      return
    }
    const toastId = toast.loading('Loading...')
    try{
      const response = await axios.get('/api/createSeller')
      if(!response.data?.success){
        throw new Error('Cannnot get seller details')
      }
      const seller = response.data?.userDetails
      setProfile(seller)
      setEditedProfile(seller);
      localStorage.setItem('sellerProfile', JSON.stringify(seller))
      toast.success('Profile Details Fetched', {id: toastId})
    }catch(error){
      toast.error('Cant get Profile Details', {id: toastId})
      console.log('Error while getting seller details', error)
    }
  }
  fetchSeller()
},[])

  // const { toast } = useToast();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<SellerProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function formatDate(isoString: string) {
    const date = new Date(isoString);

    // Options to display date nicely
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  }

  const handleEdit = () => {
    setIsEditing(true);
    //@ts-ignore
    reset(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = async (data:any) => {
    setIsSaving(true);
    console.log(data)
    const toastId = toast.loading('Updating...')
    try{
      await axios.patch('/api/createSeller', {
        name: data.name,
        email: data.email,
        store: data.store,
      });
      toast.success('Profile Updated Successfully', {id: toastId})
    }catch(error){
      console.log("Can't update the profile", error)
      toast.error('Profile Not updated', {id: toastId})
    }
    setProfile(editedProfile);
    setIsEditing(false);
    setIsSaving(false);
  };

  

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Profile</h2>
        <p className="text-slate-400">Manage your seller profile and account settings</p>
      </div>

      {/* Profile Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt={profile?.name} />
                <AvatarFallback className="text-2xl bg-orange-600 text-white">
                  {profile?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-white">{profile?.name}</h3>
                <p className="text-slate-400">{profile?.store}</p>
                <Badge variant="secondary" className="mt-2">
                  <Store className="h-3 w-3 mr-1" />
                  Seller since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
                </Badge>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={handleEdit} className="cursor-pointer bg-orange-600 hover:bg-orange-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSubmit(handleSave)}
                  disabled={isSaving}
                  className="cursor-pointer bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="cursor-pointer border-slate-600 text-slate-300"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <form id='profile-form'>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    {...register('name')}
                    // onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                ) : (
                  <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                    <p className="text-white">{profile?.name}</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    {...register('email')}
                    type="email"
                    // onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                ) : (
                  <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                    <p className="text-white">{profile?.email}</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-slate-300">Store Name</Label>
                {isEditing ? (
                  <Input
                    id="store"
                    {...register('store')}
                    // onChange={(e) => handleInputChange('store', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                ) : (
                  <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                    <p className="text-white">{profile?.store}</p>
                  </div>
                )}
              </div>
            </form>
            

            <div className="space-y-2">
              <Label className="text-slate-300">Member Since</Label>
              <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                <p className="text-white flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                  {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Account Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  $9000
                </div>
                <div className="text-sm text-slate-400">Total Sales</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <Package className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  90
                </div>
                <div className="text-sm text-slate-400">Active Listings</div>
              </div>
            </div>

            <Separator className="bg-slate-600" />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Account Status</span>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  Active
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Verification Status</span>
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  Verified
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Seller Rating</span>
                <div className="flex items-center text-yellow-400">
                  ★★★★★ <span className="ml-1 text-white">4.9</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}