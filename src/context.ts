/**
 * @deprecated
 */
type Arg = {
  name: string;
  value: string;
}

export class Context {
  protected _rawargs: string = '';
  protected _args: Arg[] = [];
  protected _state: null | string = null;
  protected _isAborted: boolean = false;

  getRawArgs(): string {
    return this._rawargs
  }

  list(): Arg[] {
    return this._args
  }

  get(name: string): null | Arg {
    if (name in this._args) {
      return this._args[name]
    }
    return null
  }

  setState(state: null | string) {
    this._state = state
  }

  getState(): null | string {
    return this._state
  }

  abort() {
    this._isAborted = true;
  }

  isAborted(): boolean {
    return this._isAborted
  }

  getParsedRoute(): string {
    // trim spaces
    return ''
  }
}
