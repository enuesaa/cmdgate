import { type CommandConfig, type HandlerConfig } from '@/types/config'
import { parseUserInput, type UserInput } from './parse'

export class Context {
  protected _argv: string[] = []
  protected _config: CommandConfig
  protected _histories: HandlerConfig[] = [];
  protected _state: null | string = null
  protected _isAborted: boolean = false
  protected _userinput: UserInput;

  constructor(argv: string[], config: CommandConfig) {
    this._argv = argv
    this._config = config
    this._userinput = parseUserInput(argv)
  }

  getArgv(): string[] {
    return this._argv
  }

  /**
   * @deprecated 
   */
  getArgs(): string[] {
    const [_nodebin, _filename, ...args] = this._argv
    return args
  }

  validate(): boolean {
    return false
  }

  /**
   * @deprecated 
   */
  getCurrentHandlerConfig(): null|HandlerConfig {
    if (this._histories.length === 0) {
      return null
    }
    return this._histories[this._histories.length - 1]
  }

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
