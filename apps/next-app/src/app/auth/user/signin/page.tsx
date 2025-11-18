'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { SignInSchema } from '@repo/zod/zodTypes'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setProfile } from '@/redux/slices/profileSlice'
import { setToken } from '@/redux/slices/authSlice'
import Logo from '@/assets/Logo.png'

type formType = z.infer<typeof SignInSchema>

const Signin = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm<formType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onsubmit = async (data: formType) => {
    const toastId = toast.loading('Signing in...')
    try {
      const response = await axios.post('/api/user/signin', data)
      if (!response.data?.success) {
        toast.error(response.data?.message, { id: toastId })
        return
      }
      localStorage.setItem('token', response.data?.token)
      localStorage.setItem('profile', JSON.stringify(response.data?.user))
      dispatch(setToken(response.data?.token))
      dispatch(setProfile({ ...response.data?.user }))
      toast.success(response.data?.message, { id: toastId })
      reset()
      router.push('/')
    } catch (error) {
      console.log('Something went wrong while SignIn', error)
      toast.error('SignIn Failed', { id: toastId })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
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
          <h2 className="mt-6 text-2xl font-semibold text-foreground">Sign in to your account</h2>
          <p className="mt-2 text-muted-foreground">Welcome back! Please enter your details.</p>
        </div>

        {/* Sign In Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
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
                autoComplete="current-password"
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Sign in
            </Button>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/user/signup"
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
