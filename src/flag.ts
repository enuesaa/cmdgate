export type FlagConfig = {
  description: string
  alias: string|null
  required: boolean
}
export class Flag {
  private _name: string
  private _config: FlagConfig
  private _has: boolean;
  private _value: string[];

  constructor(name: string, config: Partial<FlagConfig> = {}) {
    this._name = name
    this._config = {
      description: '',
      alias: null,
      required: false,
      ...config,
    }
    this._has = false;
    this._value = [];
  }

  get value(): string {
    return this._value.length > 0 ? this._value[0] : ''
  }

  get has(): boolean {
    return this._has;
  }

  parse() {}
}
