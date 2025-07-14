'use client'
import React, { useState } from 'react';
import { Package, User, HelpCircle, LogOut, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ConfirmationModal from './Modal';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/slices/authSlice';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <House size={20} />, 
      href: '/',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <Package size={20} />, 
      href: '/dashboard/user/orders',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={20} />, 
      href: '/dashboard/user/profile',
    },
    {
      id: 'help',
      label: 'Help',
      icon: <HelpCircle size={20} />, 
      href: '/dashboard/user/help',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <LogOut size={20} />,
      href: '#'
    }
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await fetch("/api/logout", { method: "POST" });
    dispatch(setToken(null))
    localStorage.removeItem('userProfile')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    localStorage.removeItem('totalItems')
    localStorage.removeItem('total')
    setIsLoggingOut(false)
    router.push('/')
  }

  return (
    <>
    <nav className="fixed bottom-0 left-0 w-full bg-gray-900 shadow-lg border-t border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.id === 'logout') {
              return (
                <button
                  key={item.id}
                  onClick={()=>setShowLogoutModal(true)}
                  className="flex flex-col items-center justify-center px-4 py-2 rounded-lg text-gray-600 hover:text-red-500 transition-all duration-200 ease-in-out"
                  type="button"
                >
                  <div className="mb-1">{item.icon}</div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            }
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                  ${isActive ? ' text-orange-500 shadow-lg' : 'text-gray-600 hover:text-gray-500 '}`}
              >
                <div className="mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
    <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={()=>setShowLogoutModal(false)}
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
};

export default NavBar;