export const dynamic = 'force-dynamic'

import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { toolsData, categories } from '@/data/tools'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarCats = categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    color: c.color,
    toolCount: toolsData.filter((t) => t.category === c.name).length,
  }))

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Navbar />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar categories={sidebarCats} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
