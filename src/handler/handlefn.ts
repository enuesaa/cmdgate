import { type Context } from '@/context'
import { type Prompt } from '@/prompt'

export type HandleFn = (context: Context, prompt: Prompt) => void
