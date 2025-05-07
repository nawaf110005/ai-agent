import { useState, useCallback } from 'react'

export default function useModal() {
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: null,
    hideClose: false,
  })

  const openModal = useCallback((title, content, options = {}) => {
    setModalProps({ isOpen: true, title, content, hideClose: options.hideClose || false })
  }, [])

  const closeModal = useCallback(() => {
    setModalProps(prev => (prev.hideClose ? prev : { ...prev, isOpen: false }))
  }, [])

  return { ...modalProps, openModal, closeModal }
}
