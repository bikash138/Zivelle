import Catalog from "@/components/Dashboard/Landing/Catalog";
import { prisma } from "@repo/database/prisma";

export default async function CatalogRoute() {
   const items = await prisma.item.findMany({
    select:{
      id: true,
      thumnail: true,
      title: true,
      description: true,
      price: true,
      category: true,
      subCategory: true
    }
   })

   return <Catalog items={items}/>
}