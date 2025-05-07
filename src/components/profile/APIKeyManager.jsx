import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useApp } from '../../context/AppContext'

export default function APIKeyManager({ validateKey, clearKey, onSuccess }) {
  const { apiKey } = useApp()
  const [key, setKey] = useState(apiKey || '')
  const [editing, setEditing] = useState(!apiKey)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setKey(apiKey || '')
    setEditing(!apiKey)
  }, [apiKey])

  const save = async e => {
    e.preventDefault()
    if (!key) return toast.error('Key cannot be empty')
    setLoading(true)
    const ok = await validateKey(key)
    setLoading(false)
    if (ok) {
      toast.success('Key saved')
      setEditing(false)
      onSuccess?.()
    } else {
      toast.error('Invalid key')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        OpenAI API Key
      </h2>
      {editing ? (
        <form onSubmit={save} className="space-y-4">
          <input
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {loading ? 'Validating…' : 'Save Key'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="break-words text-gray-700 dark:text-gray-300">
            {key.replace(/.(?=.{4})/g, '*')}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-2 bg-yellow-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => {
                clearKey()
                setEditing(true)
                toast.info('Key deleted')
              }}
              className="flex-1 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
)
}
