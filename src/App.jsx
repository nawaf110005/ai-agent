import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthContextProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import Router from './router/Router'

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthContextProvider>
          <AppProvider>
            <Router/>
          </AppProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  )
}
