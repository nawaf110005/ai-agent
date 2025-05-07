// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { createOpenaiClient } from '../services/openai'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openaiKey') || '')

  useEffect(() => {
    if (apiKey) localStorage.setItem('openaiKey', apiKey)
    else localStorage.removeItem('openaiKey')
  }, [apiKey])

  const validateKey = async (key) => {
    try {
      const client = createOpenaiClient(key)
      await client.models.list()
      setApiKey(key)
      return true
    } catch {
      return false
    }
  }

  const clearKey = () => setApiKey('')

  return (
    <AppContext.Provider value={{ apiKey, validateKey, clearKey }}>
      {children}
    </AppContext.Provider>
  )
}
