import Product from '@/components/Dashboard/Landing/Product';
import { prisma } from '@repo/database/prisma'; 
import { notFound } from 'next/navigation';

export default async function ProductRoute({ params }: { params: { id: string } }) {
  const product = await prisma.item.findUnique({
    where: { 
        id: Number(params.id) 
    },
    select:{
        id: true,
        adminId: true,
        thumbnail: true,
        title: true,
        description: true,
        originalPrice: true,
        price: true,
        category: true,
        size: true,
        subCategory: true,
    }
  });

  if (!product) return notFound();

  return (
    <Product product={product}/>
  );
}