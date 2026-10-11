import { Swords } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BattleNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-11 flex items-center px-4 sm:px-6 dark:bg-surface bg-gray-50 backdrop-blur-md border-b border-zinc-400/20 shadow-panel battle-page-transition">
      <Link to="/battle" className="flex items-center gap-2 group">
        <div className="w-6 h-6 bg-zinc-400/10 border border-zinc-400/30 flex items-center justify-center group-hover:bg-zinc-400/20 group-hover:border-zinc-400/50 transition-colors duration-200">
          <Swords size={14} className="text-zinc-400 group-hover:text-zinc-300 transition-colors" />
        </div>
        <span className="text-xs font-bold text-zinc-200 group-hover:text-white tracking-wide transition-colors duration-200">
          Battle Mode
        </span>
      </Link>
    </nav>
  )
}
