import { DeliveryAddressType } from '@/app/(landing)/cart/page'
import { Orders } from '@/components/Dashboard/Seller/Orders'
import getUserIdToken from '@/lib/getUserIdToken'
import { prisma } from '@repo/database/prisma'
import { cookies } from 'next/headers'

export default async function OrdersRoute() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const { userId, error } = await getUserIdToken(token)
  if (error) {
    return error
  }
  const allOrdersRaw = await prisma.orderItem.findMany({
    where: {
      sellerId: userId,
    },
    select: {
      id: true,
      orderId: true,
      itemId: true,
      quantity: true,
      size: true,
      price: true,
      itemStatus: true,
      item: {
        select: {
          title: true,
          thumbnail: true,
        },
      },
      order: {
        select: {
          placedOn: true,
          paymentStatus: true,
          deliveryAddress: true,
          customer: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  })
  const allOrders = allOrdersRaw.map((o) => ({
    ...o,
    order: {
      ...o.order,
      deliveryAddress: (o.order.deliveryAddress as DeliveryAddressType) || {
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
      },
    },
  }))
  return <Orders initialOrders={allOrders} />
}
