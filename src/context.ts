import { CommandManifest, HandlerManifest } from '@/handler/manifest'

export class Context {
  protected _argv: string[] = []
  protected _commandManifest: CommandManifest
  protected _handlerManifest: HandlerManifest
  protected _state: null | string = null
  protected _isAborted: boolean = false

  constructor(argv: string[], commandManifest: CommandManifest, handlerManifest: HandlerManifest) {
    this._argv = argv
    this._commandManifest = commandManifest
    this._handlerManifest = handlerManifest
  }

  getArgv(): string[] {
    return this._argv
  }

  getArgs(): string[] {
    const [_nodebin, _filename, ...args] = this._argv
    return args
  }

  /**
   * @example context.validate()
   * @todo more strict validation
   */
  validate(): boolean {
    const argumentsDef = this._handlerManifest.arguments
    if (argumentsDef.length < this.getArgs().length) {
      return false
    }
    const optionsDef = this._handlerManifest.options
    for (const def of optionsDef) {
      if (def.config.required === true) {
        if (!(def.name in this.getArgs())) {
          return false
        }
      }
    }
    return true
  }

  /**
   * @example context.hasOption('--help')
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

  /**
   * @example const name = context.getOptionValue('--name')
   */
  getOptionValue(name: string): string | null {
    const option = this._handlerManifest.options.find((v) => v.name === name) ?? null
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

  /**
   * @example const name = context.getArgumentValue('name')
   */
  getArgumentValue(name: string): string | null {
    const argumentIndex = this._handlerManifest.arguments.reduce((prev: number|null, v, i) => {
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

  getHelpMessage(): string {
    const commandDescription = this._commandManifest.description
    const subcommands = Object.keys(this._commandManifest.handlers)

    const message = `
${commandDescription}

Subcommands:
${subcommands}
`

    return message
  }

  getVersionMessage(): string {
    return 'this is version message'
  }
}
