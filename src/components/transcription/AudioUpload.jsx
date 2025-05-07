// src/components/transcription/AudioUpload.jsx

import React, { useState } from 'react'
import { Copy, UploadCloud } from 'lucide-react'
import useTranscription from '../../hooks/useTranscription'
import { toast } from 'react-toastify'
import { useApp } from '../../context/AppContext'
import Modal from '../shared/Modal'
import useModal from '../../hooks/useModal'
import APIKeyManager from '../profile/APIKeyManager'

export default function AudioUpload() {
  const { apiKey, validateKey, clearKey } = useApp()
  const { transcript, loading, error, transcribe } = useTranscription()
  const [file, setFile] = useState(null)

  // Modal for API key prompt
  const { isOpen, title, content, openModal, closeModal } = useModal()

  const handleFileChange = e => {
    setFile(e.target.files?.[0] || null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!apiKey) {
      openModal(
        'OpenAI API Key Required',
        <APIKeyManager
          validateKey={validateKey}
          clearKey={clearKey}
          onSuccess={closeModal}
        />,
        { hideClose: true }
      )
      return
    }
    if (!file) {
      toast.error('Please select an audio file first')
      return
    }
    try {
      await transcribe(file)
    } catch (err) {
      toast.error(err.message || 'Transcription failed.')
    }
  }

  const handleCopy = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript)
      toast.success('Copied to clipboard!')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <label className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
          <UploadCloud className="mr-2" />
          <span>{file ? file.name : 'Select audio file'}</span>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Transcribing…' : 'Transcribe'}
        </button>
      </form>

      {error && (
        <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
      )}

      {transcript && (
        <div className="relative bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            title="Copy transcript"
          >
            <Copy />
          </button>
          {/* Hidden scrollbar via no-scrollbar */}
          <textarea
            readOnly
            value={transcript}
            className="w-full h-64 bg-transparent resize-none focus:outline-none text-gray-900 dark:text-gray-100 overflow-y-auto no-scrollbar"
          />
        </div>
      )}

      {/* API-key modal if needed */}
      <Modal isOpen={isOpen} title={title} onClose={closeModal} hideClose>
        {content}
      </Modal>
    </div>
  )
}
