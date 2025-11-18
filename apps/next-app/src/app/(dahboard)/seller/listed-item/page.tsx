import { ListedItems } from '@/components/Dashboard/Seller/ListedItems'
import { prisma } from '@repo/database/prisma'
import getUserIdToken from '@/lib/getUserIdToken'
import { cookies } from 'next/headers'

interface Product {
  title: string
  thumbnail: string
  description: string
  price: number
  category: 'Men' | 'Women' | 'Kids'
  stock: number
  status: string
  isAvailable: boolean
  createdAt: Date
}

export default async function OrdersRoute() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const { userId, error } = await getUserIdToken(token)
  if (error) {
    return error
  }
  const allListedItems: Product[] = await prisma.item.findMany({
    where: {
      adminId: userId,
    },
  })
  const listedItemsWithStringDates = allListedItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }))
  return <ListedItems initialListedItems={listedItemsWithStringDates} />
}
