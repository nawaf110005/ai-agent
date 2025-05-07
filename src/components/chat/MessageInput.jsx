import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <button
        type="submit"
        className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}
