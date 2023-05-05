import { Option } from '@/old/fragment/option'
import { Positional } from '@/old/fragment/positional'
import { Prompt } from '@/old/prompt'
import { HelpOption } from '@/old/fragment/help-option'
import { VersionOption } from '@/old/fragment/version-option'
import { Gateli } from '@/old/gateli'

export type Handler = (handle: { args: { [key: string]: string | null | boolean| string[] }; prompt: Prompt }) => void
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
    this.hasPositionals = Object.values(this.config.param)
      .map((v) => v instanceof Positional)
      .some((v) => v === true)
  }

  isMatch(route: string): boolean {
    return this.hasPositionals ? route.startsWith(this.route) : this.route === route
  }

  classifyParam(): { options: Option[]; positionals: Positional[] } {
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

  retriveParamDefName(passed: string): string|false {
    for(const [name, def] of Object.entries(this.config.param)) {
      if (def.isMatch(passed)) {
        return name
      }
    }
    return false
  }

  mapParams({ options, positionals }: {options: Record<string, string | true>; positionals: string[]}): {mapped: {[k: string]: string|boolean|string[]|null}, invalid: string[]} {
    const mapped: {[k: string]: string|boolean|string[]|null} = {}
    const invalid: string[] = []

    for (const [name, value] of Object.entries(options)) {
      const defName = this.retriveParamDefName(name)
      if (defName === false) {
        invalid.push(name)
        continue
      }
      mapped[defName] = value
    }

    for (const [defName, defValue] of Object.entries(this.config.param)) {
      if (defValue instanceof Positional) {
        const position = defValue.position
        if (position === null) {
          mapped[defName] = positionals
        } else if (positionals.length >= position) {
          mapped[defName] = positionals[position - 1]
        } else {
          mapped[defName] = null
        }
      }
    }

    return {mapped, invalid}
  }

  validateParam({mapped, invalid }: {mapped: {[k: string]: string|boolean|string[]|null}, invalid: string[]}): [boolean, string|null] {
    if (invalid.length > 0) {
      return [false, `invalid option: ${invalid[0]}`]
    }
    for (const [defName, defValue] of Object.entries(this.config.param)) {
      if (defValue instanceof Positional && !defValue.isValid(mapped[defName])) {
        return [false, 'need positional']
      }
    }
    return [true, null]
  }

  exec({ options, positionals, gateli }: {options: Record<string, string | true>; positionals: string[]; gateli: Gateli}): void {
    const {mapped, invalid} = this.mapParams({options, positionals})
    const [result, errorMessage] = this.validateParam({mapped, invalid})
    if (!result) {
      gateli.prompt.error(errorMessage)
    }

    for (const [defName, defValue] of Object.entries(this.config.param)) {
      if (defValue instanceof HelpOption && mapped[defName] === true) {
        defValue.exec(gateli, this)
        return;
      }
      if (defValue instanceof VersionOption && mapped[defName] === true) {
        defValue.exec(gateli, this)
        return;
      }
    }

    if (this.config.handler !== null) {
      this.config.handler({ args: mapped, prompt: gateli.prompt })
    }
  }
}
