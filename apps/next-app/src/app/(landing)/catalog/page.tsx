import Catalog from "@/components/Dashboard/Landing/Catalog";
import { prisma } from "@repo/database/prisma";
export const revalidate = 60;

export default async function CatalogRoute() {
   const items = await prisma.item.findMany({
    select:{
      id: true,
      thumbnail: true,
      title: true,
      description: true,
      size: true,
      price: true,
      originalPrice: true,
      category: true,
      subCategory: true,
      createdAt: true
    }
   })

   return <Catalog items={items}/>
}