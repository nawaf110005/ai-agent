import { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { createOpenaiClient } from '../services/openai'

export default function useTranscription() {
  const { apiKey } = useApp()
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const transcribe = useCallback(
    async file => {
      if (!apiKey) throw new Error('API key required')
      setLoading(true)
      setError(null)
      try {
        const client = createOpenaiClient(apiKey)
        const res = await client.audio.transcriptions.create({
          file,
          model: 'whisper-1',
        })
        setTranscript(res.text)
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiKey]
  )

  return { transcript, loading, error, transcribe }
}
