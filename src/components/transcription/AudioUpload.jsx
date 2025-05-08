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
    <div className="w-full px-4 pt-4 pb-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner">
      <div className="max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <label className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer transition hover:bg-gray-200 dark:hover:bg-gray-600">
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
            className={`px-5 py-2 rounded-xl text-white transition ${
              loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Transcribing…' : 'Transcribe'}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error.message}</p>}

        {transcript && (
          <div className="relative bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow">
            <button
              onClick={() => {
                navigator.clipboard.writeText(transcript)
                toast.success('Copied!')
              }}
              className="absolute top-2 right-2 p-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              <Copy className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
            <textarea
              readOnly
              value={transcript}
              className="w-full h-64 resize-none bg-transparent text-gray-800 dark:text-white focus:outline-none overflow-y-auto no-scrollbar"
            />
          </div>
        )}

        <Modal isOpen={isOpen} title={title} onClose={closeModal} hideClose>
          {content}
        </Modal>
      </div>
    </div>
  )
}
