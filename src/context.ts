import { type CommandConfig } from '@/types/config'
import { parseUserInput, type UserInput } from './parse'

export class Context {
  protected _description: string;
  protected _config: CommandConfig
  protected _userinput: UserInput;

  constructor(config: CommandConfig, argv: string[]) {
    this._config = config
    this._description = ''
    this._userinput = parseUserInput(argv)
  }

  validate(): boolean {
    return false
  }

  showValidationErrors() {}
  showHelp() {}
}
