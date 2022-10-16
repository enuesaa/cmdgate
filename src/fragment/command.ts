import { Option } from '@/fragment/option'
import { classify } from '@/util/classify'
import { Handler, Handle, resolveHandlerArg } from '@/handler'
import { Positional } from '@/fragment/positional'
import { Prompt } from '@/prompt'
import { HelpOption } from '@/fragment/help-option'
import { VersionOption } from '@/fragment/version-option'

export type CommandConfig = {
  usage: string
  description: string
  param: {
    [key: string]: Option | HelpOption | VersionOption | Positional
  },
  handler: Handler
}
export class Command {
  route: string
  usage: string
  description: string
  handler: Handler
  options: Option[]
  positionals: Positional[]

  constructor(route: string, config: Partial<CommandConfig>) {
    this.route = route
    this.usage = config.usage ?? ''
    this.description = config.description ?? ''
    this.handler =
      config.handler ??
      ((arg: Handle) => {
        console.log('default command handler')
        return true
      })
    const { options, positionals } = classify(config.param ?? {})
    this.options = options
    this.positionals = positionals
  }

  execHandler(arg: { options: Record<string, string | null> }, prompt: Prompt): void {
    const handlerarg = resolveHandlerArg({ positionals: this.positionals, options: this.options }, arg)
    if (handlerarg !== false) {
      this.handler({args: handlerarg, prompt: prompt})
    }
  }
}
