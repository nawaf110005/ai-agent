// src/components/profile/APIKeyManager.jsx

import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { toast } from 'react-toastify'

export default function APIKeyManager({ validateKey, clearKey, onSuccess }) {
  const { apiKey } = useApp()
  const [localKey, setLocalKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(!apiKey)

  // Initialize localKey when apiKey changes
  useEffect(() => {
    setLocalKey(apiKey || '')
    setEditing(!apiKey)
  }, [apiKey])

  const handleSave = async e => {
    e.preventDefault()
    if (!localKey.trim()) {
      toast.error('API key cannot be empty')
      return
    }
    setLoading(true)
    const ok = await validateKey(localKey.trim())
    setLoading(false)
    if (ok) {
      toast.success('API key saved!')
      setEditing(false)
      onSuccess?.()
    } else {
      toast.error('Invalid API key.')
    }
  }

  const handleDelete = () => {
    clearKey()
    setLocalKey('')
    setEditing(true)
    toast.info('API key deleted')
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        OpenAI API Key
      </h2>

      {!editing && apiKey ? (
        <div className="space-y-4">
          <p className="break-all text-gray-700 dark:text-gray-300">
            Stored Key: <span className="font-mono">{apiKey.replace(/.(?=.{4})/g, '*')}</span>
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Update Key
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Key
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Enter your OpenAI API Key
            </label>
            <input
              type="password"
              value={localKey}
              onChange={e => setLocalKey(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="sk-…"
            />
          </div>
          <div className="flex justify-end space-x-2">
            {apiKey && (
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                  setLocalKey(apiKey)
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Validating…' : apiKey ? 'Update Key' : 'Save Key'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
