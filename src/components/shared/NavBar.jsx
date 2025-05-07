// src/components/shared/Navbar.jsx
import React, { useEffect, useState } from 'react'
import { Sun, Moon, Menu } from 'lucide-react'

export default function Navbar({ onToggleSidebar }) {
  // initialize based on saved preference or default to dark
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') return false
    return true
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#343541] text-gray-100">
      <button className="md:hidden" onClick={onToggleSidebar}>
        <Menu className="w-6 h-6 text-gray-100" />
      </button>
      <h1 className="text-lg font-semibold">Nawaf AI</h1>
      <button
        onClick={() => setDark(d => !d)}
        className="p-2 rounded hover:bg-gray-600"
        title="Toggle dark/light"
      >
        {dark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-200" />
        )}
      </button>
    </header>
  )
}
