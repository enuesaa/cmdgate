import { type CommandConfig, type HandlerConfig } from '@/types/config'

export class Context {
  protected _argv: string[] = []
  protected _config: CommandConfig
  protected _histories: HandlerConfig[] = [];
  protected _state: null | string = null
  protected _isAborted: boolean = false

  constructor(argv: string[], config: CommandConfig) {
    this._argv = argv
    this._config = config
  }

  getArgv(): string[] {
    return this._argv
  }

  getArgs(): string[] {
    const [_nodebin, _filename, ...args] = this._argv
    return args
  }

  /**
   * @todo more strict validation
   * なんだか即席なバリデーションだなあ。
   */
  validate(): boolean {
    // const argdef = this._histories[-1].arguments
    // if (argdef.length < this.getArgs().length) {
    //   return false
    // }
    // const optionsDef = this._histories[-1].options
    // for (const def of optionsDef) {
    //   if (def.config.required === true) {
    //     if (!(def.name in this.getArgs())) {
    //       return false
    //     }
    //   }
    // }
    return false
  }

  getCurrentHandlerConfig(): null|HandlerConfig {
    if (this._histories.length === 0) {
      return null
    }
    return this._histories[this._histories.length - 1]
  }

  /**
   * @todo alias
   */
  hasOption(name: string): boolean {
    let next = false
    for (const arg of this.getArgs()) {
      if (arg === name) {
        next = true
        continue
      }
      if (next === true && arg.length > 0) {
        return true
      }
    }
    return false
  }

  getOptionValue(name: string): string | null {
    const config = this.getCurrentHandlerConfig()
    if (config === null) {
      return null
    }
    const option = config.options.find((v) => v.name === name) ?? null
    if (option === null) {
      return null
    }

    let next = false
    for (const arg of this.getArgs()) {
      if (arg === option.name || arg === option.config.alias) {
        next = true
        continue
      }
      if (next === true && arg.length > 0) {
        return arg
      }
    }
    return null
  }

  getArgumentValue(name: string): string | null {
    const config = this.getCurrentHandlerConfig()
    if (config === null) {
      return null
    }
    const argumentIndex = config.arguments.reduce((prev: number|null, v, i) => {
      if (prev !== null) {
        return prev
      }
      if (v.name === name) {
        return i
      }
      return null
    }, null)

    if (argumentIndex === null) {
      return null
    }

    const args = this.getArgs()
    if (args.length < argumentIndex) {
      return null
    }

    return args[argumentIndex]
  }
}
