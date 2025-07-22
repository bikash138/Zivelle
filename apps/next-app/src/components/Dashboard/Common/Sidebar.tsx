'use client'
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Package,
  User,
  PlusCircleIcon,
  ListOrderedIcon,
  LayoutDashboard, 
  LogOut,
  ShoppingCart,
  BadgeQuestionMark,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmationModal from './Modal';
import { useDispatch } from 'react-redux';
import { logout, setToken } from '@/redux/slices/authSlice';

interface SidebarProps {
  userType: 'seller' | 'user';
}

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const activeSection = pathname.split('/').pop()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch()

  const sellerNavigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/seller/dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'list-new-item',
      label: 'List New Item',
      href: '/seller/list-new-item',
      icon: PlusCircleIcon
    },
    {
      id: 'listed-item',
      label: 'Listed Items',
      href: '/seller/listed-item',
      icon: ListOrderedIcon
    },
    {
      id: 'orders',
      label: 'Orders',
      href: '/seller/orders',
      icon: Package
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/seller/profile',
      icon: User
    }
  ];

  const userNavigationItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home
    },
    {
      id: 'orders',
      label: 'Orders',
      href: '/user/orders',
      icon: ShoppingCart
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/user/profile',
      icon: User
    },
    {
      id: 'help',
      label: 'Help',
      href: '/user/help',
      icon: BadgeQuestionMark
    },
  ];

  const navigationItems = userType === 'seller' ? sellerNavigationItems : userNavigationItems;


  const handleLogout = async () => {
    setIsLoggingOut(true)
    await fetch("/api/logout", { method: "POST" });
    dispatch(setToken(null))
    dispatch(logout())
    setIsLoggingOut(false)
    router.push('/')
  }
  
  return (
    <>
      <TooltipProvider>
        <motion.nav
          initial={{ x: -64 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 z-10 flex flex-col"
        >
          <div className="flex flex-col items-center py-6 space-y-4 flex-grow">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return(
                <Tooltip key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link key={item.id} href={item.href}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-orange-100 text-orange-600 shadow-md'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="bg-gray-900 text-white border-gray-700"
                    sideOffset={8}
                    avoidCollisions={false}
                  >
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            )}
          </div>
          {/* Logout button at the bottom */}
          <div className="mt-auto mb-6">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutModal(true)}
                  className="p-3 rounded-lg transition-all duration-200 text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-gray-900 text-white border-gray-700"
                sideOffset={8}
                avoidCollisions={false}
              >
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.nav>
      </TooltipProvider>
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isLoggingOut}
      />
    </>
  );
}