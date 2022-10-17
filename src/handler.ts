import { Option } from './fragment/option'
import { Positional } from './fragment/positional'
import { Prompt } from '@/prompt'

export type Handle = {
  args: {
    [key: string]: string | null
  }
  prompt: Prompt
}
export type Handler = (handle: Handle) => void
