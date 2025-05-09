import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function APIKeySetup({ onSuccess, validateKey }) {
  const [inputKey, setInputKey] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const trimmed = inputKey.trim()
    if (!trimmed) {
      toast.error('API key cannot be empty')
      return
    }

    setLoading(true)
    try {
      const ok = await validateKey(trimmed)
      if (ok) {
        toast.success('API key saved')
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess()
        }
      } else {
        toast.error('Invalid API key')
      }
    } catch (err) {
      console.error('Validation error:', err)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        You can get your key from the{' '}
        <a
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          OpenAI API Keys page
        </a>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={inputKey}
          onChange={e => setInputKey(e.target.value)}
          placeholder="sk-..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? 'Validating…' : 'Save Key'}
        </button>
      </form>
    </div>
  )
}
