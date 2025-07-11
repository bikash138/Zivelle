'use client'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { setToken } from '@/redux/slices/authSlice';
import {
  BadgeQuestionMark,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOutIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const navigationItems = [
  {
    id: 'orders',
    label: 'Orders',
    href: '/dashboard/user/orders',
    icon: ShoppingCart
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/dashboard/user/profile',
    icon: User
  },
  {
    id: 'help',
    label: 'Help',
    href: '/dashboard/user/help',
    icon: BadgeQuestionMark
  },
];

export function UserSidebar() {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const activeSection = pathname.split('/').pop()
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check screen size and set initial collapsed state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    // Set initial state
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      className={cn(
        'bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex-shrink-0',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">User Dashboard</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Link key={item.id} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start text-left transition-colors duration-200 cursor-pointer',
                    isActive
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800',
                    isCollapsed && 'px-2 justify-center items-center'
                  )}
                >
                  <Icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
                  {!isCollapsed && item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        
        <Button
          className=" mt-5 rounded-lg cursor-pointer bg-transparent hover:text-500 text-red-700 transition-all duration-150"
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
            dispatch(setToken(null))
            localStorage.removeItem('userProfile')
            localStorage.removeItem('token')
            router.push('/')
          }}
        >
          <LogOutIcon/>
          {!isCollapsed && "Logout"}
        </Button>

      </div>
    </div>
  );
}