// src/components/shared/Sidebar.jsx

import React from 'react'
import { Trash2, Plus, Menu } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export default function Sidebar({
  sessions,
  activeId,
  setActiveId,
  onDelete,
  onLogout,
  visible,
  tab,
  setTab,
  startNew,
  onToggleMobile,
}) {
  if (!visible) return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={onToggleMobile}
        className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
      >
        <Menu />
      </button>
    </div>
  )

  return (
    <aside className="w-64 bg-[#343541] text-white flex flex-col">
      <div className="px-4 py-4 flex items-center justify-between border-b border-gray-700">
        <h1 className="text-xl font-bold">Nawaf AI</h1>
        <button onClick={onToggleMobile} className="md:hidden">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={startNew}
        className="m-4 flex items-center px-3 py-2 bg-[#444654] hover:bg-[#5e5e72] rounded text-sm font-medium transition"
      >
        <Plus className="w-4 h-4 mr-2" /> New chat
      </button>

      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {sessions.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`w-full flex items-center justify-between px-3 py-2 text-left rounded ${
              s.id === activeId
                ? 'bg-[#565867]'
                : 'hover:bg-[#3b3c4e]'
            }`}
          >
            <span className="truncate">{s.name}</span>
            <Trash2
              onClick={e => { e.stopPropagation(); onDelete(s.id) }}
              className="w-4 h-4 text-gray-400 hover:text-red-500"
            />
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-700 p-4 space-y-1">
        {['chat', 'transcribe', 'profile'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`w-full text-left px-3 py-2 rounded text-sm ${
              tab === t
                ? 'bg-[#565867]'
                : 'hover:bg-[#3b3c4e]'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          onClick={onLogout}
          className="w-full mt-2 px-3 py-2 text-left text-red-400 hover:text-red-600 hover:bg-[#3b3c4e] rounded text-sm"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
