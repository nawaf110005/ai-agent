import { OpenAI } from 'openai'

export function createOpenaiClient(apiKey) {
  if (!apiKey) throw new Error('Missing API key')
  return new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
}
