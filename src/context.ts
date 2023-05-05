
// bool or string or string[]
type Arg = {
  name: string;
  value: string;
}

export class Context<S extends string[]> {
  constructor(
    protected _rawargs: string = '',
    protected _args: Arg[] = [],
    protected _state: keyof S,
  ) {}

  getRawArgs(): string {
    return this._rawargs
  }

  list(): Arg[] {
    return this._args
  }

  get(name: string) {}

  setState(state: keyof S) {
    this._state = state
  }
}
