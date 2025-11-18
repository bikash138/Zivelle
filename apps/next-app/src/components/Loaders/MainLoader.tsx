'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Logo from '@/assets/Logo.png'

const MainLoader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative">
        {/* Animated glow rings */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.1, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-80 h-80 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-3xl opacity-50" />
        </motion.div>

        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-72 h-72 bg-gradient-to-l from-orange-500 to-orange-400 rounded-full blur-2xl opacity-40" />
        </motion.div>

        {/* Main logo container with floating and rotation */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-32 h-32"
          >
            <Image
              src={Logo}
              alt="Zivelle Logo"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
            {/* Pulsing glow effect around logo */}
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-full h-full bg-orange-400 rounded-full blur-xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-orange-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Text animation */}
        <motion.div
          className="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.h2
            className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Zivelle
          </motion.h2>
        </motion.div>
      </div>
    </div>
  )
}

export default MainLoader
