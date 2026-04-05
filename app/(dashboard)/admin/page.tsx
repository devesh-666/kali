export const dynamic = 'force-dynamic'
import { toolsData, categories } from '@/data/tools'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold text-green-400">Admin Panel</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-green-500/20 bg-green-500/5 rounded-lg p-5">
          <p className="text-3xl font-mono font-bold text-green-400">{toolsData.length}</p>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">Total Tools</p>
        </div>
        <div className="border border-cyan-500/20 bg-cyan-500/5 rounded-lg p-5">
          <p className="text-3xl font-mono font-bold text-cyan-400">{categories.length}</p>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">Categories</p>
        </div>
      </div>
    </div>
  )
}
