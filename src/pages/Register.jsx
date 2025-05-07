// src/pages/Register.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const { createUser, signUpProvider } = useAuth()

  const submitHandler = e => {
    e.preventDefault()
    createUser(email, password, `${firstName} ${lastName}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl bg-auth-gradient text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={submitHandler} className="space-y-4 text-gray-900 dark:text-gray-100">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              required
              onChange={e => setFirstName(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              required
              onChange={e => setLastName(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              required
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              required
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition">
            Sign Up
          </button>
        </form>
        <hr className="my-6 border-gray-200 dark:border-gray-600" />
        <button
          onClick={signUpProvider}
          className="w-full flex items-center justify-center py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2" /> Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-100">
          Already registered?{' '}
          <Link to="/login" className="underline hover:text-white">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
