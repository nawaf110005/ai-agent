// src/components/shared/Navbar.jsx

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function Navbar({ onToggleSidebar }) {
  // read stored theme or default to dark
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') return false
    return true
  })

  // apply .dark class to <html>
  useEffect(() => {
    const root = window.document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header className="flex items-center justify-between bg-[#202123] dark:bg-[#343541] px-4 py-3 shadow">
      {/* mobile menu button */}
      <button
        className="md:hidden text-gray-300 hover:text-white"
        onClick={onToggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none" stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Title */}
      <h1 className="text-xl font-semibold text-white">
        Nawaf AI Agent
      </h1>

      {/* Dark/Light toggle */}
      <button
        onClick={() => setDark(d => !d)}
        className="p-2 rounded hover:bg-gray-600 focus:outline-none"
        title="Toggle dark/light mode"
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
