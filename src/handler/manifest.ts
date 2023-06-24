import { Handler } from '@/handler/handler'
import { Argument } from '@/fragments/argument'
import { Option } from '@/fragments/option'
import { type HandleFn } from '@/handler/handlefn'

export type CommandManifest = {
  name: string
  description: string
  version: string
  middlewares: Handler[]
  handlers: Record<string, Handler>
}

export type HandlerManifest = {
  description: string
  arguments: Argument[]
  options: Option[]
  handlefn: HandleFn
}
