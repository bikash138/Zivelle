'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import  {useRouter}  from 'next/navigation';
import { RootState } from '@/redux/reducer';

const Header = () => {
  const token = useSelector((state: RootState)=> state.auth.token)
  const isAuthenticated = !!token
  const totalItems = useSelector((state: RootState)=>state.cart.totalItems)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  const router = useRouter()
  // eslint-disable-next-line
  //@ts-expect-error
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Brands', path: '/brands' },
    { name: 'Collections', path: '/collections' },
    { name: 'Sale', path: '/sale' },
  ];

  useEffect(() => {
    router.prefetch('/catalog');
  }, [router]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="backdrop-filter backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-sm">Z</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Zivelle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    prefetch={link.name === "Catalog"}
                    className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 relative ${
                      pathname === link.path
                        ? 'text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    )}
                  </Link>
            ))}
          </nav>

          {/* Right side actions */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <Search size={20} />
              </motion.button>
              {/* <Link 
                href="/favourites" 
                className={`p-2 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 ${
                  pathname === '/favourites' 
                    ? 'text-red-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-red-400'
                }`}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Heart size={20} />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    2
                  </span>
                </motion.div>
              </Link> */}
              <Link 
                href="/cart" 
                className={`p-2 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 ${
                  pathname === '/cart' 
                    ? 'text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-400'
                }`}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                </motion.div>
              </Link>
            <Link href='/dashboard/user/profile'>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <User size={20} />
              </motion.button>
            </Link>
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
            </div>
          ):(
            <div className="flex items-center">
              <div className='hidden lg:block'>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>
                <Link 
                  href="/user/signin" 
                  className={`p-2 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 ${
                    pathname === '/favourites' 
                      ? 'text-red-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-400'
                  }`}
                >
                  <Button variant='ghost' className='cursor-pointer'>
                    Signin
                  </Button>
                </Link>
                <Link 
                  href="/user/signup" 
                  className={`p-2 transition-colors relative rounded-lg dark:hover:bg-white/10`}
                >
                  <Button className='cursor-pointer'>
                    Create Account
                  </Button>
                </Link>
              </div>
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
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
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    pathname === link.path
                      ? 'text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-white/10">
                <Link 
                  href={isAuthenticated ? "/favourites" : "/user/signup"}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isAuthenticated ? "Favourites" : "Create Account"}
                </Link>
                <Link 
                  href={isAuthenticated ? "/cart" : "/user/signin"}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isAuthenticated ? "Favourites" : "Signin"}
                </Link>
                <button 
                  onClick={toggleTheme}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;