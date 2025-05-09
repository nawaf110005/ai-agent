import React, { useContext, useEffect, useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { ThemeContext } from '../../context/ThemeContext'
import LightLogo from '../../assets/Logo.png'
import DarkLogo from '../../assets/DarkLogo.png'

export default function Sidebar({
  sessions,
  activeId,
  setActiveId,
  onDelete,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
  tab,
  setTab,
  startNew,
}) {
  const { darkMode } = useContext(ThemeContext)
  const logoSrc = darkMode ? DarkLogo : LightLogo
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          // z-40 sits below the sidebar (z-50), covers full screen
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col h-full
          bg-white dark:bg-[#343541] text-gray-900 dark:text-white
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <img src={logoSrc} alt="Logo" className="h-8" />
          <button
            onClick={() => isMobile && setSidebarOpen(false)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 md:hidden"
            title="Close menu"
          >
            <X className="w-5 h-5 text-gray-900 dark:text-gray-300" />
          </button>
        </div>

        {/* New Chat */}
{/* use the same wrapper classes as your bottom-bar */}
<div className="px-2 py-2">
  <button
    onClick={() => {
      startNew()
      if (isMobile) setSidebarOpen(false)
    }}
    className="
      w-full flex items-center justify-center
      px-3 py-2
      bg-indigo-600 hover:bg-indigo-700
      text-white text-sm
      rounded-md
      transition-colors duration-200
    "
  >
    <Plus className="w-4 h-4 mr-1.5" />
    New chat
  </button>
</div>


        {/* Session list */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2 no-scrollbar">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => {
                  setActiveId(s.id)
                  setTab('chat')
                  if (isMobile) setSidebarOpen(false)
                }}
                className={`
                  flex-1 text-left px-3 py-2 rounded
                  hover:bg-gray-100 dark:hover:bg-[#5e5e72]
                  ${s.id === activeId ? 'bg-gray-200 dark:bg-[#565867]' : ''}
                `}
              >
                <span className="truncate">{s.name}</span>
              </button>
              <Trash2
                onClick={() => onDelete(s.id)}
                className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-red-500 ml-1"
              />
            </div>
          ))}
        </nav>

        {/* Bottom buttons */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 px-2 py-2 space-y-1">
          {['chat', 'transcribe', 'profile'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                if (isMobile) setSidebarOpen(false)
              }}
              className={`
                w-full text-left px-3 py-2 rounded
                hover:bg-gray-100 dark:hover:bg-[#5e5e72]
                ${tab === t ? 'bg-gray-200 dark:bg-[#565867]' : ''}
              `}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 hover:bg-gray-100 dark:hover:bg-[#3b3c4e] rounded"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
