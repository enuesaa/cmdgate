import { Handler } from '@/handler'
import { Argument } from '@/types/argument'
import { Option } from '@/types/option'
import { Context } from '@/context'
import { Prompt } from '@/prompt'

export type CommandConfig = {
  name: string
  description: string
  version: string
  handlers: Record<string, Handler>
}

export type HandlerConfig = {
  description: string
  arguments: Argument[]
  options: Option[]
  handlefn: HandleFn
}

export type HandleFn = (context: Context, prompt: Prompt) => void
