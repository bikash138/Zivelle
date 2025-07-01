'use client'
import { useState } from 'react';
import { Sidebar } from '../Common/Sidebar';
import { ListNewItem } from './ListNewItem';
import { ListedItems } from './ListedItems';
import { Orders } from './Orders';
import { Profile } from './Profile';
// import { Toaster } from '@/components/ui/toaster';

export function SellerDashboard() {
  const [activeSection, setActiveSection] = useState('list-new-item');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'list-new-item':
        return <ListNewItem />;
      case 'listed-items':
        return <ListedItems />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile />;
      default:
        return <ListNewItem />;
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderActiveSection()}
        </div>
      </main>
      {/* <Toaster /> */}
    </div>
  );
}