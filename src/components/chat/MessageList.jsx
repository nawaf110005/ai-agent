// src/components/chat/MessageList.jsx

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAuth } from '../../context/AuthContext'

export default function MessageList({ messages }) {
  const { currentUser } = useAuth()
  const userAvatar = currentUser?.photoURL
  const botAvatarUrl =
    'https://localo.com/de/marketing-worterbuch/wp-content/uploads/2021/06/bot-icon.png' // direct image URL

  return (
    <div className="space-y-6">
      {messages.map((m, i) => {
        const isUser = m.role === 'user'
        return (
          <div
            key={i}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {/* Bot avatar */}
            {!isUser && (
              <img
                src={botAvatarUrl}
                alt="AI Bot"
                className="w-10 h-10 rounded-full mr-4 flex-shrink-0"
              />
            )}

            {/* Message bubble */}
            <div
              className={`prose prose-sm max-w-[65%] break-words p-4 ${
                isUser
                  ? 'bg-purple-600 text-white rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-br-2xl rounded-tr-2xl rounded-tl-2xl'
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (inline) {
                      return (
                        <code
                          className="bg-gray-300 dark:bg-gray-600 px-1 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    }
                    return (
                      <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
                        <code {...props}>{children}</code>
                      </pre>
                    )
                  },
                  a({ href, children, ...props }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                        {...props}
                      >
                        {children}
                      </a>
                    )
                  },
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>

            {/* User avatar */}
            {isUser && userAvatar && (
              <img
                src={userAvatar}
                alt="You"
                className="w-10 h-10 rounded-full ml-4 flex-shrink-0"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
