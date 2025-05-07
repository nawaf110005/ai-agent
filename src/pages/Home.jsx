// src/pages/Home.jsx

import React, { useState, useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import Sidebar from '../components/shared/Sidebar'
import ChatInterface from '../components/chat/ChatInterface'
import AudioUpload from '../components/transcription/AudioUpload'
import APIKeyManager from '../components/profile/APIKeyManager'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../components/shared/Modal'
import useModal from '../hooks/useModal'

export default function Home() {
  const { logOut } = useAuth()
  const { apiKey, validateKey, clearKey } = useApp()
  const navigate = useNavigate()

  const { isOpen, title, content, hideClose, openModal, closeModal } = useModal()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('chat')
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('chatSessions')
    return saved ? JSON.parse(saved) : []
  })
  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem('activeSession') || ''
  })

  // Persist sessions & activeId
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(sessions))
    if (sessions.length === 0) {
      const id = uuidv4()
      setSessions([{ id, name: `Chat ${new Date().toLocaleTimeString()}`, messages: [] }])
      setActiveId(id)
    }
  }, [sessions])

  useEffect(() => {
    if (activeId) localStorage.setItem('activeSession', activeId)
  }, [activeId])

  // Ensure active session exists
  useEffect(() => {
    if (activeId && !sessions.find(s => s.id === activeId)) {
      setActiveId(sessions[0]?.id || '')
    }
  }, [sessions, activeId])

  // Force API-key entry first
  useEffect(() => {
    if (!apiKey) {
      setTab('profile')
      openModal(
        'Enter Your OpenAI API Key',
        <APIKeyManager
          validateKey={validateKey}
          clearKey={clearKey}
          onSuccess={() => {
            closeModal()
            setTab('chat')
          }}
        />,
        { hideClose: true }
      )
    }
  }, [apiKey, openModal, closeModal, validateKey, clearKey])

  const startNew = () => {
    const id = uuidv4()
    setSessions(prev => [
      { id, name: `Chat ${new Date().toLocaleTimeString()}`, messages: [] },
      ...prev,
    ])
    setActiveId(id)
    setTab('chat')
  }

  const handleDelete = id => {
    openModal(
      'Delete Chat?',
      <div>
        <p>Delete this chat?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>Cancel</button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              setSessions(prev => prev.filter(s => s.id !== id))
              if (id === activeId) {
                const rem = sessions.filter(s => s.id !== id)
                setActiveId(rem[0]?.id || '')
              }
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
        visible={sidebarOpen || window.innerWidth >= 768}
        tab={tab}
        setTab={setTab}
        startNew={startNew}
      />

      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(v => !v)} />
        <main className="flex-1 flex overflow-hidden p-4">
          {tab === 'chat' && (
            // Key the component by activeId so hooks reset per session
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
              onSuccess={() => {
                closeModal()
                setTab('chat')
              }}
            />
          )}
        </main>
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
