import { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { createOpenaiClient } from '../services/openai'

export default function useChat(initialMessages = []) {
  const { apiKey } = useApp()
  const [messages, setMessages] = useState(initialMessages)

  const client = useCallback(() => createOpenaiClient(apiKey), [apiKey])

  const sendMessage = useCallback(
    async content => {
      if (!apiKey) throw new Error('API key required')
      const now = new Date().toLocaleTimeString()
      const userMsg = { role: 'user', content, timestamp: now }
      const updated = [...messages, userMsg]
      setMessages(updated)

      const res = await client().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: updated.map(m => ({ role: m.role, content: m.content }))
      })
      const assistantMsg = {
        role: 'assistant',
        content: res.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages([...updated, assistantMsg])
    },
    [messages, apiKey, client]
  )

  return { messages, sendMessage }
}
