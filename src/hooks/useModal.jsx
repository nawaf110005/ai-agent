// src/hooks/useModal.jsx

import { useState, useCallback } from 'react'

export default function useModal() {
  // We now track hideClose to disable close controls when needed
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: null,
    hideClose: false,
  })

  /**
   * openModal(title, content, options)
   * options.hideClose: if true, hides the ✕ button and OK footer
   */
  const openModal = useCallback(
    (title, content, { hideClose = false } = {}) => {
      setModalProps({ isOpen: true, title, content, hideClose })
    },
    []
  )

  // closeModal will only close if hideClose is false
  const closeModal = useCallback(() => {
    setModalProps(prev =>
      prev.hideClose
        ? prev
        : { ...prev, isOpen: false }
    )
  }, [])

  return { ...modalProps, openModal, closeModal }
}
