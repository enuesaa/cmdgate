import { Option } from '@/fragment/option'
import { Handler } from '@/handler'
import { Positional } from '@/fragment/positional'
import { Prompt } from '@/prompt'
import { HelpOption } from '@/fragment/help-option'
import { VersionOption } from '@/fragment/version-option'

export type CommandConfig = {
  usage: string
  description: string
  param: {
    [key: string]: Option | HelpOption | VersionOption | Positional
  }
  handler: Handler | null
}
export class Command {
  route: string
  config: CommandConfig
  hasPositionals: boolean

  constructor(route: string, config: Partial<CommandConfig>) {
    this.route = route
    this.config = { usage: '', description: '', param: {}, handler: null, ...config }
    this.hasPositionals = Object.values(this.config.param).map(v => v instanceof Positional).some(v => v === true)
  }

  isMatch(route: string): boolean {
    return this.hasPositionals ? route.startsWith(this.route) : this.route === route
  }

  execHandler(arg: { options: Record<string, string | true> }, prompt: Prompt): void {
    const handlerArg :{[key: string]: null | string | boolean } = Object.keys(this.config.param).reduce((o, key) => ({...o, [key]: null}), {})
    
    for (const [name, value] of Object.entries(this.config.param)) {
      for (const [argname, argvalue] of Object.entries(arg.options)) {
        if (value.isMatch(argname)) {
          handlerArg[name] = argvalue
          if (value instanceof HelpOption) {
            return value.execHandler(prompt)
          } 
          if (value instanceof VersionOption) {
            return value.execHandler(prompt)
          }
        }
      }
    }

    // check is invalid

    if (this.config.handler !== null) {
      this.config.handler({ args: handlerArg, prompt: prompt })
    }
  }
}
