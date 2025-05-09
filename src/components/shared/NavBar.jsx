import React, { useContext } from 'react'
import { Menu, Sun, Moon } from 'lucide-react'
import { ThemeContext } from '../../context/ThemeContext'

export default function Navbar({ onToggleSidebar }) {
  const { darkMode, toggle } = useContext(ThemeContext)

  return (
    <header className="
      flex items-center justify-between
      px-4 py-3
      bg-white text-gray-900 border-b border-gray-200
      dark:bg-[#343541] dark:text-gray-100 dark:border-gray-700
    ">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
        title="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold">NawafGPT</h1>

      <button
        onClick={toggle}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        title="Toggle dark/light"
      >
        {darkMode
          ? <Sun className="w-5 h-5 text-yellow-400" />
          : <Moon className="w-5 h-5 text-gray-600" />
        }
      </button>
    </header>
  )
}
