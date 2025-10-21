'use client'
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Footer from './Footer';
import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    id: 1,
    name: "Women's Collection",
    category: "Women",
    description: "Elegant and sophisticated pieces for the modern woman",
    items: 450,
    image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tag: 'Trending',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    name: "Men's Collection",
    category: "Men",
    description: "Classic styles with contemporary flair for men",
    items: 380,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tag: 'Popular',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 3,
    name: "Kids Collection",
    category: "Kids",
    description: "Playful and comfortable fashion for little ones",
    items: 290,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tag: 'New',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 4,
    name: 'Winter Wear',
    category: "Winter_Wear",
    description: "Stay warm and stylish during the cold season",
    items: 220,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tag: 'Seasonal',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 5,
    name: 'Street Wear',
    category: "Street_Wear",
    description: "Urban style meets contemporary fashion",
    items: 340,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tag: 'Hot',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 6,
    name: 'Athletic Wear',
    category: "Athletic_Wear",
    description: "Performance meets style for active lifestyles",
    items: 310,
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tag: 'Active',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 7,
    name: 'Formal Wear',
    category: "Formal_Wear",
    description: "Sophisticated elegance for special occasions",
    items: 195,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tag: 'Elegant',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 8,
    name: 'Accessories',
    category: "Accessories",
    description: "Complete your look with premium accessories",
    items: 420,
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tag: 'Essentials',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 9,
    name: 'Summer Collection',
    category: "Summer_Collections",
    description: "Light and breezy styles for warm weather",
    items: 265,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tag: 'Seasonal',
    color: 'from-yellow-400 to-orange-400'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
    },
  },
};

export function Collections() {
  const featuredCollections = collections.filter(c => c.featured);
  const regularCollections = collections.filter(c => !c.featured);

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
            <span className="text-sm font-medium">Curated Collections 2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-slate-900">Discover Your</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-rose-400">
              Perfect Style
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our carefully curated collections designed to express your unique personality and elevate your wardrobe.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {featuredCollections.slice(0, 2).map((collection) => (
              <motion.div
                key={collection.id}
                variants={featuredVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={{ pathname: '/catalog', query: { category: collection.category } }}>
                  <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white h-full">
                    <div className="relative h-80 md:h-96 overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <Badge className={`absolute top-6 right-6 bg-gradient-to-r ${collection.color} text-white border-0 text-sm px-4 py-1`}>
                        {collection.tag}
                      </Badge>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{collection.name}</h3>
                        <p className="text-white/90 text-lg mb-4">{collection.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80">{collection.items} Items</span>
                          <Button className="bg-white text-slate-900 hover:bg-slate-100 group-hover:gap-3 transition-all">
                            Explore Now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">All Collections</h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {regularCollections.map((collection) => (
              <motion.div
                key={collection.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={{ pathname: '/catalog', query: { category: collection.category } }}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white h-full">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                      <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${collection.color} text-white border-0`}>
                        {collection.tag}
                      </Badge>
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Shop Collection
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{collection.name}</h3>
                      <p className="text-slate-600 mb-3">{collection.description}</p>
                      <p className="text-sm text-slate-500">{collection.items} Items Available</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Join Our Style Community
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Get exclusive access to new collections, special offers, and personalized style recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 text-lg">
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-slate-600">Premium Brands</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-pink-500 mb-2">2.5K+</div>
            <div className="text-slate-600">Products</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-blue-500 mb-2">50K+</div>
            <div className="text-slate-600">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-emerald-500 mb-2">4.9/5</div>
            <div className="text-slate-600">Rating</div>
          </div>
        </motion.div>
      </motion.div>
      <Footer/>
    </div>
  );
}
