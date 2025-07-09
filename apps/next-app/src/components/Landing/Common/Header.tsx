import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  //@ts-ignore
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Brands', path: '/brands' },
    { name: 'Collections', path: '/collections' },
    { name: 'Sale', path: '/sale' },
  ];

  return (
    // <header className="bg-white shadow-sm sticky top-0 z-50">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex justify-between items-center h-16">
    //       {/* Logo */}
    //       <Link href="/" className="flex items-center space-x-2">
    //         <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
    //           <span className="text-white font-bold text-sm">Z</span>
    //         </div>
    //         <span className="text-xl font-bold text-slate-800">Zivelle</span>
    //       </Link>

    //       {/* Desktop Navigation */}
    //       <nav className="hidden md:flex space-x-8">
    //         {navLinks.map((link) => (
    //           <Link
    //             key={link.name}
    //             href={link.path}
    //             className={`text-sm font-medium transition-colors hover:text-slate-800 ${
    //               pathname === link.path
    //                 ? 'text-slate-800 border-b-2 border-slate-800'
    //                 : 'text-slate-600'
    //             }`}
    //           >
    //             {link.name}
    //           </Link>
    //         ))}
    //       </nav>

    //       {/* Right side actions */}
    //       <div className="flex items-center space-x-4">
    //         <button className="p-2 text-slate-600 hover:text-slate-800 transition-colors">
    //           <Search size={20} />
    //         </button>
    //         <Link 
    //           href="/favourites" 
    //           className={`p-2 transition-colors relative ${
    //             pathname === '/favourites' 
    //               ? 'text-red-500' 
    //               : 'text-slate-600 hover:text-slate-800'
    //           }`}
    //         >
    //           <Heart size={20} />
    //           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
    //             2
    //           </span>
    //         </Link>
    //         <Link 
    //           href="/cart" 
    //           className={`p-2 transition-colors relative ${
    //             pathname === '/cart' 
    //               ? 'text-slate-800' 
    //               : 'text-slate-600 hover:text-slate-800'
    //           }`}
    //         >
    //           <ShoppingCart size={20} />
    //           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
    //             3
    //           </span>
    //         </Link>
    //         <button className="p-2 text-slate-600 hover:text-slate-800 transition-colors">
    //           <User size={20} />
    //         </button>

    //         {/* Mobile menu button */}
    //         <button
    //           className="md:hidden p-2 text-slate-600 hover:text-slate-800 transition-colors"
    //           onClick={() => setIsMenuOpen(!isMenuOpen)}
    //         >
    //           {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
    //         </button>
    //       </div>
    //     </div>

    //     {/* Mobile Navigation */}
    //     {isMenuOpen && (
    //       <div className="md:hidden py-4 border-t">
    //         <nav className="flex flex-col space-y-4">
    //           {navLinks.map((link) => (
    //             <Link
    //               key={link.name}
    //               href={link.path}
    //               className={`text-sm font-medium transition-colors hover:text-slate-800 ${
    //                 pathname === link.path
    //                   ? 'text-slate-800'
    //                   : 'text-slate-600'
    //               }`}
    //               onClick={() => setIsMenuOpen(false)}
    //             >
    //               {link.name}
    //             </Link>
    //           ))}
    //           <div className="flex space-x-4 pt-4 border-t">
    //             <Link 
    //               href="/favourites" 
    //               className="text-slate-600 hover:text-slate-800 transition-colors"
    //               onClick={() => setIsMenuOpen(false)}
    //             >
    //               Favourites
    //             </Link>
    //             <Link 
    //               href="/cart" 
    //               className="text-slate-600 hover:text-slate-800 transition-colors"
    //               onClick={() => setIsMenuOpen(false)}
    //             >
    //               Cart
    //             </Link>
    //           </div>
    //         </nav>
    //       </div>
    //     )}
    //   </div>
    // </header>

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
                className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 relative ${
                  location.pathname === link.path
                    ? 'text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
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
            <Link 
              href="/favourites" 
              className={`p-2 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 ${
                location.pathname === '/favourites' 
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
            </Link>
            <Link 
              href="/cart" 
              className={`p-2 transition-colors relative rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 ${
                location.pathname === '/cart' 
                  ? 'text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-400'
              }`}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  3
                </span>
              </motion.div>
            </Link>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <User size={20} />
            </motion.button>

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
                    location.pathname === link.path
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
                  href="/favourites" 
                  className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favourites
                </Link>
                <Link 
                  href="/cart" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
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