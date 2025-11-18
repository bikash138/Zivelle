'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/reducer'
import Image from 'next/image'
import Logo from '@/assets/Logo.png'
import { HeaderSearchBar } from '@/components/core/HeaderSearchBar'

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token)
  const profile = useSelector((state: RootState) => state.profile.profile)
  const totalItems = useSelector((state: RootState) => state.cart.totalItems)
  const isSeller = profile?.role === 'SELLER'
  const isAuthenticated = !!token
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Brands', path: '/brands' },
    { name: 'Collections', path: '/collections' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="backdrop-filter backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 relative rounded-lg flex items-center justify-center"
            >
              <Image src={Logo} alt="logo" priority fill />
            </motion.div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Zivelle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.path}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-orange-500 px-4 ${
                    pathname === link.path
                      ? 'text-orange-500 bg-clip-text '
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    />
                  )}
                </Link>
                {index < navLinks.length - 1 && (
                  <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right side actions */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3 justify-end">
              <HeaderSearchBar />
              {/* Only show search, cart, and profile for non-sellers */}
              {!isSeller ? (
                <>
                  <Link
                    href="/cart"
                    className={`p-2 transition-colors relative rounded-lg hover:bg-gray-100 ${
                      pathname === '/cart'
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-500'
                    }`}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <ShoppingCart size={20} />
                      <span className="absolute -top-1 -right-1 font-semibold text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                        {totalItems}
                      </span>
                    </motion.div>
                  </Link>

                  <Link href="/user/profile" className="hidden md:block lg:block">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 transition-colors rounded-lg hover:bg-gray-100 text-gray-700 dark:text-gray-300 hover:text-orange-500 cursor-pointer"
                    >
                      <User size={20} />
                    </motion.button>
                  </Link>
                </>
              ) : (
                // For sellers, show a "Dashboard" button
                <Link href="/seller/dashboard">
                  <Button
                    variant="outline"
                    className="border-black cursor-pointer text-black dark:border-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Button>
                </Link>
              )}

              {/* Mobile menu button - keep for all users */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 justify-end">
              <HeaderSearchBar />
              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/auth/seller/signin">
                  <Button
                    variant="outline"
                    className="cursor-pointer border-black text-gray-800 dark:border-white dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    Seller&apos;s Panel
                  </Button>
                </Link>
                <Link
                  href="/auth/user/signin"
                  className="p-2 transition-colors relative rounded-lg"
                >
                  <Button className="cursor-pointer bg-black text-white hover:bg-black/90">
                    Signin
                  </Button>
                </Link>
              </div>
              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-white/10"
          >
            <nav className="flex flex-col space-y-0">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.path}
                    className={`text-sm font-medium transition-colors hover:text-orange-500 py-3 ${
                      pathname === link.path
                        ? 'text-orange-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="border-b border-gray-200 dark:border-white/10" />
                  )}
                </React.Fragment>
              ))}
              <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
                {isAuthenticated ? (
                  isSeller ? (
                    // For sellers in mobile menu
                    <Link
                      href="/seller/dashboard"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    // For regular users in mobile menu
                    <>
                      <Link
                        href="/user/profile"
                        className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/cart"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Cart
                      </Link>
                    </>
                  )
                ) : (
                  // For non-authenticated users in mobile menu
                  <>
                    <Link
                      href="/auth/user/signin"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Signin
                    </Link>
                    <Link
                      href="/auth/seller/signin"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Seller&apos;s Panel
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header
