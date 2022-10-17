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
  options: { [key: string]: Option }
  positionals: { [key: string]: Positional }
  helpOptions: { [key: string]: HelpOption }
  versionOptions: { [key: string]: VersionOption }

  constructor(route: string, config: Partial<CommandConfig>) {
    this.route = route
    this.config = { usage: '', description: '', param: {}, handler: null, ...config }
    this.options = {}
    this.positionals = {}
    this.helpOptions = {}
    this.versionOptions = {}
    this.classifyParam(this.config.param)
  }

  isMatch(route: string): boolean {
    return Object.keys(this.positionals).length === 0 ? this.route === route : route.startsWith(this.route)
  }

  classifyParam(param: { [key: string]: Option | HelpOption | VersionOption | Positional }) {
    for (const [name, value] of Object.entries(param)) {
      if (value instanceof Option) {
        this.options[name] = value
      } else if (value instanceof Positional) {
        this.positionals[name] = value
      } else if (value instanceof HelpOption) {
        this.helpOptions[name] = value
      } else if (value instanceof VersionOption) {
        this.versionOptions[name] = value
      }
    }
  }

  resolveHandlerArg(arg: { options: Record<string, string | true> }): { [key: string]: string | null } | false {
    const ret = Object.keys(this.options).reduce((o, key) => ({...o, [key]: null}), {})
    labelA:
    for (const [name, value] of Object.entries(arg.options)) {
      for (const [k, option] of Object.entries(this.options)) {
        if (option.isMatch(name)) {
          ret[k] = value === null ? true : value
          continue labelA
        }
      }
      console.error(`invalid option: ${name}`)
      return false
    }
    return ret
  }

  execHandler(arg: { options: Record<string, string | true> }, prompt: Prompt): void {
    for (const [name, helpOption] of Object.entries(this.helpOptions)) {
      if (helpOption.name in arg.options) {
        helpOption.execHandler(prompt)
        return
      }
    }
    const handlerarg = this.resolveHandlerArg(arg)
    if (handlerarg !== false && this.config.handler !== null) {
      this.config.handler({ args: handlerarg, prompt: prompt })
    }
  }
}
