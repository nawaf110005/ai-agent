// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : false
  })
  const navigate = useNavigate()

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        const { email, displayName, photoURL } = user
        const u = { email, displayName, photoURL }
        setCurrentUser(u)
        localStorage.setItem('user', JSON.stringify(u))
      } else {
        setCurrentUser(false)
        localStorage.removeItem('user')
      }
    })
    return unsub
  }, [])

  const createUser = async (email, pass, name) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass)
      await updateProfile(auth.currentUser, { displayName: name })
      toast.success('Registered!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const signIn = async (email, pass) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass)
      toast.success('Logged in!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const signUpProvider = async () => {
    try {
      const p = new GoogleAuthProvider()
      await signInWithPopup(auth, p)
      toast.success('Google sign-in!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const logOut = async () => {
    await signOut(auth)
    toast.success('Logged out')
  }

  const forgotPassword = async email => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.warn('Reset email sent')
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
