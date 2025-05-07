import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Navbar from '../components/shared/Navbar'
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

  const [mobileOpen, setMobileOpen] = useState(false)
  const [tab, setTab] = useState('chat')
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('chatSessions')
    return saved ? JSON.parse(saved) : []
  })
  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem('activeSession') || ''
  })

  // Persist sessions
  useEffect(() => {
    if (sessions.length === 0) {
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

  // Enforce API key
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
  }, [apiKey])

  const startNew = () => {
    const id = uuidv4()
    setSessions(prev => [{ id, name: 'New Chat', messages: [] }, ...prev])
    setActiveId(id)
    setTab('chat')
    setMobileOpen(false)
  }

  const handleDelete = id => {
    openModal(
      'Delete Chat?',
      <div>
        <p>Are you sure you want to delete this chat?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              setSessions(prev => prev.filter(s => s.id !== id))
              if (activeId === id) {
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
    <div className="flex h-screen">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        setActiveId={setActiveId}
        onDelete={handleDelete}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        tab={tab}
        setTab={setTab}
        startNew={startNew}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setMobileOpen(o => !o)} />

        {/* Content area */}
        <div className="flex-1 flex overflow-hidden bg-[#202123]">
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
              onSuccess={() => {
                closeModal()
                setTab('chat')
              }}
            />
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} title={title} onClose={closeModal} hideClose={hideClose}>
        {content}
      </Modal>
    </div>
  )
}
