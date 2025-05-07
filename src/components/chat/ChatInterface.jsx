import React, { useEffect, useRef } from 'react'
import useChat from '../../hooks/useChat'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatInterface({ sessions, setSessions, activeId }) {
  const session = sessions.find(s => s.id === activeId) || { messages: [] }
  const { messages, sendMessage } = useChat(session.messages)
  const containerRef = useRef()

  // persist messages back into sessions
  useEffect(() => {
    setSessions(prev =>
      prev.map(s => (s.id === activeId ? { ...s, messages } : s))
    )
  }, [messages, activeId, setSessions])

  // auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      {/* chat history */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900"
      >
        <MessageList messages={messages} />
      </div>

      {/* input box */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  )
}
