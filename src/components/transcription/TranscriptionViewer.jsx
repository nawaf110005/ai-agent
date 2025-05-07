// src/components/transcription/TranscriptionViewer.jsx
import React from 'react'
export default function TranscriptionViewer({ text }) {
  return <pre className="whitespace-pre-wrap">{text}</pre>
}
