// src/context/AppContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createOpenaiClient } from '../services/openai'

const AppContext = createContext()

export function AppProvider({ children }) {
  // Load any existing key from localStorage
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '')

  // Persist key (or remove) whenever it changes
  useEffect(() => {
    if (apiKey) localStorage.setItem('apiKey', apiKey)
    else localStorage.removeItem('apiKey')
  }, [apiKey])

  /**
   * Attempt to validate a fresh API key.
   * Returns true if OK, false otherwise.
   */
  const validateKey = async (candidateKey) => {
    try {
      // instantiate with the candidate
      const client = createOpenaiClient(candidateKey)
      // minimal test call
      await client.models.list()
      // if it succeeded, store it!
      setApiKey(candidateKey)
      return true
    } catch (err) {
      console.error('API key validation failed:', err)
      return false
    }
  }

  // Clear out the saved key
  const clearKey = () => {
    setApiKey('')
  }

  return (
    <AppContext.Provider value={{ apiKey, validateKey, clearKey }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
