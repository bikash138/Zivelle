import { Sidebar } from "@/components/Dashboard/Common/Sidebar"

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-slate-950 flex">
      <Sidebar/>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default SellerLayout