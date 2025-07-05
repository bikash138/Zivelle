import {Orders} from '@/components/Dashboard/Seller/Orders';
import getUserIdToken from '@/lib/getUserIdToken';
import { prisma } from '@repo/database/prisma';
import { cookies } from 'next/headers';

export default async function OrdersRoute() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;
    const {userId, error} = await getUserIdToken(token)
    if(error){
        return error
    }
    const allOrders = await prisma.order.findMany({
        where: {
            sellerId: userId
        },
        select:{
            id: true,
            quantity: true,
            total: true,
            status: true,
            placedOn: true,
            item:{
                select:{
                    title: true
                }
            }
        }
    })
  return <Orders initialOrders={allOrders} />;
}