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
  options: Option[]
  positionals: Positional[]
  helpOptions: HelpOption[]
  versionOptions: VersionOption[]

  constructor(route: string, config: Partial<CommandConfig>) {
    this.route = route
    this.config = { usage: '', description: '', param: {}, handler: null, ...config }
    const { options, positionals, helpOptions, versionOptions } = this.classifyParam(this.config.param)
    this.options = options
    this.positionals = positionals
    this.helpOptions = helpOptions
    this.versionOptions = versionOptions
  }

  isMatch(route: string): boolean {
    return this.positionals.length === 0 ? this.route === route : route.startsWith(this.route)
  }

  classifyParam(param: { [key: string]: Option | HelpOption | VersionOption | Positional }): {
    options: Option[]
    positionals: Positional[]
    helpOptions: HelpOption[]
    versionOptions: VersionOption[]
  } {
    const options: Option[] = []
    const positionals: Positional[] = []
    const helpOptions: HelpOption[] = []
    const versionOptions: VersionOption[] = []
    for (const [name, value] of Object.entries(param)) {
      if (value instanceof Option) {
        options.push(value)
      } else if (value instanceof Positional) {
        positionals.push(value)
      } else if (value instanceof HelpOption) {
        helpOptions.push(value)
      } else if (value instanceof VersionOption) {
        versionOptions.push(value)
      }
    }
    return { options, positionals, helpOptions, versionOptions }
  }

  resolveHandlerArg(arg: { options: Record<string, string | true> }): { [key: string]: string | null } | false {
    const ret = {}
    for (const option of this.options) {
      ret[option.name] = null
    }
    for (const [key, value] of Object.entries(arg.options)) {
      if (ret.hasOwnProperty(key)) {
        ret[key] = value === null ? true : value
      } else {
        console.error(`invalid option: ${key}`)
        return false
      }
    }
    return ret
  }

  execHandler(arg: { options: Record<string, string | true> }, prompt: Prompt): void {
    for (const helpOption of this.helpOptions) {
      if (helpOption.name in arg.options) {
        helpOption.execHandler(prompt)
        return
      }
    }
    const handlerarg = this.resolveHandlerArg(arg)
    console.log(handlerarg)
    if (handlerarg !== false && this.config.handler !== null) {
      this.config.handler({ args: handlerarg, prompt: prompt })
    }
  }
}
