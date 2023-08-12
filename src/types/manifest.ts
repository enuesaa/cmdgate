import { Handler } from '@/handler'
import { Argument } from './argument'
import { Option } from './option'
import { Context } from '@/context'
import { Prompt } from '@/prompt'

export type CommandConfig = {
  name: string
  description: string
  version: string
  middlewares: Handler[]
  handlers: Record<string, Handler>
}

export type HandlerConfig = {
  description: string
  arguments: Argument[]
  options: Option[]
  handlefn: HandleFn
}

export type HandleFn = (context: Context, prompt: Prompt) => void
