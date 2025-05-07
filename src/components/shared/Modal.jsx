// src/components/shared/Modal.jsx

import React from 'react'

export default function Modal({ isOpen, title, children, onClose, hideClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
        {/* Top-right close button, hidden when hideClose=true */}
        {!hideClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close modal"
          >
            ✕
          </button>
        )}

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h3>

        {/* Content */}
        <div className="text-gray-700 dark:text-gray-300 mb-6">
          {children}
        </div>

        {/* Footer OK button, hidden when hideClose=true */}
        {!hideClose && (
          <div className="text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
