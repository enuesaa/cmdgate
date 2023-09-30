import { UserInput } from './parse'
import { ArgumentConfig } from './types/argument'
import { FlagConfig } from './types/flag'

export class Gate {
  private _description: string = ''
  private _arguments: Record<string, ArgumentConfig> = {}
  private _flags: Record<string, FlagConfig> = {}
  private _userinput: UserInput = {argv: [], flags: {}, args: []}

  description(description: string) {
    this._description = description
  }

  argument(name: string, config: ArgumentConfig) {
    this._arguments[name] = config
  }

  flag(name: string, config: FlagConfig) {
    this._flags[name] = config
  }

  withUserinput(userinput: UserInput) {
    this._userinput = userinput
  }

  /**
   * should return parsed objects
   */
  parse() {
    const parsed: Record<string, any> = {}

    Object.keys(this._flags).map(name => {
      parsed[name] = this._userinput.flags[name]
    })

    return parsed
  }
}
