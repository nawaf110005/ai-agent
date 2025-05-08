import { useReducer, useCallback } from 'react'

const initialState = {
  isOpen: false,
  title: '',
  content: null,
  hideClose: false,
}

function modalReducer(state, action) {
  switch (action.type) {
    case 'OPEN':
      return {
        isOpen: true,
        title: action.payload.title,
        content: action.payload.content,
        hideClose: action.payload.hideClose || false,
      }
    case 'CLOSE':
      return state.hideClose ? state : { ...state, isOpen: false }
    case 'FORCE_CLOSE':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export default function useModal() {
  const [state, dispatch] = useReducer(modalReducer, initialState)

  const openModal = useCallback((title, content, options = {}) => {
    dispatch({
      type: 'OPEN',
      payload: { title, content, hideClose: options.hideClose },
    })
  }, [])

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE' })
  }, [])

  const forceCloseModal = useCallback(() => {
    dispatch({ type: 'FORCE_CLOSE' })
  }, [])

  return {
    ...state,
    openModal,
    closeModal,
    forceCloseModal,
  }
}
