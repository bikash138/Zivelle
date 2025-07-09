// eslint-disable
import { ListedItems } from '@/components/Dashboard/Seller/ListedItems';
import { prisma } from '@repo/database/prisma';
import getUserIdToken from "@/lib/getUserIdToken"
import { cookies } from 'next/headers';

export default async function OrdersRoute() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;
    const {userId, error} = await getUserIdToken(token)
    if(error){
      return error
    }
    console.log(userId)
    const allListedItems = await prisma.item.findMany({
      where:{
          adminId: userId
      },
    })
    //@ts-ignore
  return <ListedItems initialListedItems={allListedItems} />;
}