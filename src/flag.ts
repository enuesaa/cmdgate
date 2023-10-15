export type FlagConfig = {
  description?: string
  alias?: string
  required?: boolean
}

export class Flag {
  private _name: string
  private _config: FlagConfig
  private _has: boolean;
  private _value: string[];

  constructor(name: string, config: FlagConfig) {
    this._name = name
    this._config = config
    this._has = false;
    this._value = [];
  }

  getName(): string {
    return this._name
  }

  getValue(): string {
    return this._value.length > 0 ? this._value[0] : ''
  }

  has(): boolean {
    return this._has;
  }

  setValue(value: string[]) {
    this._has = true
    this._value = value
  }
}
