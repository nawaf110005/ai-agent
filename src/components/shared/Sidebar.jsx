import React from 'react'
import { Plus, Trash2, X } from 'lucide-react'

export default function Sidebar({
  sessions,
  activeId,
  setActiveId,
  onDelete,
  onLogout,
  mobileOpen,
  setMobileOpen,
  tab,
  setTab,
  startNew,
}) {
  return (
    // On mobile: slide-in from left when mobileOpen, otherwise hidden.
    // On md+ always flex.
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 transform
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex
        transition-transform duration-200 ease-in-out
        w-64 bg-[#343541] text-white flex flex-col
      `}
    >
      {/* mobile close button */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 md:hidden">
        <span className="font-bold text-lg">Nawaf AI</span>
        <button onClick={() => setMobileOpen(false)}>
          <X className="w-5 h-5 text-gray-300 hover:text-white" />
        </button>
      </div>

      {/* header for md+ */}
      <div className="hidden md:flex px-4 py-4 items-center justify-between border-b border-gray-700">
        <span className="font-bold text-lg">Nawaf AI</span>
        <button
          onClick={startNew}
          className="text-gray-400 hover:text-white"
          title="New chat"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat button for mobile */}
      <button
        onClick={startNew}
        className="md:hidden flex items-center m-4 px-3 py-2 bg-[#444654] hover:bg-[#5e5e72] rounded text-sm font-medium"
      >
        <Plus className="w-4 h-4 mr-2" /> New chat
      </button>

      {/* Chat list */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2 no-scrollbar">
        {sessions.map(s => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => {
                setActiveId(s.id)
                setTab('chat')
                setMobileOpen(false)
              }}
              className={`flex-1 text-left px-3 py-2 rounded hover:bg-[#5e5e72] ${
                s.id === activeId ? 'bg-[#565867]' : ''
              }`}
            >
              <span className="truncate">{s.name}</span>
            </button>
            <Trash2
              onClick={() => onDelete(s.id)}
              className="w-4 h-4 text-gray-400 hover:text-red-500 ml-1"
            />
          </div>
        ))}
      </nav>

      {/* Tabs and Logout */}
      <div className="border-t border-gray-700 px-2 py-2 space-y-1">
        {['chat', 'transcribe', 'profile'].map(t => (
          <button
            key={t}
            onClick={() => {
              setTab(t)
              setMobileOpen(false)
            }}
            className={`w-full text-left px-3 py-2 rounded hover:bg-[#5e5e72] ${
              tab === t ? 'bg-[#565867]' : ''
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}

        <button
          onClick={onLogout}
          className="w-full mt-2 px-3 py-2 text-left text-red-400 hover:text-red-600 hover:bg-[#3b3c4e] rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
