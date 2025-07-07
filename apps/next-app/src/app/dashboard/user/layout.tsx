import { UserSidebar } from "@/components/Dashboard/Common/UserSidebar"

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-slate-950 flex">
      <UserSidebar/>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default SellerLayout