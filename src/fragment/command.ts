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
  positionals: { [key: string]: Positional }

  constructor(route: string, config: Partial<CommandConfig>) {
    this.route = route
    this.config = { usage: '', description: '', param: {}, handler: null, ...config }
    this.positionals = {}
    this.classifyParam(this.config.param)
  }

  isMatch(route: string): boolean {
    return Object.keys(this.positionals).length === 0 ? this.route === route : route.startsWith(this.route)
  }

  classifyParam(param: { [key: string]: Option | HelpOption | VersionOption | Positional }) {
    for (const [name, value] of Object.entries(param)) {
      if (value instanceof Positional) {
        this.positionals[name] = value
      }
    }
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
