import { ArgumentConfig } from './types/argument'
import { FlagConfig } from './types/flag'

export class Gate {
  _description: string = ''
  _arguments: Record<string, ArgumentConfig> = {}
  _flags: Record<string, FlagConfig> = {}

  description(description: string) {
    this._description = description
  }

  argument(name: string, config: ArgumentConfig) {
    this._arguments[name] = config
  }

  flag(name: string, config: FlagConfig) {
    this._flags[name] = config
  }

  /**
   * should return parsed objects
   */
  parse() {

  }
}
