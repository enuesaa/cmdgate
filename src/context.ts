import { type CommandConfig, type HandlerConfig } from '@/types/manifest'

export class Context {
  protected _argv: string[] = []
  protected _commandManifest: CommandConfig
  protected _histories: HandlerConfig[] = [];
  protected _state: null | string = null
  protected _isAborted: boolean = false

  constructor(argv: string[], commandManifest: CommandConfig) {
    this._argv = argv
    this._commandManifest = commandManifest
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
    const argdef = this._histories[-1].arguments
    if (argdef.length < this.getArgs().length) {
      return false
    }
    const optionsDef = this._histories[-1].options
    for (const def of optionsDef) {
      if (def.config.required === true) {
        if (!(def.name in this.getArgs())) {
          return false
        }
      }
    }
    return true
  }

  pushHistory(handler: HandlerConfig) {
    this._histories.push(handler)
  }

  // constructorの引数を変えたいのでわざと雑に書いている
  getCurrentHandlerManifest(): HandlerConfig {
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
    const option = this.getCurrentHandlerManifest().options.find((v) => v.name === name) ?? null
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
    const argumentIndex = this.getCurrentHandlerManifest().arguments.reduce((prev: number|null, v, i) => {
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
