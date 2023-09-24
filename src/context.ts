import { type CommandConfig } from '@/types/config'
import { parseUserInput, type UserInput } from './parse'
import { type ArgumentConfig } from './types/argument'
import { type OptionConfig } from './types/option'

export class Context {
  protected _description: string;
  protected _config: CommandConfig
  protected _userinput: UserInput;

  constructor(config: CommandConfig, argv: string[]) {
    this._config = config
    this._description = ''
    this._userinput = parseUserInput(argv)
  }

  argument(name: string, config: Partial<ArgumentConfig>) {}

  flag(name: string, config: Partial<OptionConfig>) {}

  description(description: string) {
    this._description = description
  }

  validate(): boolean {
    return false
  }

  showValidationErrors() {}
  showHelp() {}
}
