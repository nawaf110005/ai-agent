import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Copy } from 'lucide-react'
import useChat from '../../hooks/useChat'
import { createOpenaiClient } from '../../services/openai'
import { useApp } from '../../context/AppContext'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatInterface({ sessions, setSessions, activeId }) {
  const { apiKey } = useApp()
  const session = sessions.find(s => s.id === activeId) || { messages: [], name: '' }
  const { messages, sendMessage } = useChat(session.messages)
  const [titleSet, setTitleSet] = useState(false)
  const containerRef = useRef()

  // Reset summary flag on session change
  useEffect(() => {
    setTitleSet(false)
  }, [activeId])

  // Persist messages back into sessions
  useEffect(() => {
    setSessions(prev =>
      prev.map(s => (s.id === activeId ? { ...s, messages } : s))
    )
  }, [messages, activeId, setSessions])

  // Auto-scroll on new message
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  // Generate chat-summary title once, after the first assistant response
  useEffect(() => {
    const hasAssistant = messages.some(m => m.role === 'assistant')
    const isDefaultName =
      !session.name || session.name.startsWith('New Chat')

    if (hasAssistant && !titleSet && apiKey && isDefaultName) {
      setTitleSet(true)

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
          const summary = res.choices[0].message.content
            .trim()
            .split('\n')[0]
            .slice(0, 50)

          // Update session name
          setSessions(prev =>
            prev.map(s =>
              s.id === activeId
                ? { ...s, name: summary || 'Chat' }
                : s
            )
          )
        } catch (err) {
          console.error('Summary generation failed:', err)
        }
      })()
    }
  }, [messages, apiKey, activeId, session.name, setSessions, titleSet])

  // Wrap sendMessage to include timestamp and to auto-toast any errors
  const handleSend = async content => {
    try {
      await sendMessage(content)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden m-4">
      {/* Chat history */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 space-y-6 no-scrollbar"
      >
        <MessageList messages={messages} />
      </div>

      {/* Fixed input at bottom */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  )
}
