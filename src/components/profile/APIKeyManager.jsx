import React, { useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { toast } from 'react-toastify'

export default function APIKeyManager({ apiKey, clearKey, promptValidate, onSuccess }) {
  const [inputKey, setInputKey] = useState(apiKey || '')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const isModified = inputKey.trim() !== (apiKey || '').trim()

  const handleUpdate = async () => {
    const trimmed = inputKey.trim()
    if (!trimmed) {
      toast.error('Please enter a valid API key.')
      return
    }

    setLoading(true)
    try {
      const success = await promptValidate(trimmed)
      if (success) {
        localStorage.setItem('openai_api_key', trimmed)
        toast.success('API key updated.')
        if (onSuccess) setTimeout(() => onSuccess(), 100)
        setEditing(false)
      } else {
        toast.error('Invalid API key.')
      }
    } catch (error) {
      console.error('Validation failed:', error)
      toast.error('Something went wrong while validating.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    clearKey()
    toast.info('Key deleted')
    promptValidate()
    setEditing(false)
    setShowDeleteModal(false)
  }

  return (
    <div className="w-full px-4 pt-4 pb-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Manage your OpenAI API Key
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          You can get your API key from{' '}
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            OpenAI API Keys page
          </a>.
        </p>

        {!editing ? (
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2">
            <p className="text-gray-700 dark:text-gray-200 font-mono truncate">
              {apiKey?.replace(/.(?=.{4})/g, '*') || 'No API Key saved'}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-xl"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow space-y-4">
            {/* Close button */}
            <button
              onClick={() => setEditing(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
              title="Cancel"
            >
              <X className="w-5 h-5" />
            </button>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              API Key:
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={e => setInputKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(prev => !prev)}
                className="absolute right-2 top-2 text-gray-500 dark:text-gray-300"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleUpdate}
                disabled={!isModified || loading}
                className={`text-sm px-4 py-1.5 rounded-lg text-white transition ${
                  !isModified
                    ? 'bg-gray-400 cursor-not-allowed'
                    : loading
                    ? 'bg-green-400'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'Validating…' : !isModified ? 'No Changes' : 'Save'}
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-sm px-4 py-1.5 rounded-lg text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete API Key?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you sure you want to delete your OpenAI API key? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
