import React from 'react';
import Footer from '@/components/Landing/Common/Footer';
import Header from '@/components/Landing/Common/Header';
import { prisma } from '@repo/database/prisma';
import LandingPage from '@/components/Dashboard/Common/LandingPage';

export default async function page() {
  // Fetch some catalog products (e.g., 8 featured)
  const products = await prisma.item.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' }, // or any other logic
    select: {
      id: true,
      title: true,
      thumbnail: true,
      price: true,
      originalPrice: true
    },
  });

  return (
    <>
      <Header />
      <LandingPage products={products}/>
      <Footer/>
    </>
  );
}


