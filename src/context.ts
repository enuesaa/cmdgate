import { type CommandConfig } from '@/types/config'
import { parseUserInput, type UserInput } from './parse'

export class Context {
  protected _config: CommandConfig
  protected _userinput: UserInput;

  constructor( config: CommandConfig, argv: string[]) {
    this._config = config
    this._userinput = parseUserInput(argv)
  }

  getArgv(): string[] {
    return this._userinput.argv
  }

  // TODO: JSON Schema ベースの方がいいな..
  validate(): boolean {
    const optionKeys = Object.keys(this._userinput.options)

    return false
  }

  // typed route と同じ課題感がある
  hasOption(name: string): boolean {
    /**
     * @todo check def 
     */
    return this._userinput.options.hasOwnProperty(name)
  }

  getOptionValue(name: string): string | boolean | null {
    if (!this._userinput.options.hasOwnProperty(name)) {
      return null
    }
    return this._userinput.options[name]
  }

  getArgumentValue(name: string): string | null {
    return null
  }
}
