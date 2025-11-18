import React from 'react'
import Footer from '@/components/Landing/Common/Footer'
import Header from '@/components/Landing/Common/Header'
import { prisma } from '@repo/database/prisma'
import LandingPage from '@/components/Dashboard/Common/LandingPage'
export const revalidate = 60

export default async function page() {
  // Fetch some catalog products
  const products = await prisma.item.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      price: true,
      originalPrice: true,
    },
  })

  return (
    <>
      <Header />
      <LandingPage products={products} />
      <Footer />
    </>
  )
}
