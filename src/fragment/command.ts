import { Option } from '@/fragment/option'
import { Positional } from '@/fragment/positional'
import { Prompt } from '@/prompt'
import { HelpOption } from '@/fragment/help-option'
import { VersionOption } from '@/fragment/version-option'
import { Gateli } from '@/gateli'

export type Handle = {
  args: {
    [key: string]: string | null | boolean
  }
  prompt: Prompt
}
export type Handler = (handle: Handle) => void

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

  classifyParam() : { options: Option[], positionals: Positional[] } {
    const options: Option[] = []
    const positionals: Positional[] = []
    for (const value of Object.values(this.config.param)) {
      if (value instanceof Option) {
        options.push(value)
      }
      if (value instanceof Positional) {
        positionals.push(value)
      }
    }
    return { options, positionals }
  }

  execHandler({ options, positionals, gateli }: { options: Record<string, string | true>, positionals: string[], gateli: Gateli }): void {
    const prompt = gateli.prompt
    const handlerArg :{[key: string]: null | string | boolean } = Object.keys(this.config.param).reduce((o, key) => ({...o, [key]: null}), {})

    for (const [passedName, passedValue] of Object.entries(options)) {
      const defName = Object.entries(this.config.param).reduce((prev: string | false, [k, v]) => {
        if (prev !== false) { return prev }
        return v.isMatch(passedName)? k : false
      }, false)

      if (defName === false) {
        return prompt.error(`invaild option: ${passedName}`)
      }
      const defValue = this.config.param[defName]
      if (defValue instanceof HelpOption) {
        return defValue.execHandler(prompt, this.classifyParam(), gateli, this.route, this.config.description)
      } 
      if (defValue instanceof VersionOption) {
        return defValue.execHandler(prompt)
      }
      handlerArg[defName] = passedValue
    }

    const { positionals: defPositionals } = this.classifyParam()
    if (defPositionals.length > 0) {
      if (positionals.length === 0) {
        return prompt.error('need positional')
      }
      /** @todo should be DRY */
      for (const [name, value] of  Object.entries(this.config.param)) {
        if (value instanceof Positional) {
          const position = value.position
          if (positionals.length <= position) {
            return prompt.error('need positional')
          }
          handlerArg[name] = positionals[position]
        }
      }
    }

    if (this.config.handler !== null) {
      this.config.handler({ args: handlerArg, prompt: prompt })
    }
  }
}
