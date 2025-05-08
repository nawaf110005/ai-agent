import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function MessageInput({ onSend, isSending, isChatLoading }) {
  const [text, setText] = useState('')

  const submit = e => {
    e.preventDefault()
    const val = text.trim()
    if (!val || isSending || isChatLoading) return
    onSend(val)
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex space-x-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={isChatLoading ? 'Loading conversation…' : isSending ? 'Waiting for reply…' : 'Type your message…'}
        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none"
        disabled={isSending || isChatLoading}
      />
      <button
        type="submit"
        disabled={isSending || isChatLoading}
        className={`p-2 ${isSending || isChatLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-xl`}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}