'use client'
import React from 'react';
import {motion} from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/assets/Logo.png'

const Footer = () => {

  const socialMediaLinks = [
   {
    id: 1,
    title: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/bikash-shaw-5ab74727b/"
   },
   {
    id: 2,
    title: "Twitter",
    icon: Twitter,
    url: "https://x.com/Bikash__Shaw"
   },
   {
    id: 3,
    title: "Github",
    icon: Github,
    url: "https://github.com/bikash138"
   }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 ">
              <div className='relative w-10 h-10'>
                <Image src={Logo} alt='Logo' fill/>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Zivelle
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover the latest trends in fashion with our curated collection of premium clothing for every occasion.
            </p>
            <div className="flex space-x-4">
              {socialMediaLinks.map((link) => (
                <motion.a 
                  target='_blank'
                  key={link.id}
                  href={link.url} 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  {<link.icon size={20}/>}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Size Guide', 'Shipping Info', 'Returns'].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {['Help Center', 'Track Order', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive deals and latest fashion trends.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-colors duration-300"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>window.location.href = `mailto:bshaw1352@gmail.com?subject=Hello from Zivelle`}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all rounded-r-lg shadow-lg"
              >
                <Mail size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Zivelle. All rights reserved. | Made with ❤️ for fashion lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;