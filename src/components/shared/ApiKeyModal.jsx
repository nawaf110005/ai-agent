// src/components/shared/ApiKeyModal.jsx
import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function ApiKeyModal() {
  const { openaiKey, saveKey } = useApp()
  const [temp, setTemp] = useState(openaiKey)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Enter OpenAI API Key</h2>
        <input
          value={temp}
          onChange={e => setTemp(e.target.value)}
          placeholder="sk-..."
          className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          onClick={() => temp.trim() && saveKey(temp.trim())}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save Key
        </button>
      </div>
    </div>
  )
}
