export class Context {
  protected _argv: string[] = [];
  protected _state: null | string = null;
  protected _isAborted: boolean = false;

  constructor(argv: string[]) {
    this._argv = argv
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
   */
  validate(): boolean {
    // todo
    return true
  }

  /**
   * @example context.hasOption('--help') 
   */
  hasOption(name: string): boolean {
    // todo
    return true
  }

  /**
   * @example const name = context.getOptionValue('--name') 
   */
  getOptionValue(name: string): string|null {
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
