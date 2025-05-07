// src/hooks/useChat.jsx

import { useState, useCallback } from "react"
import { useApp } from "../context/AppContext"
import { createOpenaiClient } from "../services/openai"

/**
 * Hook for chat: maintains its own messages state and sends to OpenAI.
 * Accepts the initial message array only on first render.
 */
export default function useChat(initialMessages = []) {
  const { apiKey } = useApp()
  const [messages, setMessages] = useState(initialMessages)

  const client = useCallback(
    () => createOpenaiClient(apiKey),
    [apiKey]
  )

  const sendMessage = useCallback(
    async (content) => {
      if (!apiKey) throw new Error("Please enter your OpenAI API key first.")
      const userMsg = { role: "user", content }
      const updated = [...messages, userMsg]
      setMessages(updated)

      const res = await client().chat.completions.create({
        model: "gpt-4o-mini",
        messages: updated,
      })
      const assistantMsg = {
        role: "assistant",
        content: res.choices[0].message.content,
      }
      setMessages([...updated, assistantMsg])
    },
    [messages, apiKey, client]
  )

  return { messages, sendMessage }
}
