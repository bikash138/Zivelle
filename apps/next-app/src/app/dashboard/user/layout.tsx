import NavBar from "@/components/Dashboard/Common/NavBar"
import { UserSidebar } from "@/components/Dashboard/Common/UserSidebar"

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
      <NavBar />
    </div>
  )
}

export default SellerLayout