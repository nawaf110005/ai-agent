import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext({
  darkMode: false,
  toggle: () => {},
})

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  // On mount, load stored preference or system default
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') {
      setDarkMode(stored === 'dark')
    } else {
      setDarkMode(
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    }
  }, [])

  // Apply/remove 'dark' class on <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggle = () => setDarkMode(prev => !prev)

  return (
    <ThemeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}