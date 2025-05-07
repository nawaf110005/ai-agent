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
  const { isOpen, title, content, openModal, closeModal } = useModal()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!apiKey) {
      openModal(
        'API Key Required',
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
      toast.error('Select an audio file first')
      return
    }
    try {
      await transcribe(file)
    } catch (err) {
      toast.error(err.message || 'Transcription failed')
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <label className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border rounded cursor-pointer">
          <UploadCloud className="mr-2" />
          <span>{file?.name || 'Select audio file'}</span>
          <input
            type="file"
            accept="audio/*"
            onChange={e => setFile(e.target.files[0] || null)}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Transcribing…' : 'Transcribe'}
        </button>
      </form>

      {error && <p className="text-red-500">{error.message}</p>}

      {transcript && (
        <div className="relative bg-white dark:bg-gray-700 border rounded-lg p-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(transcript)
              toast.success('Copied!')
            }}
            className="absolute top-2 right-2 p-1 bg-gray-200 dark:bg-gray-600 rounded"
          >
            <Copy />
          </button>
          <textarea
            readOnly
            value={transcript}
            className="w-full h-64 resize-none bg-transparent focus:outline-none overflow-y-auto no-scrollbar"
          />
        </div>
      )}
      <Modal isOpen={isOpen} title={title} onClose={closeModal} hideClose>
        {content}
      </Modal>
    </div>
  )
}
