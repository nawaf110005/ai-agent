// src/pages/Home.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Navbar from '../components/shared/NavBar'
import Sidebar from '../components/shared/Sidebar'
import Modal from '../components/shared/Modal'

import ChatInterface from '../components/chat/ChatInterface'
import AudioUpload from '../components/transcription/AudioUpload'
import APIKeyManager from '../components/profile/APIKeyManager'

import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import useModal from '../hooks/useModal'

export default function Home() {
  const { logOut } = useAuth()
  const { apiKey, validateKey, clearKey } = useApp()
  const navigate = useNavigate()
  const { isOpen, title, content, hideClose, openModal, closeModal } = useModal()

  // Sidebar + tabs + sessions
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('chat')
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('chatSessions')
    return saved ? JSON.parse(saved) : []
  })
  const [activeId, setActiveId] = useState(
    () => localStorage.getItem('activeSession') || ''
  )

  // Persist sessions on change
  useEffect(() => {
    if (!sessions.length) {
      const id = uuidv4()
      setSessions([{ id, name: 'New Chat', messages: [] }])
      setActiveId(id)
    }
    localStorage.setItem('chatSessions', JSON.stringify(sessions))
  }, [sessions])

  // Persist active session
  useEffect(() => {
    if (activeId) localStorage.setItem('activeSession', activeId)
  }, [activeId])

  // Force-show the API-key modal until we have a valid apiKey
  useEffect(() => {
    if (!apiKey && !isOpen) {
      setTab('profile')
      openModal(
        'Enter Your OpenAI API Key',
        <APIKeyManager
          validateKey={validateKey}
          clearKey={clearKey}
          mode="validate"
          onSuccess={() => {
            closeModal()
            setTab('chat')
          }}
        />,
        { hideClose: true }
      )
    }
  }, [apiKey, isOpen, openModal, closeModal, setTab, validateKey, clearKey])

  // Create a new chat session
  const startNew = () => {
    const id = uuidv4()
    setSessions(prev => [{ id, name: 'New Chat', messages: [] }, ...prev])
    setActiveId(id)
    setTab('chat')
    setSidebarOpen(false)
  }

  // Delete a session with confirmation
  const handleDelete = id => {
    openModal(
      'Delete Chat?',
      <div>
        <p className="text-gray-900 dark:text-gray-100">
          Are you sure you want to delete this chat?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => {
              const remaining = sessions.filter(s => s.id !== id)
              setSessions(remaining)
              if (activeId === id) setActiveId(remaining[0]?.id || '')
              closeModal()
            }}
          >
            Delete
          </button>
        </div>
      </div>,
      { hideClose: false }
    )
  }

  // Log out
  const handleLogout = async () => {
    await logOut()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        setActiveId={setActiveId}
        onDelete={handleDelete}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        tab={tab}
        setTab={setTab}
        startNew={startNew}
      />

      <div
        className={`
          flex flex-1 flex-col overflow-hidden
          transition-all duration-200
          ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}
        `}
      >
        <Navbar onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <div className="flex flex-1 overflow-hidden bg-gray-50 dark:bg-[#202123]">
          {tab === 'chat' && (
            <ChatInterface
              key={activeId}
              sessions={sessions}
              setSessions={setSessions}
              activeId={activeId}
            />
          )}
          {tab === 'transcribe' && <AudioUpload />}
          {tab === 'profile' && (
            <APIKeyManager
              validateKey={validateKey}
              clearKey={clearKey}
              mode="manage"
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        title={title}
        onClose={closeModal}
        hideClose={hideClose}
      >
        {content}
      </Modal>
    </div>
  )
}
