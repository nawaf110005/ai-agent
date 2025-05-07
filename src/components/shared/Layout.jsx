import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
// import Switch from './Switch'

const navItems = [
  { to: '/', label: 'Chat' },
  { to: '/profile', label: 'Profile' },
]

export default function Layout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          AI Agent
        </div>
        <nav className="flex-1">
          {navItems.map((item) => (
            <NavLink
              to={item.to}
              end
              key={item.to}
              className={({ isActive }) =>
                `block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4">
          {/* <Switch /> */}
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  )
}
