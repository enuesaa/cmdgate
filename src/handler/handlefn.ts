import { type Context } from '@/context'
import { type Prompt } from '@/prompt'

// TODO: 循環参照になるの怖いから types.ts にまとめようかな..
export type HandleFn = (context: Context, prompt: Prompt) => void
