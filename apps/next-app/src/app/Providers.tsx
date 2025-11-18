'use client'
import { Provider, useDispatch } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { store } from '@/redux/reducer'
import { Suspense, useEffect } from 'react'
import { hydrateCart } from '@/redux/slices/cartSlice'
import { hydrateToken } from '@/redux/slices/authSlice'
import { hydrateProfile } from '@/redux/slices/profileSlice'
const queryClient = new QueryClient()

function ReduxStateHydrater({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const profile = localStorage.getItem('profile')
    const cart = localStorage.getItem('cart')
    const total = localStorage.getItem('total')
    const totalItems = localStorage.getItem('totalItems')
    dispatch(
      hydrateCart({
        cart: cart ? JSON.parse(cart) : [],
        total: total ? JSON.parse(total) : 0,
        totalItems: totalItems ? JSON.parse(totalItems) : 0,
      })
    )
    dispatch(
      hydrateToken({
        token: token || null,
      })
    )
    dispatch(
      hydrateProfile({
        profile: profile ? JSON.parse(profile) : null,
      })
    )
  }, [dispatch])

  return <>{children}</>
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReduxStateHydrater>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ReduxStateHydrater>
      </Provider>
    </QueryClientProvider>
  )
}
