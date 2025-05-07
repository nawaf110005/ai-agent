// src/components/shared/ErrorBoundary.jsx

import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600">
          Oops—something went wrong in this section.
        </div>
      )
    }
    return this.props.children
  }
}
