'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignUpSchema } from '@repo/zod/zodTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';

type formType = z.infer<typeof SignUpSchema>;


const Signup = () => {

  const{
    register,
    handleSubmit,
    reset 
  } = useForm<formType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues:{
      name: '',
      store: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })


  const onsubmit = async (data: formType) => {
    const toastId = toast.loading('Creating Account...')
    try{
      const response = await axios.post('/api/signup', data)
      if(!response.data?.success){
        toast.error(response.data?.message, {id: toastId})
        return
      }
      toast.success(response.data?.message, {id: toastId})
      reset()
    }catch(error){
      console.log("Something went wrong while SigningUp", error)
      toast.error('SignUp Failed', {id: toastId})
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Zivelle
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-gray-400">
            Join Zivelle and discover your unique style.
          </p>
        </div>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">
                  Full Name
                </Label>
                <Input
                  {...register('name')}
                  type="text"
                  autoComplete="given-name"
                  required
                  className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">
                  Store name
                </Label>
                <Input
                  {...register('store')}
                  type="text"
                  required
                  className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                  placeholder="Store name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white">
                Email address
              </Label>
              <Input
                {...register('email')}
                type="email"
                autoComplete="email"
                required
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm password
              </Label>
              <Input
                {...register('confirmPassword')}
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-white text-black cursor-pointer hover:bg-gray-200 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Create account
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-white cursor-pointer hover:text-gray-300 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;