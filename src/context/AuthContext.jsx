import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Persist auth in localStorage
    setPersistence(auth, browserLocalPersistence).catch(console.error)

    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(
        user
          ? { email: user.email, displayName: user.displayName, photoURL: user.photoURL }
          : null
      )
    })
    return unsub
  }, [])

  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName })
      toast.success('Registered!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const signUpProvider = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Google login!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const logOut = async () => {
    await signOut(auth)
    toast.info('Logged out')
  }

  const forgotPassword = async email => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.info('Reset email sent')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, createUser, signIn, signUpProvider, logOut, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
