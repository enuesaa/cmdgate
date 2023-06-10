import { HandlerManifest } from '@/runner/manifest'

export class Context {
  protected _argv: string[] = [];
  protected _manifest: HandlerManifest;
  protected _state: null | string = null;
  protected _isAborted: boolean = false;

  constructor(argv: string[], manifest: HandlerManifest) {
    this._argv = argv
    this._manifest = manifest
  }

  getArgv(): string[] {
    return this._argv
  }

  getArgs(): string[] {
    const [_nodepath, _filename, ...args] = this._argv
    return args
  }

  /**
   * @example context.validate()
   * @todo more strict validation
   */
  validate(): boolean {
    const argumentsDef = this._manifest.arguments;
    if (argumentsDef.length < this.getArgs().length) {
      return false
    }
    const optionsDef = this._manifest.options;
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
    let next = false;
    for (const arg of this.getArgs()) {
      if (arg === name) {
        next = true
        continue;
      }
      if (next === true && arg.length > 0) {
        return true;
      }
    }
    return false
  }

  /**
   * @example const name = context.getOptionValue('--name') 
   */
  getOptionValue(name: string): string|null {
    let next = false;
    for (const arg of this.getArgs()) {
      if (arg === name) {
        next = true
        continue;
      }
      if (next === true && arg.length > 0) {
        return arg;
      }
    }
    return null
  }

  /**
   * @example const name = context.getArgumentValue('name') 
   */
  getArgumentValue(name: string): string|null {
    return null
  }

  getHelpMessage(): string {
    // `${route}\n`
    // + `${description}\n`
    // + '\n'
    // + 'commands:\n'
    // + matchedCommands.map((v) => `  ${v.route}`).join('\n')
    // + '\n'
    // + 'options:\n'
    // + options.map((v) => `  ${v.name}`).join('\n')
    // + '\n'
    return ''
  }

  getVersionMessage(): string {
    return ''
  }
}
