import { Prompt } from '@/prompt'

export type Handle = {
  args: {
    [key: string]: string | null | boolean
  }
  prompt: Prompt
}
export type Handler = (handle: Handle) => void
