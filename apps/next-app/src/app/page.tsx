import React from 'react';
import Footer from '@/components/Landing/Common/Footer';
import Header from '@/components/Landing/Common/Header';
import { prisma } from '@repo/database/prisma'; // Adjust path as needed
import ProductCard from '@/components/Landing/Common/ProductCard'; // Adjust path as needed
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
  console.log(products)

  return (
    <>
      <Header />
      <LandingPage products={products}/>
      <Footer/>
    </>
  );
}


