import React, { useEffect, useState, useRef } from 'react'
import useChat from '../../hooks/useChat'
import { createOpenaiClient } from '../../services/openai'
import { useApp } from '../../context/AppContext'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { toast } from 'react-toastify'

export default function ChatInterface({ sessions, setSessions, activeId }) {
  const { apiKey } = useApp()
  const session = sessions.find(s => s.id === activeId) || { messages: [], name: '' }
  const { messages, sendMessage, loading: isChatLoading } = useChat(session.messages)
  const [didSummarize, setDidSummarize] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const containerRef = useRef()

  useEffect(() => {
    setDidSummarize(false)
  }, [activeId])

  useEffect(() => {
    setSessions(prev =>
      prev.map(s => (s.id === activeId ? { ...s, messages } : s))
    )
  }, [messages, activeId, setSessions])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const hasAssistant = messages.some(m => m.role === 'assistant')
    const isDefaultName = !session.name || session.name.startsWith('New Chat')

    if (hasAssistant && !didSummarize && apiKey && isDefaultName) {
      setDidSummarize(true)

      ;(async () => {
        try {
          const client = createOpenaiClient(apiKey)
          const res = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
              ...messages.map(m => ({ role: m.role, content: m.content })),
              {
                role: 'system',
                content:
                  'In three words or less, give a concise title summarizing our conversation.'
              }
            ]
          })
          const summaryText = res.choices[0].message.content
            .trim()
            .split('\n')[0]
            .slice(0, 50) || 'Chat'

          let built = ''
          for (const ch of summaryText) {
            built += ch
            await new Promise(r => setTimeout(r, 50))
            setSessions(prev =>
              prev.map(s =>
                s.id === activeId ? { ...s, name: built } : s
              )
            )
          }
        } catch (err) {
          console.error('Summary generation failed:', err)
        }
      })()
    }
  }, [messages, apiKey, activeId, session.name, setSessions, didSummarize])

  const handleSend = async content => {
    try {
      setIsSending(true)
      await sendMessage(content)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden m-4">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 space-y-6 no-scrollbar"
      >
        <MessageList messages={messages} isSending={isSending} />
      </div>
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <MessageInput onSend={handleSend} isSending={isSending} isChatLoading={isChatLoading} />
      </div>
    </div>
  )
}
