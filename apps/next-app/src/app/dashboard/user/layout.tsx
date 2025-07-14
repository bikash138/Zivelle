import NavBar from "@/components/Dashboard/Common/NavBar"

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