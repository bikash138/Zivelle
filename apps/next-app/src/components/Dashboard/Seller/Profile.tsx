import { useState } from 'react';
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

// Mock data
const mockProfile: SellerProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  storeName: 'John\'s Fashion Store',
  joinDate: '2023-06-15',
  totalSales: 15420.50,
  activeListings: 12
};

export function Profile() {
  // const { toast } = useToast();
  const [profile, setProfile] = useState<SellerProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<SellerProfile>(mockProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfile(editedProfile);
    setIsEditing(false);
    setIsSaving(false);
    
    // toast({
    //   title: 'Success!',
    //   description: 'Profile updated successfully'
    // });
  };

  const handleInputChange = (field: keyof SellerProfile, value: string | number) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
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
                <AvatarImage src="/placeholder.svg" alt={profile.name} />
                <AvatarFallback className="text-2xl bg-orange-600 text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                <p className="text-slate-400">{profile.storeName}</p>
                <Badge variant="secondary" className="mt-2">
                  <Store className="h-3 w-3 mr-1" />
                  Seller since {new Date(profile.joinDate).getFullYear()}
                </Badge>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={handleEdit} className="bg-orange-600 hover:bg-orange-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-slate-600 text-slate-300"
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
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                  <p className="text-white">{profile.name}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                  <p className="text-white">{profile.email}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName" className="text-slate-300">Store Name</Label>
              {isEditing ? (
                <Input
                  id="storeName"
                  value={editedProfile.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                  <p className="text-white">{profile.storeName}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Member Since</Label>
              <div className="p-3 bg-slate-700 rounded-md border border-slate-600">
                <p className="text-white flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                  {new Date(profile.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
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
                  ${profile.totalSales.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Total Sales</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <Package className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {profile.activeListings}
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