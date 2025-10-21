'use client'
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Footer from './Footer';
import Link from 'next/link';
import Image from 'next/image';

const brands = [
  { name: 'Gucci', products: 245, image: 'https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800', featured: true },
  { name: 'Chanel', products: 189, image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=800', featured: true },
  { name: 'Versace', products: 167, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
  { name: 'Prada', products: 234, image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=800', featured: true },
  { name: 'Louis Vuitton', products: 312, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800', featured: true },
  { name: 'Dior', products: 198, image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
  { name: 'Balenciaga', products: 156, image: 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
  { name: 'Burberry', products: 143, image: 'https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
  { name: 'Hermès', products: 178, image: 'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800', featured: true },
  { name: 'Valentino', products: 134, image: 'https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
  { name: 'Givenchy', products: 167, image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
  { name: 'Saint Laurent', products: 201, image: 'https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg?auto=compress&cs=tinysrgb&w=800', featured: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Brands() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-12 md:py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Brands Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-slate-900">Explore Our</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400">
              Luxury Brands
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover world-renowned fashion brands curated exclusively for you. Each brand represents excellence, style, and timeless elegance.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search brands..."
              className="pl-12 h-12 text-lg border-slate-200 focus:border-orange-400 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="default" className="bg-slate-900 hover:bg-slate-800 rounded-full">
            All Brands
          </Button>
          <Button variant="outline" className="rounded-full">Featured</Button>
          <Button variant="outline" className="rounded-full">New Arrivals</Button>
          <Button variant="outline" className="rounded-full">Popular</Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={{ pathname: '/catalog', query: { brand: brand.name } }}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {brand.featured && (
                      <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                        View Collection
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{brand.name}</h3>
                    <p className="text-slate-600">{brand.products} Products Available</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Load More Brands
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can&apos;t Find Your Favorite Brand?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re constantly expanding our collection. Let us know which brands you&apos;d like to see on Zivelle.
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8">
            Suggest a Brand
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>
      <Footer/>
    </div>
  );
}
