import React from 'react'
import { formatTimestamp } from '../../utils/formatting'

export default function Message({ role, content, id }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}> 
      <div className={`max-w-md px-4 py-2 rounded-lg shadow ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        <p>{content}</p>
        <span className="block text-xs text-gray-500 text-right mt-1">{formatTimestamp(id)}</span>
      </div>
    </div>
  )
}