import Product from '@/components/Landing/Pages/Product'
import { prisma } from '@repo/database/prisma'
import { notFound } from 'next/navigation'

export default async function ProductRoute({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = Number(resolvedParams.id)
  if (isNaN(id)) return notFound()

  const product = await prisma.item.findUnique({
    where: { id },
    select: {
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
    },
  })

  if (!product) return notFound()

  return <Product product={product} />
}
