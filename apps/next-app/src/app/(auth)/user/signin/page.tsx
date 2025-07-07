'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { SignInSchema } from '@repo/zod/zodTypes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

type formType = z.infer<typeof SignInSchema>;

const Signin = () => {
  const router = useRouter()
  const{
      register,
      handleSubmit,
      reset 
    } = useForm<formType>({
      resolver: zodResolver(SignInSchema),
      defaultValues:{
        email: '',
        password: '',
      }
    })

  const onsubmit = async (data: formType) => {
    const toastId = toast.loading('Signing in...')
    try{
      const response = await axios.post('/api/user/signin', data)
      if(!response.data?.success){
        toast.error(response.data?.message, {id: toastId})
        return
      }
      toast.success(response.data?.message, {id: toastId})
      reset()
      router.push("/dashboard/user/profile")
    }catch(error){
      console.log("Something went wrong while SignIn", error)
      toast.error('SignIn Failed', {id: toastId})
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Zivelle
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Sign In Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
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
                autoComplete="current-password"
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Sign in
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/user/signup"
                className="text-white hover:text-gray-300 font-semibold transition-colors duration-200"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;