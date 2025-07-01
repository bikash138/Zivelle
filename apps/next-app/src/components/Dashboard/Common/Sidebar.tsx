import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  PlusCircle,
  Package,
  ShoppingCart,
  User,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  {
    id: 'list-new-item',
    label: 'List New Item',
    icon: PlusCircle
  },
  {
    id: 'listed-items',
    label: 'Listed Items',
    icon: Package
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User
  }
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check screen size and set initial collapsed state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsCollapsed(window.innerWidth < 768); // md breakpoint
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
            <h1 className="text-xl font-bold text-white">Seller Dashboard</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full justify-start text-left transition-colors duration-200',
                  isActive
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800',
                  isCollapsed && 'px-2'
                )}
              >
                <Icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
                {!isCollapsed && item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}