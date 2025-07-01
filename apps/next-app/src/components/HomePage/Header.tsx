'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Navigation - Rounded Container */}
        <nav className="hidden md:flex items-center justify-center bg-black/80 backdrop-blur-md rounded-full border border-gray-700/50 px-8 py-3">
          {/* Logo */}
          <Link href="/" className="mr-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Zivelle
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#catalog" className="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
              Catalog
            </a>
            <a href="#about" className="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-6 ml-8">
            <Link href="/signin" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200">
              <User size={18} />
              <span>Sign In</span>
            </Link>
            <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation - Rounded Container */}
        <div className="md:hidden">
          <div className="bg-black/20 backdrop-blur-md rounded-full border border-gray-700/50 px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Zivelle
                </h1>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="mt-2 bg-black/20 backdrop-blur-md rounded-2xl border border-gray-700/50 p-4">
              <div className="space-y-3">
                <a href="#home" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-white/10">
                  Home
                </a>
                <a href="#catalog" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-white/10">
                  Catalog
                </a>
                <a href="#about" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-white/10">
                  About
                </a>
                <a href="#contact" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-white/10">
                  Contact
                </a>
                <div className="border-t border-gray-700/50 pt-3 mt-3">
                  <Link href="/signin" className="flex items-center space-x-2 px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-white/10">
                    <User size={18} />
                    <span>Sign In</span>
                  </Link>
                  <button className="flex items-center space-x-2 px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-white/10 w-full">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;