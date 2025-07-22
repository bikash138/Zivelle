'use client'
import Bottombar from "@/components/Dashboard/Common/Bottombar"
import { Sidebar } from "@/components/Dashboard/Common/Sidebar"

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - visible on larger screens only */}
        <div className="hidden md:block">
          <Sidebar userType="user"/>
        </div>
        
        <main className="flex-1 overflow-auto sm:mx-6 md:ml-16 pb-20 md:pb-6">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Navbar - visible on mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <Bottombar userType="user" />
      </div>
    </div>
  )
}

export default SellerLayout