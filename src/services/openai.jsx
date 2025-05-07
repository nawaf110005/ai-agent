// src/services/openai.jsx

import { OpenAI } from "openai"

/**
 * Creates a new OpenAI client using the provided API key.
 * We enable `dangerouslyAllowBrowser: true` so you can test in-browser.
 */
export function createOpenaiClient(apiKey) {
  if (!apiKey) {
    throw new Error("No OpenAI API key provided")
  }
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  })
}
