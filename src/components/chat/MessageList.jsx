import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'
import LightLogo from '../../assets/logo.png'
import DarkLogo from '../../assets/DarkLogo.png'

export default function MessageList({ messages }) {
  const { currentUser } = useAuth()
  const { darkMode } = useContext(ThemeContext)
  const userAvatar = currentUser?.photoURL
  const botAvatar = darkMode ? DarkLogo : LightLogo

  const components = {
    code({ node, inline, className, children, ...props }) {
      const codeText = String(children).replace(/\n$/, '')
      if (inline) {
        return (
          <code
            className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-300 px-1 rounded"
            {...props}
          >
            {children}
          </code>
        )
      }
      return (
        <div className="relative my-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(codeText)
              toast.success('Code copied!')
            }}
            className="absolute right-2 top-2 bg-gray-300 dark:bg-gray-600 p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            title="Copy code"
          >
            <Copy className="w-4 h-4 text-gray-800 dark:text-gray-200" />
          </button>
          <pre
            className="overflow-x-auto bg-gray-800 dark:bg-gray-700 text-white p-4 rounded-md"
            {...props}
          >
            <code className={className}>{children}</code>
          </pre>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {messages.map((m, i) => {
        const isUser = m.role === 'user'
        return (
          <div
            key={i}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}
          >
            {!isUser && (
              <img
                src={botAvatar}
                alt="Bot"
                className="w-8 h-8 rounded-full mr-2 self-end"
              />
            )}

            <div className="flex flex-col max-w-[70%]">
              {/* Timestamp at top */}
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 self-start">
                {m.timestamp}
              </span>

              {/* Message bubble */}
              <div
                className={`relative ${isUser ? 'px-3 py-3' : 'pt-8 px-3 pb-3'} break-words ${
                  isUser
                    ? 'bg-purple-600 text-white rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl'
                    : 'bg-blue-100 dark:bg-blue-800 text-gray-900 dark:text-gray-100 rounded-br-2xl rounded-tr-2xl rounded-tl-2xl'
                }`}
              >
                {/* Copy AI response button */}
                {!isUser && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(m.content)
                      toast.info('Response copied!')
                    }}
                    className="absolute right-2 top-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    title="Copy response"
                  >
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                )}

                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>

            {isUser && userAvatar && (
              <img
                src={userAvatar}
                alt="You"
                className="w-8 h-8 rounded-full ml-2 self-end"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
