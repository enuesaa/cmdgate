
type BaseData = Record<'string', any>
export class Context<S extends string[], T extends BaseData> {
  constructor(
    protected _data: T,
    protected _state: keyof S,
  ) {}

  setData<N extends keyof T>(name: N, value: T[N]): this {
    this._data[name] = value;
    return this
  }

  getData<N extends keyof T>(name: N): T[N] {
    return this._data[name]
  }

  setState(state: keyof S): this {
    this._state = state
    return this;
  }
}
