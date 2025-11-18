'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SignUpSchema } from '@repo/zod/zodTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Logo from '@/assets/Logo.png'

type formType = z.infer<typeof SignUpSchema>

const Signup = () => {
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<formType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      store: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onsubmit = async (data: formType) => {
    const toastId = toast.loading('Creating Account...')
    try {
      const response = await axios.post('/api/seller/signup', data)
      if (!response.data?.success) {
        toast.error(response.data?.message, { id: toastId })
        return
      }
      toast.success(response.data?.message, { id: toastId })
      router.push('/auth/seller/signin')
      reset()
    } catch (error) {
      console.log('Something went wrong while SigningUp', error)
      toast.error('SignUp Failed', { id: toastId })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex flex-col items-center space-y-3">
            <div className="w-16 h-16 relative">
              <Image src={Logo} alt="Zivelle Logo" priority fill className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Zivelle
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-semibold text-foreground">Create your seller account</h2>
          <p className="mt-2 text-muted-foreground">Join Zivelle and discover your unique style.</p>
        </div>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  {...register('name')}
                  type="text"
                  autoComplete="given-name"
                  required
                  className="mt-1"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground">
                  Store name
                </Label>
                <Input
                  {...register('store')}
                  type="text"
                  required
                  className="mt-1"
                  placeholder="Store name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground">
                Email address
              </Label>
              <Input
                {...register('email')}
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                required
                className="mt-1"
                placeholder="Create a password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm password
              </Label>
              <Input
                {...register('confirmPassword')}
                type="password"
                autoComplete="new-password"
                required
                className="mt-1"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Create account
            </Button>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/auth/seller/signin"
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup