'use client'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const EmptyCart = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto border border-white/20"
          >
            <ShoppingBag size={40} className="text-gray-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
            <p className="text-gray-400">Looks like you haven&apos;t added anything to your cart yet.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              <Link href="/catalog">
                <p>Continue Shopping</p>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
  )
}

export default EmptyCart