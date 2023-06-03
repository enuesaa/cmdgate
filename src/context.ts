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

  validate(): boolean {
    // todo
    return true
  }

  hasOption(name: string): boolean {
    // todo
    return true
  }
}
