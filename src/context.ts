
// bool or string or string[]
type Arg = {
  name: string;
  value: string;
}

export class Context<S extends string[], T extends Record<'string', any>> {
  constructor(
    protected _rawargs: string = '',
    protected _args: Arg[] = [],
    protected _data: T = {} as T,
    protected _state: keyof S,
  ) {}

  getRawArgs(): string {
    return this._rawargs
  }

  list(): Arg[] {
    return this._args
  }

  get(name: string) {}

  setData<N extends keyof T>(name: N, value: T[N]) {
    this._data[name] = value;
  }

  getData<N extends keyof T>(name: N): T[N] {
    return this._data[name]
  }

  setState(state: keyof S) {
    this._state = state
  }
}
